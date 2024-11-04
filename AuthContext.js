// // src/context/AuthContext.js
// import React, { createContext, useContext, useState } from 'react';


// const AuthContext = createContext();


// export const AuthProvider = ({ children }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     const login = () => setIsAuthenticated(true);
//     const logout = () => setIsAuthenticated(false);

//     return (
//         <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// // Custom hook to use the AuthContext
// export const useAuth = () => {
//     return useContext(AuthContext);
// };


import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(JSON.parse(localStorage.getItem('auth')));

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('auth', 'true');  // Optionally store the token
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('auth');  // Clear stored authentication
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
