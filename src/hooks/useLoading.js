import LoadingContext from "../context/LoadingContext";
import { useContext } from "react";

const useLoading = () => {
  const {
    isLoading,
    setIsLoading,
    notify,
    setNotify,
    isLoadingComponent,
    setIsLoadingComponent,
    notifyComponent,
    setNotifyComponent,
  } = useContext(LoadingContext);

  return {
    isLoading,
    setIsLoading,
    notify,
    setNotify,
    isLoadingComponent,
    setIsLoadingComponent,
    notifyComponent,
    setNotifyComponent,
  };
};
export default useLoading;
