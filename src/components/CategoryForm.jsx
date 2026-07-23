import { useEffect, useState } from "react";
import {
  createCategory,
  updateCategory,
} from "../api/categories";

function CategoryForm({
  category,
  onClose,
  onSuccess,
}) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (category) {
        await updateCategory(category.id, {
          name,
        });
      } else {
        await createCategory({
          name,
        });
      }
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to save category.");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">
          {category ? "Edit Category" : "Add Category"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Category Name"
            className="border rounded w-full p-2"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />
          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CategoryForm;