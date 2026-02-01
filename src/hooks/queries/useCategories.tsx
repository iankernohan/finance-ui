import { useEffect } from "react";
import { useStore } from "../../store/store.ts";
import { getCategories } from "../../components/Data/data.tsx";
import { useQuery } from "@tanstack/react-query";

export function useCategories() {
  const setCategories = useStore((state) => state.setCategories);
  const setLoading = useStore((state) => state.setLoading);
  const user = useStore((state) => state.user);

  const { data, isLoading } = useQuery({
    queryKey: ["categories", user?.id],
    // queryFn: () => getCategories(user?.id || ''),
    queryFn: () => getCategories(),
    enabled: !!user,
  });

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data, setCategories]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);
}
