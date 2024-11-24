import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const projects = [
  { id: 1, name: 'Project 1', description: 'A sample project' },
  { id: 2, name: 'Project 2', description: 'Another sample project' },
  { id: 3, name: 'Project 3', description: 'Yet another sample project' },
];

export default function ProjectsPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">My Projects</h1>
          <Button>New Project</Button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Last updated: 2 days ago</p>
              </CardContent>
              <CardFooter>
                <Link to={`/editor?project=${project.id}`}>
                  <Button>Open in Editor</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}

