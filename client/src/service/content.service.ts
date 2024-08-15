import { api } from "@/libs/axios";
import { useSessionStore } from "@/stores/use-session-store";
import { CreateContentDTO } from "@/types/dto/content/create-content.dto";
import { UpdateContentDTO } from "@/types/dto/content/update-content.dto";

export class ContentServiceApi {
  find() {
    return api.get(`/contents`);
  }

  findOne(id: number) {
    return api.get(`/contents/${id}`);
  }

  destroy(id: number) {
    return api.delete(`/contents/${id}`);
  }

  update(id: number, dto: UpdateContentDTO) {
    return api.patch(`/contents/${id}`, dto);
  }

  store(dto: CreateContentDTO) {
    return api.post(`/contents`, dto);
  }
}
