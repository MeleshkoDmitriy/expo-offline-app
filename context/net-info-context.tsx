import { NetInfoState, useNetInfo } from "@react-native-community/netinfo";
import { createContext, ReactNode, useMemo } from "react";

export const NetInfoContext = createContext<NetInfoState | null>(null);

export const NetInfoProvider = ({ children }: { children: ReactNode }) => {
  const netInfo = useNetInfo();

  const value = useMemo(() => {
    return netInfo;
  }, [netInfo]);

  return (
    <NetInfoContext.Provider value={value}>{children}</NetInfoContext.Provider>
  );
};
