function BorrowedBookCard({ record, onReturn }) {
  return (
    <div className="border rounded-lg shadow-md p-5 bg-white">
      <h2 className="text-xl font-bold mb-2">
        {record.book_title}
      </h2>

      <p className="text-gray-700">
        <strong>Borrowed:</strong>{" "}
        {new Date(record.borrow_date).toLocaleDateString()}
      </p>

      <button
        onClick={() => onReturn(record.id)}
        className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition"
      >
        Return Book
      </button>
    </div>
  );
}

export default BorrowedBookCard;