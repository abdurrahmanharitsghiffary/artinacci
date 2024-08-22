"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const midtrans_1 = require("@app/libs/midtrans");
const prismaClient_1 = require("@app/libs/prismaClient");
const handler_1 = require("@app/utils/handler");
const http_exception_1 = require("@app/utils/http-exception");
const http_response_1 = require("@app/utils/http-response");
const crypto_1 = require("crypto");
class TransactionController extends handler_1.Handler {
    async successPayment(req, res) {
        return res.redirect(`${process.env.CLIENT_URL}/home`);
    }
    async failedPayment(req, res) {
        return res.redirect(`${process.env.CLIENT_URL}/plans`);
    }
    async checkout(req, res) {
        const { type } = req.body;
        const user = await prismaClient_1.prismaClient.user.findUnique({
            where: { id: req?.user?.id },
            select: { membership: { select: { type: true } } },
        });
        const membershipLevel = {
            B: 0,
            C: 1,
        };
        if (membershipLevel[user?.membership?.type] > membershipLevel[type])
            throw new http_exception_1.HttpException('Cannot upgrade plan to lower plan', 400);
        const amount = {
            B: 150000,
            C: 300000,
        };
        const mapping = {
            B: 'Member',
            C: 'Creator',
        };
        const transactionId = (0, crypto_1.randomUUID)();
        const grossAmount = amount[type];
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
        await prismaClient_1.prismaClient.invoice.create({
            data: {
                amount: grossAmount,
                id: transactionId,
                status: 'UNPAID',
                userId: req?.user?.id,
                items: {
                    create: { name: type, price: grossAmount, quantity: 1 },
                },
            },
        });
        const transaction = await midtrans_1.midtransApi.createTransaction(transactionBody);
        return res.json(new http_response_1.HttpResponse(transaction, 200));
    }
    async webhookMidtrans(req, res) {
        console.log(req.body, 'BODY');
        const { order_id } = req.body;
        const transactionStatus = await midtrans_1.midtransApi.transaction.status(order_id);
        const invoice = await prismaClient_1.prismaClient.invoice.findUnique({
            where: { id: order_id },
            include: { items: { take: 1, select: { name: true } } },
        });
        const isTransactionSuccess = transactionStatus?.fraud_status === 'accept' &&
            transactionStatus?.status_code === '200' &&
            ['settlement', 'capture'].includes(transactionStatus?.transaction_status);
        if (isTransactionSuccess) {
            await prismaClient_1.prismaClient.invoice.update({
                where: { id: order_id },
                data: { status: 'PAID' },
            });
            const idMapping = {
                B: 2,
                C: 3,
            };
            await prismaClient_1.prismaClient.user.update({
                where: { id: invoice?.userId },
                data: { membershipId: idMapping[invoice?.items?.[0]?.name] },
            });
        }
        return res.status(204).json(new http_response_1.HttpResponse(null, 204));
    }
}
exports.TransactionController = TransactionController;
