import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Welcome to AenzbiStudio, {user.username}!</CardTitle>
          <CardDescription>Your personal IDE dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>User ID:</strong> {user.id}</p>
            <div className="grid grid-cols-2 gap-4">
              <Button onClick={() => router.push('/editor')}>Open Editor</Button>
              <Button onClick={() => router.push('/projects')}>My Projects</Button>
              <Button onClick={() => router.push('/settings')}>Settings</Button>
              <Button variant="outline" onClick={logout}>Logout</Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">AenzbiStudio v0.1.0</p>
        </CardFooter>
      </Card>
    </div>
  );
}

