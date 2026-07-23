import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import { getProfile } from "../api/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const token = localStorage.getItem("access");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const profile = await getProfile();
      setUser(profile);
    } catch (err) {
      console.error(err);

      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function login(username, password) {
    const response = await api.post("/auth/login/", {
      username,
      password,
    });

    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);

    const profile = await getProfile();

    setUser(profile);

    navigate("/dashboard");
  }

  async function register(userData) {
    await api.post("/auth/register/", userData);

    await login(
      userData.username,
      userData.password
    );
  }

  function logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    setUser(null);

    navigate("/");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}