"use client";
import { AuthServiceApi } from "@/service/auth.service";
import { useSessionStore } from "@/stores/use-session-store";
import { SignInDto, signInDto } from "@/types/dto/auth/auth.dto";
import { getAxiosErrMessage } from "@/utils/get-axios-err-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { SubmitHandler, useForm } from "react-hook-form";

export const useLoginForm = () => {
  const { handleSubmit, ...form } = useForm<SignInDto>({
    resolver: zodResolver(signInDto),
  });
  const setAccessToken = useSessionStore((state) => state.setAccessToken);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit: SubmitHandler<SignInDto> = async (data) => {
    console.log(data);
    const authServiceApi = new AuthServiceApi();
    try {
      const response = await authServiceApi.signIn(data);
      const accessToken = response?.data?.data?.accessToken;
      if (accessToken) {
        setAccessToken(accessToken);
        enqueueSnackbar({ message: "Login successfull", variant: "success" });
        router.push("/home");
      }
    } catch (err: any) {
      enqueueSnackbar({
        message: getAxiosErrMessage(err),
        variant: "error",
      });
    }
  };

  return { handleSubmit: handleSubmit(onSubmit), ...form };
};
