import { useEffect, useState } from "react";
import {
  deleteAuthor,
  getAuthors,
} from "../api/authors";
import AuthorCard from "../components/AuthorCard";
import AuthorForm from "../components/AuthorForm";
import { useAuth } from "../context/AuthContext";

function Authors() {
  const { user } = useAuth();

  const isAdmin = user?.is_staff || user?.is_superuser;

  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadAuthors();
  }, []);

  async function loadAuthors() {
    try {
      const data = await getAuthors();
      setAuthors(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load authors.");
    }
  }

  function handleAdd() {
    setSelectedAuthor(null);
    setShowForm(true);
  }

  function handleEdit(author) {
    setSelectedAuthor(author);
    setShowForm(true);
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Delete this author?"
    );
    if (!confirmed) return;
    try {
      await deleteAuthor(id);
      loadAuthors();
    } catch (error) {
      console.error(error);
      alert("Failed to delete author.");
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Authors
        </h1>
        {isAdmin && (
          <button
            onClick={handleAdd}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Add Author
          </button>
        )}
      </div>
      <div className="space-y-4">
        {authors.length === 0 ? (
          <p>No authors found.</p>
        ) : (
          authors.map((author) => (
            <AuthorCard
              key={author.id}
              author={author}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isAdmin={isAdmin}
            />
          ))
        )}
      </div>
      {showForm && (
        <AuthorForm
          author={selectedAuthor}
          onClose={() => setShowForm(false)}
          onSuccess={loadAuthors}
        />
      )}

    </div>
  );
}

export default Authors;