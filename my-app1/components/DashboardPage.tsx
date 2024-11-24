import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../shared/AuthContext';

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user?.username}!</h1>
        <div className="space-y-4">
          <Link to="/editor" className="block py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 text-center">
            Open Editor
          </Link>
          <button onClick={logout} className="w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

