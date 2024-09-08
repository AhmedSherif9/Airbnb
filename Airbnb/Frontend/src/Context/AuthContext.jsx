import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const response = await fetch("http://localhost:3001/user/profile", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Checking profile Failed");
        }
        const data = await response.json();
        setUser(data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error(`error is ${error}`);
      } finally {
        setIsLoading(false);
      }
    };
    checkProfile();
  }, []);

  const Login = async ({ email, password }) => {
    const response = await fetch("http://localhost:3001/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
    const data = await response.json();
    setUser(data);
    setIsAuthenticated(true);
  };

  const Register = async ({ name, email, password }) => {
    const response = await fetch("http://localhost:3001/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
      credentials: "include",
    });
    if (response.status !== 201) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
    const data = await response.json();
    setUser(data);
    setIsAuthenticated(true);
  };

  const Logout = async () => {
    const response = await fetch("http://localhost:3001/user/logout", {
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Log out Failed");
    }
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = { user, isAuthenticated, Login, Register, Logout, isLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
