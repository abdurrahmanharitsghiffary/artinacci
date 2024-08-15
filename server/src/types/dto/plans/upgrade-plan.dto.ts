import { z } from 'zod';

export const upgradePlanDto = z.object({
  planType: z.enum(['A', 'B', 'C']),
});

export type UpgradePlanDto = z.infer<typeof upgradePlanDto>;
