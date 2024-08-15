"use client";
import { AuthServiceApi } from "@/service/auth.service";
import { useSessionStore } from "@/stores/use-session-store";
import { SignUpDto, signUpDto } from "@/types/dto/auth/auth.dto";
import { getAxiosErrMessage } from "@/utils/get-axios-err-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { SubmitHandler, useForm } from "react-hook-form";

export const useRegisterForm = () => {
  const { handleSubmit, ...form } = useForm<SignUpDto>({
    resolver: zodResolver(signUpDto),
  });
  const setAccessToken = useSessionStore((state) => state.setAccessToken);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit: SubmitHandler<SignUpDto> = async (data) => {
    console.log(data);
    const authServiceApi = new AuthServiceApi();
    try {
      const response = await authServiceApi.signUp(data);
      const accessToken = response?.data?.data?.accessToken;
      if (accessToken) {
        setAccessToken(accessToken);
        router.push("/plans");
        enqueueSnackbar({
          message: "Account successfully registered",
          variant: "success",
        });
      }
    } catch (err: any) {
      console.log(err, "EROORORO");
      enqueueSnackbar({
        message: getAxiosErrMessage(err),
        variant: "error",
      });
    }
  };

  return { handleSubmit: handleSubmit(onSubmit), ...form };
};
