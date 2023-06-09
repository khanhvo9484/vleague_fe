import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [storageOption, setStorageOption] = useState("cookieStorage");

  useEffect(() => {
    const storedOption = localStorage.getItem("storageOption");
    if (storedOption) {
      setStorageOption(storedOption);
    }
  }, []);

  const handleStorageOptionChange = (option) => {
    setStorageOption(option);
    localStorage.setItem("storageOption", option);
  };

  const getCookie = (name) => {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split("=");
      if (cookie[0] === name) {
        return cookie[1];
      }
    }
    return null;
  };

  const setCookie = (name, value, days) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    const cookieValue = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
    document.cookie = cookieValue;
  };

  const getStoredAuth = () => {
    const storedAuth = getCookie("auth");
    return storedAuth ? JSON.parse(storedAuth) : null;
  };

  const [auth, setAuth] = useState(() => {
    const storedAuth = getStoredAuth();
    return storedAuth || {};
  });

  useEffect(() => {
    if (Object.keys(auth).length > 0) {
      // Add this condition to prevent storing an empty object initially
      setCookie("auth", JSON.stringify(auth), 1); // Set the cookie to expire in 1 days
    }
  }, [auth]);

  const updateAuth = (newAuth) => {
    setAuth(newAuth);
  };
  const logout = () => {
    setAuth({});
    document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.clear();
  };
  return (
    <AuthContext.Provider
      value={{
        auth,
        updateAuth,
        storageOption,
        handleStorageOptionChange,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
