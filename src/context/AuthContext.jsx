import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

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
    // console.log(document.cookie);
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const equalsIndex = cookies[i].indexOf("=");
      if (equalsIndex !== -1) {
        const cookieName = cookies[i].substring(0, equalsIndex);
        if (cookieName === name) {
          return cookies[i].substring(equalsIndex + 1);
        }
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
    // console.log(storedAuth);
    return storedAuth ? JSON.parse(storedAuth) : null;
  };

  const [auth, setAuth] = useState(() => {
    const storedAuth = getStoredAuth();
    return storedAuth || {};
  });

  useEffect(() => {
    if (Object.keys(auth).length > 0) {
      // Add this condition to prevent storing an empty object initially
      if (auth?.token?.status === "expired") {
        handleTokenExpired();
      }
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

  const handleTokenExpired = () => {
    setToken(null);
    logout();
    navigate("/unauthorized", { replace: true });
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
