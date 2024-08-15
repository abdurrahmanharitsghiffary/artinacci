"use client";
import { AuthServiceApi } from "@/service/auth.service";
import { useSessionStore } from "@/stores/use-session-store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const setAccessToken = useSessionStore((state) => state.setAccessToken);
  const router = useRouter();

  useEffect(() => {
    if (code) {
      const authServiceApi = new AuthServiceApi();
      authServiceApi
        .verifyCode({ code })
        .then((res) => {
          if (res?.data?.accessToken) setAccessToken(res?.data?.accessToken);
          router.push("/home");
        })
        .catch((err) => {
          router.push("/auth/login");
        });
    }
  }, [code]);

  return null;
}
