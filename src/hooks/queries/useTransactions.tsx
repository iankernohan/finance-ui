import { useEffect } from "react";
import { useStore } from "../../store/store.ts";
import { getPlaidTransactions } from "../../components/Data/data.tsx";
import { useQuery } from "@tanstack/react-query";

export function useTransactions() {
  const setTransactions = useStore((state) => state.setTransactions);
  const setLoading = useStore((state) => state.setLoading);
  const user = useStore((state) => state.user);

  const { data, isLoading } = useQuery({
    queryKey: ["transactions", user?.id],
    // queryFn: () => getPlaidTransactions(user?.id || ''),
    queryFn: () => getPlaidTransactions("prod"),
    enabled: !!user,
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
