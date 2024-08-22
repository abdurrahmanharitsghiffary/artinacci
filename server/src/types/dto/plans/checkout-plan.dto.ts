import { z } from 'zod';

export const checkoutPlanDto = z.object({
  type: z.enum(['B', 'C']),
});

export type CheckoutPlanDto = z.infer<typeof checkoutPlanDto>;
