import LoadingContext from "../context/LoadingContext";
import { useContext } from "react";

const useLoading = () => {
  const { isLoading, setIsLoading, notify, setNotify } =
    useContext(LoadingContext);

  return {
    isLoading,
    setIsLoading,
    notify,
    setNotify,
  };
};
export default useLoading;
