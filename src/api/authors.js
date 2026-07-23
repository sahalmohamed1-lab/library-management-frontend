import api from "./axios";

export async function getAuthors() {
  const response = await api.get("/authors/");
  return response.data.results || response.data;
}

export async function createAuthor(data) {
  const response = await api.post("/authors/", data);
  return response.data;
}

export async function updateAuthor(id, data) {
  const response = await api.put(`/authors/${id}/`, data);
  return response.data;
}

export async function deleteAuthor(id) {
  await api.delete(`/authors/${id}/`);
}