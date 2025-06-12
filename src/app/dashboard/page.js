"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardTab from "@/components/DashboardTab";
import { userAPI } from "@/api/api";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setLoading(true);
        console.log("🔍 Fetching current user...");

        const userData = await userAPI.getCurrentUser();
        console.log("✅ Current user data:", userData);

        setUser(userData);
        setError(null);
      } catch (error) {
        console.error("❌ Failed to fetch current user:", error);
        setError(error.message);

        // Fallback user data in case of error
        setUser({ firstName: "User" });
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  // Loading state
  if (loading) {
    return (
      <DashboardLayout activeTab="dashboard">
        <div className="container-fluid py-4 px-5">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "400px" }}
          >
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading your dashboard...</p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Error state
  if (error && !user) {
    return (
      <DashboardLayout activeTab="dashboard" user = {user}>
        <div className="container-fluid py-4 px-5">
          <div className="alert alert-warning" role="alert">
            <h6 className="alert-heading">Unable to load user data</h6>
            <p className="mb-0">
              {error}. Please try refreshing the page or contact support if the
              problem persists.
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeTab="dashboard" user = {user}>
      <DashboardTab user={user} />
      {error && (
        <div
          className="position-fixed bottom-0 end-0 p-3"
          style={{ zIndex: 1050 }}
        >
          <div className="toast show" role="alert">
            <div className="toast-header">
              <strong className="me-auto text-warning">Warning</strong>
              <button
                type="button"
                className="btn-close"
                onClick={() => setError(null)}
              ></button>
            </div>
            <div className="toast-body">
              Some user data may not be up to date: {error}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
