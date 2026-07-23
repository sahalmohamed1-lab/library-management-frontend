import { useAuth } from "../context/AuthContext";

function CategoryCard({
  category,
  onEdit,
  onDelete,
}) {
  const { user } = useAuth();

  const isAdmin =
    user?.is_staff || user?.is_superuser;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">

      <h2 className="text-xl font-bold text-gray-800">
        {category.name}
      </h2>

      <p className="text-gray-500 mt-2">
        Category ID: {category.id}
      </p>

      <p className="text-sm text-gray-400 mt-4">
        Created
      </p>

      <p className="text-sm">
        {new Date(category.created_at).toLocaleString()}
      </p>

      {isAdmin && (
        <div className="flex gap-3 mt-6">

          <button
            onClick={() => onEdit(category)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(category.id)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Delete
          </button>

        </div>
      )}

    </div>
  );
}

export default CategoryCard;