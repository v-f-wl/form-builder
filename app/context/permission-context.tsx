'use client';

import { createContext, useContext } from 'react';
import axios from 'axios';
import useSWR, { mutate } from 'swr';

type PermissionContextType = {
  userPermission: string | null;
  isLoadingPermission: boolean;
};

const PermissionContext = createContext<PermissionContextType>({
  userPermission: null,
  isLoadingPermission: false,
});
const fetcher = (url: string) => axios.get(url).then(res => res.data.user)
export const PermissionProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: userPermission, isLoading: isLoadingPermission, error } = useSWR('/en/api/users/get-user-permission', fetcher, {
    refreshInterval: 30000,
    revalidateOnFocus: true,
  });
  return (
    <PermissionContext.Provider value={{ userPermission, isLoadingPermission}}>
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermission = () => useContext(PermissionContext);
