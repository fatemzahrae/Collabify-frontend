"use client";
import Footer from "@/components/Profile/Footer";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import UserHeader from "@/components/User/UserHeader";
import Navbar from "@/components/Profile/Navbar";
import NotificationsSettings from "@/components/User/NotificationsSettings";
import ProfileInfo from "@/components/User/ProfileInfo";
import LastArticles from "@/components/Profile/LastArticles";
import "@/assets/css/nucleo-icons.css";
import "@/assets/css/nucleo-svg.css";
import "@/assets/css/corporate-ui-dashboard.css?v=1.0.0";
import { userAPI } from "@/api/api";
import { useEffect, useState } from "react";

const ProfilePage = ({ articles = [], chatMessages = [] }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const userData = await userAPI.getCurrentUser();

        if (!userData || !userData.id) {
          console.warn("No current user found or user has no ID");
          setError("No user data available");
          return;
        }

        setCurrentUser(userData);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="g-sidenav-show bg-gray-100">
        <div className="main-content position-relative bg-gray-100 max-height-vh-100 h-100">
          <Navbar />
          <div
            className="container my-3 py-3 d-flex align-items-center justify-content-center"
            style={{ minHeight: "60vh" }}
          >
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading profile...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="g-sidenav-show bg-gray-100">
        <div className="main-content position-relative bg-gray-100 max-height-vh-100 h-100">
          <Navbar />
          <div
            className="container my-3 py-3 d-flex align-items-center justify-content-center"
            style={{ minHeight: "60vh" }}
          >
            <div className="text-center">
              <div className="alert alert-danger" role="alert">
                <h4 className="alert-heading">Error</h4>
                <p>{error}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="g-sidenav-show bg-gray-100">
      <div className="main-content position-relative bg-gray-100 max-height-vh-100 h-100">
        {/* Top Navigation */}
        <Navbar />

        {/* Profile Header with Cover Image */}
        <ProfileHeader user={currentUser} />

        {/* Main Content */}
        <div className="container my-3 py-3">
          <div className="row">
            {/* Left Column */}
            <div className="col-12 col-xl-8 mb-4">
              <NotificationsSettings />
            </div>

            {/* Middle Column */}
            <div className="col-12 col-xl-4 mb-4">
              <ProfileInfo user={currentUser} />
            </div>

            {/* Full Width Articles Section */}
            <div className="col-12">
              <LastArticles articles={articles} />
            </div>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
