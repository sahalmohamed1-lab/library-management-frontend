import { useEffect, useState } from "react";
import api from "../api/axios";
import BorrowBookCard from "../components/BorrowBookCard";
import BorrowedBookCard from "../components/BorrowedBookCard";

function BorrowBooks() {
  const [books, setBooks] = useState([]);
  const [borrowed, setBorrowed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);

      const [booksRes, borrowedRes] = await Promise.all([
        api.get("/books/"),
        api.get("/borrow/my-books/"),
      ]);

      const bookData = booksRes.data.results || booksRes.data;
      const borrowedData = borrowedRes.data.results || borrowedRes.data;

      setBooks(bookData);
      setBorrowed(borrowedData);
    } catch (error) {
      console.error(error);
      alert("Failed to load data.");
    } finally {
      setLoading(false);
    }
  }

  async function borrowBook(bookId) {
    try {
      await api.post("/borrow/", {
        book: bookId,
      });

      alert("Book borrowed successfully.");
      loadData();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.book ||
          error.response?.data?.detail ||
          "Unable to borrow this book."
      );
    }
  }

  async function returnBook(recordId) {
    try {
      await api.post(`/borrow/return/${recordId}/`);

      alert("Book returned successfully.");
      loadData();
    } catch (error) {
      console.error(error);
      alert("Unable to return book.");
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-2xl font-semibold">
          Loading...
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Borrow Books
      </h1>

      {/* Available Books */}
      <h2 className="text-2xl font-semibold mb-5">
        Available Books
      </h2>

      {books.filter((book) => book.available).length === 0 ? (
        <p className="text-gray-600 mb-10">
          No books are currently available.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {books
            .filter((book) => book.available)
            .map((book) => (
              <BorrowBookCard
                key={book.id}
                book={book}
                onBorrow={borrowBook}
              />
            ))}
        </div>
      )}

      <hr className="my-10" />

      {/* Borrowed Books */}
      <h2 className="text-2xl font-semibold mb-5">
        My Borrowed Books
      </h2>

      {borrowed.length === 0 ? (
        <p className="text-gray-600">
          You haven't borrowed any books yet.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {borrowed.map((record) => (
            <BorrowedBookCard
              key={record.id}
              record={record}
              onReturn={returnBook}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default BorrowBooks;