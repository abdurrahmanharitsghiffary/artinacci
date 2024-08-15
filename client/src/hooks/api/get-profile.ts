import { MeServiceApi } from "@/service/me.service";
import { QueryKeyFactory } from "@/utils/key-factory";
import { useQuery } from "@tanstack/react-query";

export const useGetProfile = () => {
  const meServiceApi = new MeServiceApi();
  return useQuery({
    queryKey: QueryKeyFactory.basic("me"),
    queryFn: async () => (await meServiceApi.getProfile()).data,
  });
};
