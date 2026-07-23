import { useAuth } from "../context/AuthContext";

function BorrowCard({
  item,
  borrowed = false,
  onBorrow,
  onReturn,
}) {
  const { user } = useAuth();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">

      <h2 className="text-2xl font-bold mb-2">
        {borrowed ? item.book_title : item.title}
      </h2>

      {!borrowed && (
        <>
          <p className="text-gray-700">
            <strong>Author:</strong> {item.author_name}
          </p>

          <p className="text-gray-700">
            <strong>Category:</strong> {item.category_name}
          </p>

          <p className="mt-2">
            <span className="font-semibold">
              Status:
            </span>{" "}
            <span className="text-green-600">
              Available
            </span>
          </p>

          <button
            onClick={() => onBorrow(item.id)}
            className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Borrow Book
          </button>
        </>
      )}

      {borrowed && (
        <>
          <p className="text-gray-700">
            <strong>Borrowed:</strong>
          </p>

          <p className="mb-4">
            {new Date(item.borrow_date).toLocaleDateString()}
          </p>

          <p className="mb-4">
            <span className="font-semibold">
              Status:
            </span>{" "}
            <span className="text-orange-600">
              Borrowed
            </span>
          </p>

          <button
            onClick={() => onReturn(item.id)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Return Book
          </button>
        </>
      )}

    </div>
  );
}

export default BorrowCard;