import { useEffect, useState } from "react";
import api from "../api/axios";
import StatCard from "../components/StatCard";

function Dashboard() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    availableBooks: 0,
    authors: 0,
    categories: 0,
    borrowedBooks: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);

      const [
        booksRes,
        availableRes,
        authorsRes,
        categoriesRes,
        borrowedRes,
      ] = await Promise.all([
        api.get("/books/"),
        api.get("/books/?available=true"),
        api.get("/authors/"),
        api.get("/categories/"),
        api.get("/borrow/my-books/"),
      ]);

      const books =
        booksRes.data.results || booksRes.data;

      const availableBooks =
        availableRes.data.results || availableRes.data;

      const authors =
        authorsRes.data.results || authorsRes.data;

      const categories =
        categoriesRes.data.results || categoriesRes.data;

      const borrowed =
        borrowedRes.data.results || borrowedRes.data;

      setStats({
        totalBooks: books.length,
        availableBooks: availableBooks.length,
        authors: authors.length,
        categories: categories.length,
        borrowedBooks: borrowed.length,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-2xl font-semibold">
          Loading dashboard...
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-10">
        Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Books"
          value={stats.totalBooks}
        />

        <StatCard
          title="Available Books"
          value={stats.availableBooks}
        />

        <StatCard
          title="Authors"
          value={stats.authors}
        />

        <StatCard
          title="Categories"
          value={stats.categories}
        />

        <StatCard
          title="My Borrowed Books"
          value={stats.borrowedBooks}
        />
      </div>

      <div className="mt-12 bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Welcome to the Library Management System
        </h2>

        <p className="text-gray-600">
          Use the navigation bar to browse books,
          manage authors and categories, or borrow
          and return books.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;