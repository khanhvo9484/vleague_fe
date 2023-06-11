import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const useAuth = () => {
  const {
    auth,
    updateAuth,
    storageOption,
    handleStorageOptionChange,
    logout,
    updateToken,
  } = useContext(AuthContext);

  return {
    auth,
    updateAuth,
    storageOption,
    handleStorageOptionChange,
    logout,
    updateToken,
  };
};

export default useAuth;
