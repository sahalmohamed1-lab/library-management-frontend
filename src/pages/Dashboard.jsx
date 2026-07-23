import { useEffect, useState } from "react";
import { getDashboardStats } from "../api/dashboard";
import DashboardCard from "../components/DashboardCard";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 403) {
        setError("Access denied. Only administrators can view the dashboard.");
      } else {
        setError("Failed to load dashboard.");
      }
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-semibold">
          Loading dashboard...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">
          Admin Dashboard
        </h1>
        <div className="bg-red-100 border border-red-400 text-red-700 rounded-lg p-4">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Books"
          value={stats.books}
        />
        <DashboardCard
          title="Authors"
          value={stats.authors}
        />
        <DashboardCard
          title="Categories"
          value={stats.categories}
        />
        <DashboardCard
          title="Users"
          value={stats.users}
        />
        <DashboardCard
          title="Borrowed Books"
          value={stats.borrowed_books}
        />
        <DashboardCard
          title="Available Books"
          value={stats.available_books}
        />
      </div>
    </div>
  );
}

export default Dashboard;