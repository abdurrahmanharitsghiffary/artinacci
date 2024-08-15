import { api } from "@/libs/axios";

export class MeServiceApi {
  upgradePlan(dto: { planType: "A" | "B" | "C" }) {
    return api.post(`/me/plan`, dto);
  }

  getProfile() {
    return api.get(`/me`);
  }
}
