import { api } from "@/libs/axios";

export class TransactionServiceApi {
  checkout(dto: { type: "B" | "C" }) {
    return api.post("/plans/checkout", dto);
  }
}
