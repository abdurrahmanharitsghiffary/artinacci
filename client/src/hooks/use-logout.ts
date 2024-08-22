import { AuthServiceApi } from "@/service/auth.service";
import { useSessionStore } from "@/stores/use-session-store";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useLogout = () => {
  const setAccessToken = useSessionStore((state) => state.setAccessToken);
  const accessToken = useSessionStore((state) => state.accessToken);
  const router = useRouter();

  const authServiceApi = new AuthServiceApi();

  return useCallback(() => {
    authServiceApi.signOut({
      token: accessToken!,
      isLogoutFromAllDevice: false,
    });
    setAccessToken(null);
    router.push("/auth/login");
  }, [accessToken]);
};
