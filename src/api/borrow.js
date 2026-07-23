import api from "./axios";

export async function borrowBook(bookId) {
  const response = await api.post("/borrow/", {
    book: bookId,
  });

  return response.data;
}

export async function returnBook(recordId) {
  const response = await api.post(`/borrow/return/${recordId}/`);
  return response.data;
}

export async function getMyBorrowedBooks() {
  const response = await api.get("/borrow/my-books/");
  return response.data.results || response.data;
}