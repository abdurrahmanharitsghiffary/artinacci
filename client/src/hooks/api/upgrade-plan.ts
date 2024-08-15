import { MeServiceApi } from "@/service/me.service";
import { QueryKeyFactory } from "@/utils/key-factory";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpgradePlan = () => {
  const meServiceApi = new MeServiceApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: meServiceApi.upgradePlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeyFactory.basic("me") });
    },
  });
};
