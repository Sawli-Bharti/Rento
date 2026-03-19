
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  

  // Restore auth on page refresh
  useEffect(() => {
    const storedAuth = localStorage.getItem("user");

    if (storedAuth) {
      const parsed = JSON.parse(storedAuth);
      setUser(parsed.user);
      setToken(parsed.token);
    }

    setLoading(false);
  }, []);

  // Login handler
  const login = (authData) => {
    
    const userData = {
      id: authData.userId,
      name: authData.name,
      email: authData.email,
      role: authData.role,
      kycStatus:authData.kycStatus,
      ownerId: authData.ownerId,
      renterId: authData.renterId,
    };
    console.log("Auth Data:", authData);
    console.log("User Data:", userData);
    setUser(userData);
    setToken(authData.token);

    localStorage.setItem(
      "user",
      JSON.stringify({
        user: userData,
        token: authData.token,
      })
    );
  };

  // Logout handler
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
  };

  // refresh user
  const refreshUser = async () => {
  const res = await fetch("http://localhost:8080/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  setUser(data);
  localStorage.setItem("user", JSON.stringify(data));
};


  const value = {
    user,
    token,
    isAuthenticated: !!token,
    login,
    logout,
    loading,
    refreshUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);     