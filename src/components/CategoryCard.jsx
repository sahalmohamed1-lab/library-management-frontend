function CategoryCard({ category }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <h2 className="text-xl font-bold text-gray-800">
        {category.name}
      </h2>

      <p className="text-gray-500 mt-2">
        Category ID: {category.id}
      </p>

      <p className="text-sm text-gray-400 mt-4">
        Created:
      </p>

      <p className="text-sm">
        {new Date(category.created_at).toLocaleString()}
      </p>
    </div>
  );
}

export default CategoryCard;