import { useEffect, useState } from "react";

import { createBook, updateBook } from "../api/books";
import { getAuthors } from "../api/authors";
import { getCategories } from "../api/categories";

function BookForm({ book, onClose, onSuccess }) {
  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");

  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setIsbn(book.isbn);
      setAuthor(book.author);
      setCategory(book.category);
    }
  }, [book]);

  async function loadData() {
    try {
      const authorData = await getAuthors();
      const categoryData = await getCategories();

      setAuthors(authorData);
      setCategories(categoryData);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      title,
      isbn,
      author,
      category,
    };

    try {
      if (book) {
        await updateBook(book.id, payload);
      } else {
        await createBook(payload);
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to save book.");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">

        <h2 className="text-2xl font-bold mb-4">
          {book ? "Edit Book" : "Add Book"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            className="border rounded w-full p-2"
            placeholder="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            className="border rounded w-full p-2"
            placeholder="ISBN"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            required
          />

          <select
            className="border rounded w-full p-2"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          >
            <option value="">Select Author</option>

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
            className="border rounded w-full p-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default BookForm;