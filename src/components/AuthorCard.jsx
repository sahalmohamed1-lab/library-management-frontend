function AuthorCard({ author, onEdit, onDelete, isAdmin }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 flex justify-between items-center">
      <div>
        <h2 className="text-lg font-semibold">{author.name}</h2>
      </div>

      {isAdmin && (
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(author)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(author.id)}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default AuthorCard;