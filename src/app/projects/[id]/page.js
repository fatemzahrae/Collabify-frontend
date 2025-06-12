"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ProjectTab from "@/components/ProjectTab";
import { projectAPI } from "@/api/api";

export default function ProjectPage() {
  const params = useParams();
  const projectId = parseInt(params.id);

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch the specific project by ID
        const projectData = await projectAPI.getProjectById(projectId);
        setProject(projectData);
      } catch (err) {
        console.error("Failed to fetch project:", err);
        setError(err.message || "Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  // Loading state
  if (loading) {
    return (
      <DashboardLayout activeTab={`project-${projectId}`}>
        <div className="container-fluid py-4">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "200px" }}
          >
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Error state
  if (error) {
    return (
      <DashboardLayout activeTab={`project-${projectId}`}>
        <div className="container-fluid py-4">
          <div className="alert alert-danger">
            <h4>Error Loading Project</h4>
            <p>{error}</p>
            <button
              className="btn btn-outline-danger"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Project not found
  if (!project) {
    return (
      <DashboardLayout activeTab={`project-${projectId}`}>
        <div className="container-fluid py-4">
          <div className="alert alert-warning">
            <h4>Project Not Found</h4>
            <p>The project with ID {projectId} could not be found.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Transform the project data to match the expected format
  // Note: Your backend uses 'title' but frontend might expect 'name'
  const formattedProject = {
    id: project.id,
    name: project.title,
    description: project.description,
    lead: project.leadId,
    members: project.members || [],
    tasks: project.tasks || [],
  };

  return (
    <DashboardLayout activeTab={`project-${projectId}`}>
      <ProjectTab project={formattedProject} />
    </DashboardLayout>
  );
}
