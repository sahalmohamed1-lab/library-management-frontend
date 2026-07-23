import api from "./axios";

export async function login(credentials) {
  const response = await api.post("/auth/login/", credentials);
  return response.data;
}

export async function register(user) {
  const response = await api.post("/auth/register/", user);
  return response.data;
}

export async function getProfile() {
  const response = await api.get("/auth/profile/");
  return response.data;
}