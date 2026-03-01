import { useEffect } from "react";
import { useStore } from "../../store/store.ts";
import { useQuery } from "@tanstack/react-query";
import { getPlaidTransactions } from "../../components/Data/transactions.ts";

export function useTransactions() {
  const appendTransactions = useStore((state) => state.appendTransactions);
  const setTransactions = useStore((state) => state.setTransactions);
  const filters = useStore((state) => state.filters);
  const page = useStore((state) => state.page);
  const setLoading = useStore((state) => state.setLoading);
  const user = useStore((state) => state.user);

  const { data, isLoading } = useQuery({
    queryKey: ["transactions", user?.id, page, filters],
    queryFn: () => getPlaidTransactions(user?.id || "", page, 25, filters),
    enabled: !!user && !!user.hasPlaidConnection,
  });

  useEffect(() => {
    if (!data) return;
    if (filters) {
      setTransactions(data);
    } else {
      appendTransactions(data);
    }
  }, [data, appendTransactions, setTransactions, filters]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);
}
