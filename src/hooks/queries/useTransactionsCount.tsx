import { useEffect } from "react";
import { useStore } from "../../store/store.ts";
import { useQuery } from "@tanstack/react-query";
import { getTransactionsCount } from "../../components/Data/transactions.ts";

export function useTransactionsCount() {
  const filters = useStore((state) => state.filters);
  const setTransactionsCount = useStore((state) => state.setTransactionsCount);
  const setLoading = useStore((state) => state.setLoading);
  const user = useStore((state) => state.user);

  const { data, isLoading } = useQuery({
    queryKey: ["transactionsCount", user?.id, filters],
    queryFn: () => getTransactionsCount(user?.id || "", filters),
    enabled: !!user && !!user.hasPlaidConnection,
  });

  useEffect(() => {
    if (data) {
      setTransactionsCount(data);
    }
  }, [data, setTransactionsCount]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);
}
