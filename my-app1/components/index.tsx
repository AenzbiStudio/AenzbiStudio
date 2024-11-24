import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import Link from 'next/link';
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-8">Welcome to AenzbiStudio</h1>
        <p className="text-xl mb-8">A cross-platform IDE for Android, Windows, and cloud platforms</p>
        {user ? (
          <Link href="/dashboard">
            <Button size="lg">Go to Dashboard</Button>
          </Link>
        ) : (
          <Link href="/login">
            <Button size="lg">Login</Button>
          </Link>
        )}
      </div>
    </Layout>
  );
}

