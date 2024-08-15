import { ContentServiceApi } from "@/service/content.service";
import { QueryKeyFactory } from "@/utils/key-factory";
import { useQuery } from "@tanstack/react-query";

export const useGetContents = () => {
  const contentServiceApi = new ContentServiceApi();
  return useQuery({
    queryKey: QueryKeyFactory.list("contents"),
    queryFn: async () => (await contentServiceApi.find()).data,
  });
};
