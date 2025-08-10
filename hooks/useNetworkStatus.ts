import { useContext } from "react";
import { NetInfoContext } from "../context/net-info-context";

export const useNetworkStatus = () => {
  const status = useContext(NetInfoContext);

  if (!status) {
    throw new Error("useNetworkStatus must be used within a NetInfoProvider");
  }

  return status;
};
