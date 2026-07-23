import { useEffect, useState } from "react";

import {
  getCategories,
  deleteCategory,
} from "../api/categories";

import CategoryCard from "../components/CategoryCard";
import CategoryForm from "../components/CategoryForm";

import { useAuth } from "../context/AuthContext";

function Categories() {
  const { user } = useAuth();

  const isAdmin = user?.is_staff || user?.is_superuser;

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      setLoading(true);

      const data = await getCategories();

      if (Array.isArray(data)) {
        setCategories(data);
      } else if (Array.isArray(data.results)) {
        setCategories(data.results);
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  }

  function handleAdd() {
    setSelectedCategory(null);
    setShowForm(true);
  }

  function handleEdit(category) {
    setSelectedCategory(category);
    setShowForm(true);
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Delete this category?"
    );

    if (!confirmed) return;

    try {
      await deleteCategory(id);
      loadCategories();
    } catch (error) {
      console.error(error);
      alert("Failed to delete category.");
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-2xl font-semibold">
          Loading categories...
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Categories
        </h1>

        {isAdmin && (
          <button
            onClick={handleAdd}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
          >
            Add Category
          </button>
        )}

      </div>

      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              isAdmin={isAdmin}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {showForm && (
        <CategoryForm
          category={selectedCategory}
          onClose={() => setShowForm(false)}
          onSuccess={loadCategories}
        />
      )}

    </div>
  );
}

export default Categories;