import { useState, useEffect, createContext, useContext } from "react";
const AuthContext = createContext();
import axios from "axios";

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/auth/me`)
      .then((res) => {
        setIsLoggedIn(true);
        setUser(res.data.data);
      })
      .catch(() => {
        setUser(null);
        setIsLoggedIn(false);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
