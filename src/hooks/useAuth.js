import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const useAuth = () => {
  const { auth, updateAuth, storageOption, handleStorageOptionChange, logout } =
    useContext(AuthContext);

  return { auth, updateAuth, storageOption, handleStorageOptionChange, logout };
};

export default useAuth;
