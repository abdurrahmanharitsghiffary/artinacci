import { AppRequest, AppResponse } from '@app/types/express';
import { Handler } from '../utils/handler';
import { HttpResponse } from '@app/utils/http-response';
import { ContentService } from '@app/services/content.service';
import { UpdateContentDTO } from '@app/types/dto/content/update-content.dto';
import { CreateContentDTO } from '@app/types/dto/content/create-content.dto';
import { prismaClient } from '@app/libs/prismaClient';

export class ContentController extends Handler {
  async findOne(req: AppRequest, res: AppResponse) {
    const contentService = new ContentService();
    const content = await contentService.findOne(+req.params.id);

    return res.status(200).json(new HttpResponse(content, 200));
  }

  async find(req: AppRequest, res: AppResponse) {
    const contentService = new ContentService();

    const user = await prismaClient.user.findUnique({
      where: { id: req.user?.id },
      select: {
        role: true,
        membership: { select: { maxContentPerType: true } },
      },
    });

    const isAdmin = user?.role === 'ADMIN';
    console.log(user, 'USER');
    const contents = await contentService.find(
      isAdmin
        ? undefined
        : user?.membership?.maxContentPerType === null
          ? undefined
          : (user?.membership?.maxContentPerType ?? 3)
    );

    return res.status(200).json(new HttpResponse(contents, 200));
  }

  async destroy(req: AppRequest, res: AppResponse) {
    const contentService = new ContentService();
    await contentService.destroy(+req.params.id);

    return res.status(204).json(new HttpResponse(null, 204));
  }

  async update(req: AppRequest, res: AppResponse) {
    const contentService = new ContentService();
    const { attachments, description, title, type } =
      req.body as UpdateContentDTO;

    await contentService.update(+req.params.id, {
      attachments,
      description,
      title,
      type,
    });

    return res.status(204).json(new HttpResponse(null, 204));
  }

  async store(req: AppRequest, res: AppResponse) {
    const contentService = new ContentService();
    const { attachments, description, title, type } =
      req.body as CreateContentDTO;

    await contentService.store(+req.params.id, {
      attachments,
      description,
      title,
      type,
    });

    return res.status(201).json(new HttpResponse(null, 201));
  }
}
