import { midtransApi } from '@app/libs/midtrans';
import { prismaClient } from '@app/libs/prismaClient';
import { CheckoutPlanDto } from '@app/types/dto/plans/checkout-plan.dto';
import { AppRequest, AppResponse } from '@app/types/express';
import { Handler } from '@app/utils/handler';
import { HttpException } from '@app/utils/http-exception';
import { HttpResponse } from '@app/utils/http-response';
import { randomUUID } from 'crypto';

export class TransactionController extends Handler {
  async successPayment(req: AppRequest, res: AppResponse) {
    return res.redirect(`${process.env.CLIENT_URL}/home`);
  }

  async failedPayment(req: AppRequest, res: AppResponse) {
    return res.redirect(`${process.env.CLIENT_URL}/plans`);
  }

  async checkout(req: AppRequest, res: AppResponse) {
    const { type } = req.body as CheckoutPlanDto;
    const user = await prismaClient.user.findUnique({
      where: { id: req?.user?.id },
      select: { membership: { select: { type: true } } },
    });

    const membershipLevel = {
      B: 0,
      C: 1,
    };

    if (membershipLevel[user?.membership?.type! as 'B'] > membershipLevel[type])
      throw new HttpException('Cannot upgrade plan to lower plan', 400);

    const amount = {
      B: 150000,
      C: 300000,
    };

    const mapping = {
      B: 'Member',
      C: 'Creator',
    };

    const transactionId = randomUUID();
    const grossAmount = amount[type as 'B'];
    const productItem = mapping[type] + ' Plan';

    const transactionBody = {
      transaction_details: {
        order_id: transactionId,
        gross_amount: grossAmount,
      },
      item_details: [
        {
          id: type,
          price: grossAmount,
          quantity: 1,
          name: mapping[type] + ' Plan',
        },
      ],
      credit_card: {
        secure: true,
      },
    };

    await prismaClient.invoice.create({
      data: {
        amount: grossAmount,
        id: transactionId,
        status: 'UNPAID',
        userId: req?.user?.id!,
        items: {
          create: { name: type, price: grossAmount, quantity: 1 },
        },
      },
    });

    const transaction = await midtransApi.createTransaction(transactionBody);

    return res.json(new HttpResponse(transaction, 200));
  }

  async webhookMidtrans(req: AppRequest, res: AppResponse) {
    console.log(req.body, 'BODY');
    const { order_id } = req.body;
    const transactionStatus = await midtransApi.transaction.status(order_id);
    const invoice = await prismaClient.invoice.findUnique({
      where: { id: order_id },
      include: { items: { take: 1, select: { name: true } } },
    });
    const isTransactionSuccess =
      transactionStatus?.fraud_status === 'accept' &&
      transactionStatus?.status_code === '200' &&
      ['settlement', 'capture'].includes(transactionStatus?.transaction_status);

    if (isTransactionSuccess) {
      await prismaClient.invoice.update({
        where: { id: order_id },
        data: { status: 'PAID' },
      });
      const idMapping = {
        B: 2,
        C: 3,
      };
      await prismaClient.user.update({
        where: { id: invoice?.userId },
        data: { membershipId: idMapping[invoice?.items?.[0]?.name! as 'B'] },
      });
    }

    return res.status(204).json(new HttpResponse(null, 204));
  }
}
