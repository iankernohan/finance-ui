import { useEffect } from "react";
import { useStore } from "../../store/store.ts";
import { useQuery } from "@tanstack/react-query";
import { getPlaidTransactions } from "../../components/Data/transactions.ts";

export function useTransactions() {
  const setTransactions = useStore((state) => state.setTransactions);
  const setLoading = useStore((state) => state.setLoading);
  const user = useStore((state) => state.user);

  const { data, isLoading } = useQuery({
    queryKey: ["transactions", user?.id],
    queryFn: () => getPlaidTransactions(user?.id || ""),
    enabled: !!user && !!user.hasPlaidConnection,
  });

  useEffect(() => {
    if (data) {
      setTransactions(data);
    }
  }, [data, setTransactions]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);
}
