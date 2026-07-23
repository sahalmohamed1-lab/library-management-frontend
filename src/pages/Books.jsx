import { useEffect, useState } from "react";

import { getBooks, deleteBook } from "../api/books";
import BookCard from "../components/BookCard";
import BookForm from "../components/BookForm";

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    loadBooks();
  }, []);

  async function loadBooks() {
    try {
      setLoading(true);

      const data = await getBooks();

      setBooks(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load books.");
    } finally {
      setLoading(false);
    }
  }

  function handleAddBook() {
    setSelectedBook(null);
    setShowForm(true);
  }

  function handleEditBook(book) {
    setSelectedBook(book);
    setShowForm(true);
  }

  async function handleDeleteBook(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmed) return;

    try {
      await deleteBook(id);
      loadBooks();
    } catch (err) {
      console.error(err);
      alert("Failed to delete book.");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h2 className="text-2xl font-semibold">
          Loading books...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h2 className="text-2xl text-red-600">
          {error}
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Books
        </h1>

        <button
          onClick={handleAddBook}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          Add Book
        </button>

      </div>

      {books.length === 0 ? (
        <p className="text-gray-600">
          No books found.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onEdit={handleEditBook}
              onDelete={handleDeleteBook}
            />
          ))}
        </div>
      )}

      {showForm && (
        <BookForm
          book={selectedBook}
          onClose={() => setShowForm(false)}
          onSuccess={loadBooks}
        />
      )}

    </div>
  );
}

export default Books;