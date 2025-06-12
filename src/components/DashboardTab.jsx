import Image from "next/image";
import "@/assets/css/nucleo-icons.css";
import "@/assets/css/nucleo-svg.css";
import "@/assets/css/corporate-ui-dashboard.css?v=1.0.0";
import { projectAPI, taskAPI } from "@/api/api";
import logo from "@/assets/img/CollabifyMauve-removebg.png";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";

const DashboardTab = ({ user }) => {
  const styles = {
    brandColor: "#774dd3",
    brandLight: "#9b7ee2",
    brandGradient: "linear-gradient(310deg, #774dd3, #9b7ee2)",
    cardHeaderGradient: "linear-gradient(195deg, #774dd3, #673ab7)",
  };

  const [stats, setStats] = useState({
    totalProjects: 0,
    todoTasks: 0,
    inProgressTasks: 0,
    doneTasks: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch user's projects
        const projectsIds = await projectAPI.getProjectIdsByUserId(user.id);
        const totalProjects = projectsIds.length;

        // Fetch all projects data to get titles
        const projectsData = {};
        for (const projectId of projectsIds) {
          const project = await projectAPI.getProjectById(projectId);
          projectsData[projectId] = project;
        }

        // Fetch all tasks across all projects
        let allTasks = [];
        for (const projectId of projectsIds) {
          const tasks = await projectAPI.getProjectTasks(projectId);
          // Enhance tasks with project information
          const enhancedTasks = tasks.map((task) => ({
            ...task,
            project: projectsData[projectId],
          }));
          allTasks = [...allTasks, ...enhancedTasks];
        }

        // Filter tasks by status and current user as assignee
        const userTasks = allTasks.filter(
          (task) => task.assigneeId === user.id
        );

        const todoTasks = userTasks.filter(
          (task) => task.status === "TO_DO"
        ).length;
        const inProgressTasks = userTasks.filter(
          (task) => task.status === "IN_PROGRESS"
        ).length;
        const doneTasks = userTasks.filter(
          (task) => task.status === "DONE"
        ).length;

        // Set stats
        setStats({
          totalProjects,
          todoTasks,
          inProgressTasks,
          doneTasks,
        });

        // Generate recent activity
        const generatedActivity = userTasks
          .filter((task) => task.status === "DONE")
          .slice(0, 4)
          .map((task) => ({
            action: "Task completed",
            project: task.project.title,
            time: "recently",
            type: "success",
          }));

        setRecentActivity(
          generatedActivity.length > 0
            ? generatedActivity
            : [
                {
                  action: "No recent activity",
                  project: "",
                  time: "",
                  type: "info",
                },
              ]
        );

        // Generate upcoming deadlines
        const generatedDeadlines = userTasks
          .filter((task) => task.status !== "DONE")
          .slice(0, 3)
          .map((task) => ({
            task: task.title,
            project: task.project.title,
            dueDate: "soon",
            priority: task.priority || "medium",
          }));

        setUpcomingDeadlines(
          generatedDeadlines.length > 0
            ? generatedDeadlines
            : [
                {
                  task: "No upcoming deadlines",
                  project: "",
                  dueDate: "",
                  priority: "medium",
                },
              ]
        );
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        setStats({
          totalProjects: 0,
          todoTasks: 0,
          inProgressTasks: 0,
          doneTasks: 0,
        });
        setRecentActivity([
          {
            action: "Failed to load activity",
            project: "",
            time: "",
            type: "warning",
          },
        ]);
        setUpcomingDeadlines([
          {
            task: "Failed to load deadlines",
            project: "",
            dueDate: "",
            priority: "medium",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const statsData = [
    {
      title: "Total Projects",
      value: stats.totalProjects,
      icon: (
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z" />
        </svg>
      ),
      color: styles.brandColor,
      change: loading ? "Loading..." : "+0 this month",
    },
    {
      title: "Tasks to be done",
      value: stats.todoTasks,
      icon: (
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
        </svg>
      ),
      color: "#f59e0b",
      change: loading
        ? "Loading..."
        : `${Math.min(3, stats.todoTasks)} due soon`,
    },
    {
      title: "Tasks in Progress",
      value: stats.inProgressTasks,
      icon: (
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
        </svg>
      ),
      color: "#06b6d4",
      change: loading ? "Loading..." : "On track",
    },
    {
      title: "Completed Tasks",
      value: stats.doneTasks,
      icon: (
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
      ),
      color: "#22c55e",
      change: loading ? "Loading..." : "+0 this week",
    },
  ];

  return (
    <>
      <div className="container-fluid py-4 px-5">
        <div className="row align-items-center mb-4">
          <div className="col-md-8">
            <h3 className="fw-bold text-dark mb-1">Hello, {user.firstname}</h3>
            <p className="text-muted mb-0">Let's get some work done today 🚀</p>
          </div>
          <div className="col-md-4 d-flex justify-content-md-end gap-2 mt-3 mt-md-0">
            <button
              type="button"
              className="btn btn-sm btn-white btn-icon d-flex align-items-center mb-0 ms-md-auto mb-sm-0 mb-2 me-2"
            >
              <span className="btn-inner--icon">
                <span className="p-1 bg-success rounded-circle d-flex ms-auto me-2">
                  <span className="visually-hidden">New</span>
                </span>
              </span>
              <span className="btn-inner--text">Messages</span>
            </button>
            <button
              type="button"
              className="btn btn-sm btn-icon d-flex align-items-center mb-0"
              style={{
                background: styles.brandGradient,
                border: "none",
                color: "white",
              }}
            >
              <span className="btn-inner--icon">
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="d-block me-2"
                >
                  <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
                </svg>
              </span>
              <span className="btn-inner--text">Sync</span>
            </button>
          </div>
        </div>
      </div>

      <main className="main-content max-height-vh-100 h-100">
        <div className="container py-3">
          {/* Statistics Cards */}
          <div className="row g-4 mb-4">
            {statsData.map((item, index) => (
              <div className="col-lg-3 col-sm-6" key={index}>
                <div className="card h-100 border-0 shadow-sm hover-shadow-lg transition-all">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <p className="text-sm text-muted mb-1">{item.title}</p>
                        <h4 className="fw-bold mb-1">
                          {loading ? "..." : item.value}
                        </h4>
                        <small className="text-muted">{item.change}</small>
                      </div>
                      <div
                        className="icon icon-shape rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                        style={{
                          width: 50,
                          height: 50,
                          backgroundColor: item.color + "20",
                          color: item.color,
                        }}
                      >
                        {item.icon}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Dashboard Content */}
          <div className="row g-4">
            {/* Recent Activity */}
            <div className="col-lg-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-header pb-0">
                  <div className="d-flex align-items-center justify-content-between">
                    <h6 className="mb-0">Recent Activity</h6>
                    <svg
                      width="18"
                      height="18"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="text-muted"
                    >
                      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                    </svg>
                  </div>
                </div>
                <div className="card-body">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="d-flex align-items-center mb-3 pb-3 border-bottom"
                    >
                      <div
                        className={`icon icon-sm rounded-circle me-3 d-flex align-items-center justify-content-center bg-${activity.type}`}
                        style={{ width: 32, height: 32 }}
                      >
                        {activity.type === "success" ? (
                          <svg
                            width="12"
                            height="12"
                            fill="white"
                            viewBox="0 0 24 24"
                          >
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        ) : activity.type === "warning" ? (
                          <svg
                            width="12"
                            height="12"
                            fill="white"
                            viewBox="0 0 24 24"
                          >
                            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                          </svg>
                        ) : (
                          <svg
                            width="12"
                            height="12"
                            fill="white"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2z" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-grow-1">
                        <p className="mb-1 fw-bold text-sm">
                          {activity.action}
                        </p>
                        <p className="mb-0 text-xs text-muted">
                          {activity.project} • {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                  <button className="btn btn-link text-muted p-0 text-sm">
                    View all activity
                  </button>
                </div>
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="col-lg-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-header pb-0">
                  <div className="d-flex align-items-center justify-content-between">
                    <h6 className="mb-0">Upcoming Deadlines</h6>
                    <svg
                      width="18"
                      height="18"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="text-muted"
                    >
                      <path d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
                    </svg>
                  </div>
                </div>
                <div className="card-body">
                  {upcomingDeadlines.map((deadline, index) => (
                    <div
                      key={index}
                      className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom"
                    >
                      <div>
                        <p className="mb-1 fw-bold text-sm">{deadline.task}</p>
                        <p className="mb-0 text-xs text-muted">
                          {deadline.project}
                        </p>
                      </div>
                      <div className="text-end">
                        <span
                          className="badge badge-sm"
                          style={{
                            backgroundColor:
                              deadline.priority === "high"
                                ? "red"
                                : deadline.priority === "medium"
                                ? "yellow"
                                : "green",
                          }}
                        >
                          {deadline.dueDate}
                        </span>
                      </div>
                    </div>
                  ))}
                  <button className="btn btn-link text-muted p-0 text-sm">
                    View all deadlines
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default DashboardTab;
