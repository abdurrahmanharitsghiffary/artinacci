import { z } from "zod";

export const signInDto = z.object({
  email: z.string({ required_error: "Email must not be empty" }).email(),
  password: z
    .string({ required_error: "Password must not be empty" })
    .min(8, "Password must contain at least 8 character(s)"),
});
export type SignInDto = z.infer<typeof signInDto>;

export const signUpDto = z.object({
  fullName: z
    .string({ required_error: "Fullname must not be empty" })
    .min(2, "Fullname must contain at least 2 character(s)"),
  username: z
    .string({ required_error: "Username must not be empty" })
    .min(2, "Username must contain at least 2 character(s)"),
  email: z.string({ required_error: "Email must not be empty" }).email(),
  password: z
    .string({ required_error: "Password must not be empty" })
    .min(8, "Password must contain at least 8 character(s)"),
});
export type SignUpDto = z.infer<typeof signUpDto>;

export type SignOutDto = {
  isLogoutFromAllDevice: boolean;
  token: string;
};
