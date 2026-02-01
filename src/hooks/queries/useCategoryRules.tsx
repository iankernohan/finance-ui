import { useEffect, type SetStateAction } from "react";
import { useStore } from "../../store/store.ts";
import { getCategoryRules } from "../../components/Data/data.tsx";
import { useQuery } from "@tanstack/react-query";
import type { CategoryRules } from "../../Types/PlaidTransactions.tsx";

export function useCategoryRules(
  setCategoryRules: React.Dispatch<SetStateAction<CategoryRules[]>>,
) {
  const setLoading = useStore((state) => state.setLoading);
  const user = useStore((state) => state.user);

  const { data, isLoading } = useQuery({
    queryKey: ["categoryRules", user?.id],
    // queryFn: () => getCategoryRules(user?.id || ''),
    queryFn: () => getCategoryRules(),
    enabled: !!user,
  });

  useEffect(() => {
    if (data) {
      setCategoryRules(data);
    }
  }, [data, setCategoryRules]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);
}
