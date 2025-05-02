import { useAuth } from "@clerk/nextjs";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url: string) => axios.get(url).then(res => res.data.isAuthor as boolean | null);

export function useIsAuthor(formId: string) {
  const { userId } = useAuth();
  const shouldFetch = Boolean(userId && formId);

  const { data: isAuthor, error, isLoading } = useSWR<boolean | null>(
    shouldFetch ? `/en/api/forms/get-author?formId=${formId}` : null,
    fetcher
  );

  const isInvalidForm = !isLoading && (isAuthor === null || isAuthor === undefined);
  return { isAuthor, isLoaded: !isLoading, isInvalidForm, error };
}
