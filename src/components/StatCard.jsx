function StatCard({ title, value }) {
  return (
    <div className="bg-white shadow rounded-lg p-6 text-center">
      <h3 className="text-gray-500 text-lg">
        {title}
      </h3>
      <p className="text-4xl font-bold text-blue-600 mt-3">
        {value}
      </p>
    </div>
  );
}

export default StatCard;