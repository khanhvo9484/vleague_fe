// import { createContext, useState } from "react";

// const AuthContext = createContext({});
// export const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState({});
//   return (
//     <AuthContext.Provider value={{ auth, setAuth }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
// export default AuthContext;

// import { createContext, useEffect, useState } from "react";

// const AuthContext = createContext({});

// export const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState(() => {
//     // Initialize the authentication state from local storage
//     // const storedAuth = localStorage.getItem("auth");
//     const storedAuth1 = sessionStorage.getItem("auth");
//     const storedAuth2 = localStorage.getItem("auth");
//     if (storedAuth1) {
//       return JSON.parse(storedAuth1);
//     }
//     if (storedAuth2) {
//       return JSON.parse(storedAuth2);
//     }
//     return {};
//   });

//   // Update local storage when the authentication state changes
//   useEffect(() => {
//     if (auth?.storageOption === "localStorage") {
//       localStorage.setItem("auth", JSON.stringify(auth));
//     } else if (auth?.storageOption === "sessionStorage") {
//       sessionStorage.setItem("auth", JSON.stringify(auth));
//     }
//   }, [auth]);

//   return (
//     <AuthContext.Provider value={{ auth, setAuth }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

/////////////////////////////////////////
// import { createContext, useState, useEffect } from "react";

// const AuthContext = createContext({});

// export const AuthProvider = ({ children }) => {
//   const [storageOption, setStorageOption] = useState("sessionStorage");
//   useEffect(() => {
//     const storedOption = localStorage.getItem("storageOption");
//     if (storedOption) {
//       setStorageOption(storedOption);
//     }
//   }, []);
//   const handleStorageOptionChange = (option) => {
//     setStorageOption(option);
//     localStorage.setItem("storageOption", option);
//   };

//   const getStorageObject = () => {
//     return storageOption === "sessionStorage" ? sessionStorage : localStorage;
//   };
//   const getStoredAuth = () => {
//     const storage = getStorageObject();
//     const storedAuth = storage.getItem("auth");
//     return storedAuth ? JSON.parse(storedAuth) : null;
//   };
//   const [auth, setAuth] = useState(() => {
//     const storedAuth = getStoredAuth();
//     return storedAuth || {};
//   });

//   useEffect(() => {
//     const storage = getStorageObject();
//     if (Object.keys(auth).length > 0) {
//       // Add this condition to prevent storing an empty object initially
//       storage.setItem("auth", JSON.stringify(auth));
//     }
//   }, [auth]);

//   const updateAuth = (newAuth) => {
//     setAuth(newAuth);
//   };

//   return (
//     <AuthContext.Provider
//       value={{ auth, updateAuth, storageOption, handleStorageOptionChange }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

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
      setCookie("auth", JSON.stringify(auth), 1); // Set the cookie to expire in 7 days
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
