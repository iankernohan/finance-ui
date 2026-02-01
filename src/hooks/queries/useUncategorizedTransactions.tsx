import { useEffect } from "react";
import { useStore } from "../../store/store.ts";
import { getUncategorizedTransactions } from "../../components/Data/data.tsx";
import { useQuery } from "@tanstack/react-query";

export function useUncategorizedTransactions() {
  const setUncategorizedTransactions = useStore(
    (state) => state.setUncategorizedTransactions,
  );
  const setLoading = useStore((state) => state.setLoading);
  const user = useStore((state) => state.user);

  const { data, isLoading } = useQuery({
    queryKey: ["uncategorizedTransactions", user?.id],
    // queryFn: () => getUncategorizedTransactions(user?.id || ''),
    queryFn: () => getUncategorizedTransactions("prod"),
    enabled: !!user,
  });

  useEffect(() => {
    if (data) {
      setUncategorizedTransactions(data);
    }
  }, [data, setUncategorizedTransactions]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);
}
