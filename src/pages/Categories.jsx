import { useEffect, useState } from "react";
import api from "../api/axios";
import CategoryCard from "../components/CategoryCard";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      setLoading(true);

      const response = await api.get("/categories/");

      // Supports both paginated and non-paginated DRF responses
      if (Array.isArray(response.data)) {
        setCategories(response.data);
      } else if (Array.isArray(response.data.results)) {
        setCategories(response.data.results);
      } else {
        setCategories([]);
      }

      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h2 className="text-2xl font-semibold">
          Loading categories...
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
      <h1 className="text-4xl font-bold mb-8">
        Categories
      </h1>

      {categories.length === 0 ? (
        <p className="text-gray-600">
          No categories found.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Categories;