import { TransactionServiceApi } from "@/service/transaction.service";
import { useMutation } from "@tanstack/react-query";

export const useCheckoutPlan = () => {
  const transactionServiceApi = new TransactionServiceApi();

  return useMutation({
    mutationFn: transactionServiceApi.checkout,
  });
};
