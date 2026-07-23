function DashboardCard({ title, value }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <h2 className="text-gray-500 text-sm uppercase">
        {title}
      </h2>

      <p className="text-4xl font-bold mt-2">
        {value}
      </p>
    </div>
  );
}

export default DashboardCard;