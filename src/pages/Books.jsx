import { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../api/books";
import { getAuthors } from "../api/authors";
import { getCategories } from "../api/categories";
import BookCard from "../components/BookCard";
import BookForm from "../components/BookForm";
import { useAuth } from "../context/AuthContext";

function Books() {
  const { user } = useAuth();

  const isAdmin = user?.is_staff || user?.is_superuser;

  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");

  useEffect(() => {
    loadFilters();
  }, []);

  useEffect(() => {
    loadBooks();
  }, [
    searchQuery,
    authorFilter,
    categoryFilter,
    availabilityFilter
  ]);

  async function loadFilters() {
    try {
      const authorData = await getAuthors();
      const categoryData = await getCategories();
      setAuthors(
        Array.isArray(authorData)
          ? authorData
          : authorData.results || []
      );
      setCategories(
        Array.isArray(categoryData)
          ? categoryData
          : categoryData.results || []
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function loadBooks() {
    try {
      setLoading(true);
      const params = {};
      if (searchQuery.trim()) {
        params.search = searchQuery;
      }
      if (authorFilter) {
        params.author = authorFilter;
      }
      if (categoryFilter) {
        params.category = categoryFilter;
      }
      if (availabilityFilter !== "") {
        params.available = availabilityFilter;
      }
      const response = await getBooks(params);
      const data = Array.isArray(response)
        ? response
        : response.results || [];
      setBooks(data);
      setError("");
    } catch (error) {
      console.error(error);
      setError("Failed to load books.");
    }
    finally {
      setLoading(false);
    }
  }

  function handleSearch() {
    setSearchQuery(search);
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
    } catch (error) {
      console.error(error);
      alert("Failed to delete book.");
    }
  }

  function clearFilters() {
    setSearch("");
    setSearchQuery("");
    setAuthorFilter("");
    setCategoryFilter("");
    setAvailabilityFilter("");
  }
  if (loading) {

    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-2xl font-semibold">
          Loading books...
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          Books
        </h1>
        {isAdmin && (
          <button
            onClick={handleAddBook}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
          >
            Add Book
          </button>
        )}
      </div>
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search books..."
            className="border rounded p-2 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 rounded"
          >
            Search
          </button>
        </div>
        <select
          className="border rounded p-2"
          value={authorFilter}
          onChange={(e) => setAuthorFilter(e.target.value)}
        >
          <option value="">
            All Authors
          </option>
          {authors.map((author) => (
            <option
              key={author.id}
              value={author.id}
            >
              {author.name}
            </option>
          ))}
        </select>
        <select
          className="border rounded p-2"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">
            All Categories
          </option>
          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
        <select
          className="border rounded p-2"
          value={availabilityFilter}
          onChange={(e) => setAvailabilityFilter(e.target.value)}
        >
          <option value="">
            All Books
          </option>
          <option value="true">
            Available
          </option>
          <option value="false">
            Borrowed
          </option>
        </select>
      </div>
      <button
        onClick={clearFilters}
        className="mb-8 bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded"
      >
        Clear Filters
      </button>
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
              isAdmin={isAdmin}
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