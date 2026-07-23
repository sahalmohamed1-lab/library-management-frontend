function BorrowBookCard({ book, onBorrow }) {
  return (
    <div className="border rounded-lg shadow-md p-5 bg-white">
      <h2 className="text-xl font-bold mb-2">
        {book.title}
      </h2>

      <p className="text-gray-700">
        <strong>Author:</strong> {book.author_name}
      </p>

      <p className="text-gray-700">
        <strong>Category:</strong> {book.category_name}
      </p>

      <p className="text-gray-700">
        <strong>ISBN:</strong> {book.isbn}
      </p>

      <p className="mt-2 text-green-600 font-semibold">
        Available
      </p>

      <button
        onClick={() => onBorrow(book.id)}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
      >
        Borrow Book
      </button>
    </div>
  );
}

export default BorrowBookCard;