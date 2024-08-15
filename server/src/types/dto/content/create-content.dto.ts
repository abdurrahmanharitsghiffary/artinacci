import z from 'zod';

export const createContentDto = z.object({
  title: z.string(),
  description: z.string().optional(),
  type: z.enum(['ARTICLE', 'VIDEO']),
  attachments: z.array(z.string()),
});

export type CreateContentDTO = z.infer<typeof createContentDto>;
