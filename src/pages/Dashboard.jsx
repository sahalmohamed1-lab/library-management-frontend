import { useEffect, useState } from "react";

import { getDashboardStats } from "../api/dashboard";
import DashboardCard from "../components/DashboardCard";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        Loading dashboard...
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