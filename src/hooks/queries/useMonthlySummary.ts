import { useEffect } from "react";
import { useStore } from "../../store/store.ts";
import { useQuery } from "@tanstack/react-query";
import { getMonthlySummary } from "../../components/Data/transactions.ts";

export function useMonthlySummaries(month: number, year: number) {
  const setMonthlySummaries = useStore((state) => state.setMonthlySummaries);
  const setLoading = useStore((state) => state.setLoading);
  const user = useStore((state) => state.user);

  const { data, isLoading } = useQuery({
    queryKey: ["monthlySummaries", month, year, user?.id],
    // queryFn: () => getPlaidTransactions(user?.id || ''),
    queryFn: () => getMonthlySummary(month, year),
    enabled: !!user,
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      setMonthlySummaries(data);
    }
  }, [data, setMonthlySummaries]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);
}
