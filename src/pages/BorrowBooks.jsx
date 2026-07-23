import { useEffect, useState } from "react";

import { getBooks } from "../api/books";
import {
  borrowBook,
  getMyBorrowedBooks,
  returnBook,
} from "../api/borrow";

import BorrowCard from "../components/BorrowCard";

function BorrowBooks() {
  const [availableBooks, setAvailableBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);

      const booksResponse = await getBooks({
        available: true,
      });

      const borrowedResponse =
        await getMyBorrowedBooks();

      const books = Array.isArray(booksResponse)
        ? booksResponse
        : booksResponse.results || [];

      const borrowed = Array.isArray(borrowedResponse)
        ? borrowedResponse
        : borrowedResponse.results || [];

      setAvailableBooks(books);
      setBorrowedBooks(borrowed);

      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load borrow information.");
    } finally {
      setLoading(false);
    }
  }

  async function handleBorrow(bookId) {
    try {
      await borrowBook(bookId);

      alert("Book borrowed successfully.");

      loadData();
    } catch (err) {
      console.error(err);

      if (err.response?.data) {
        alert(JSON.stringify(err.response.data));
      } else {
        alert("Failed to borrow book.");
      }
    }
  }

  async function handleReturn(id) {
    const confirmed = window.confirm(
      "Return this book?"
    );

    if (!confirmed) return;

    try {
      await returnBook(id);

      alert("Book returned successfully.");

      loadData();
    } catch (err) {
      console.error(err);
      alert("Failed to return book.");
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

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-2xl text-red-600">
          {error}
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Borrow Books
      </h1>

      <section className="mb-14">

        <h2 className="text-2xl font-semibold mb-6">
          Available Books
        </h2>

        {availableBooks.length === 0 ? (
          <p className="text-gray-600">
            No books are currently available.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {availableBooks.map((book) => (
              <BorrowCard
                key={book.id}
                item={book}
                borrowed={false}
                onBorrow={handleBorrow}
              />
            ))}
          </div>
        )}

      </section>

      <section>

        <h2 className="text-2xl font-semibold mb-6">
          My Borrowed Books
        </h2>

        {borrowedBooks.length === 0 ? (
          <p className="text-gray-600">
            You have not borrowed any books.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {borrowedBooks.map((borrow) => (
              <BorrowCard
                key={borrow.id}
                item={borrow}
                borrowed={true}
                onReturn={handleReturn}
              />
            ))}
          </div>
        )}

      </section>

    </div>
  );
}

export default BorrowBooks;