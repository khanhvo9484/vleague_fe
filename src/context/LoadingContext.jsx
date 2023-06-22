import { createContext } from "react";
import { useState } from "react";

const LoadingContext = createContext({});
export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [notify, setNotify] = useState({ message: "", type: "" });
  const [isLoadingComponent, setIsLoadingComponent] = useState([
    { componentName: "", isLoading: false },
  ]);
  const [notifyComponent, setNotifyComponent] = useState([
    {
      componentName: "",
      message: "",
      type: "",
    },
  ]);
  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setIsLoading,
        notify,
        setNotify,
        isLoadingComponent,
        setIsLoadingComponent,
        notifyComponent,
        setNotifyComponent,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};
export default LoadingContext;
