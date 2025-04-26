'use client'

import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then(res => res.data.userPermission.permission)

export const usePermission = () => {
  const { data, error, isLoading } = useSWR<string | undefined >(`/en/api/users/get-user-permission`, fetcher, {
    errorRetryCount: 3,    
    errorRetryInterval: 1000
  });
  const userPermission = data
  const isLoadedPermission = !isLoading
  return { userPermission, isLoadedPermission}
}
 