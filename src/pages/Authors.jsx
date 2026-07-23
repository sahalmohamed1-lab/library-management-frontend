import { useEffect, useState } from "react";
import api from "../api/axios";
import AuthorCard from "../components/AuthorCard";

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAuthors();
  }, []);

  async function fetchAuthors() {
    try {
      setLoading(true);

      const response = await api.get("/authors/");

      if (Array.isArray(response.data)) {
        setAuthors(response.data);
      } else if (Array.isArray(response.data.results)) {
        setAuthors(response.data.results);
      } else {
        setAuthors([]);
      }

      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load authors.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-2xl font-semibold">
          Loading authors...
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
        Authors
      </h1>

      {authors.length === 0 ? (
        <p>No authors found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {authors.map((author) => (
            <AuthorCard
              key={author.id}
              author={author}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Authors;