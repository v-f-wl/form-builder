'use client'
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then(res => res.data.authorId);

export function useIsAuthor(formId: string) {
  const { userId } = useAuth();
  const { data: authorId, error, isLoading } = useSWR<string>(userId && formId ? `/api/forms/get-author?formId=${formId}`: null, fetcher);

  const isAuthor = !isLoading && !error && authorId === userId;
  return { isAuthor, isLoaded: !isLoading, error };
}
