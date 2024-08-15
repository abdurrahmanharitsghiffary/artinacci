import { z } from 'zod';

export const signInDto = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export type SignInDto = z.infer<typeof signInDto>;

export const signUpDto = z.object({
  fullName: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});
export type SignUpDto = z.infer<typeof signUpDto>;

export type SignOutDto = {
  isLogoutFromAllDevice: boolean;
  token: string;
};
