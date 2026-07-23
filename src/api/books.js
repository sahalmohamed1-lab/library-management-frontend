import api from "./axios";

export async function getBooks() {
  const response = await api.get("/books/");
  return response.data.results || response.data;
}

export async function getBook(id) {
  const response = await api.get(`/books/${id}/`);
  return response.data;
}

export async function createBook(book) {
  const response = await api.post("/books/", book);
  return response.data;
}

export async function updateBook(id, book) {
  const response = await api.put(`/books/${id}/`, book);
  return response.data;
}

export async function deleteBook(id) {
  await api.delete(`/books/${id}/`);
}