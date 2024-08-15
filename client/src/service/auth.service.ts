import { api } from "@/libs/axios";
import { SignInDto, SignOutDto, SignUpDto } from "@/types/dto/auth/auth.dto";

export class AuthServiceApi {
  verifyCode(dto: { code: string }) {
    return api.post("/auth/verify-code", dto);
  }

  signIn(dto: SignInDto) {
    return api.post("/auth/sign-in", dto);
  }

  signUp(dto: SignUpDto) {
    return api.post("/auth/sign-up", dto);
  }

  signOut(dto: SignOutDto) {
    return api.delete("/auth/sign-out", { data: dto });
  }
}
