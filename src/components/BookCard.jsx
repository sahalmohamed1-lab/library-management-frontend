import { useAuth } from "../context/AuthContext";

function BookCard({ book, onEdit, onDelete }) {
  const { user } = useAuth();

  const isAdmin = user?.is_staff;

  return (
    <div className="bg-white rounded-lg shadow-md p-5 border">

      <h2 className="text-xl font-bold mb-2">
        {book.title}
      </h2>

      <p className="text-gray-700">
        <span className="font-semibold">Author:</span>{" "}
        {book.author_name}
      </p>

      <p className="text-gray-700">
        <span className="font-semibold">Category:</span>{" "}
        {book.category_name}
      </p>

      <p className="text-gray-700">
        <span className="font-semibold">ISBN:</span>{" "}
        {book.isbn}
      </p>

      <p className="mt-2">
        <span
          className={`font-semibold ${
            book.available
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {book.available ? "Available" : "Borrowed"}
        </span>
      </p>

      {isAdmin && (
        <div className="flex gap-3 mt-5">

          <button
            onClick={() => onEdit(book)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(book.id)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Delete
          </button>

        </div>
      )}

    </div>
  );
}

export default BookCard;