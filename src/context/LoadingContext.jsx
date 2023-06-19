import { createContext } from "react";
import { useState } from "react";

const LoadingContext = createContext({});
export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [notify, setNotify] = useState({ message: "", type: "" });
  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setIsLoading,
        notify,
        setNotify,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};
export default LoadingContext;
