import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import "@/assets/css/nucleo-icons.css";
import "@/assets/css/nucleo-svg.css";
import "@/assets/css/corporate-ui-dashboard.css?v=1.0.0";
import logo from "@/assets/img/CollabifyMauve-removebg.png";
import { useSidebar } from "@/app/contexts/SidebarContext";

import { projectAPI, userAPI } from "@/api/api";

const SideBar = ({ activeTab }) => {
  const { projectsOpen, setProjectsOpen } = useSidebar();
  const [userProjects, setUserProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user's projects on component mount
  useEffect(() => {
    const fetchUserProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        // First, get the current user to get their ID
        const currentUser = await userAPI.getCurrentUser();

        if (!currentUser || !currentUser.id) {
          console.warn("No current user found or user has no ID");
          setUserProjects([]);
          return;
        }

        // Then get the project IDs for this user
        const projectIds = await projectAPI.getProjectIdsByUserId(
          currentUser.id
        );

        // Check if projectIds is null, undefined, or not an array
        if (!projectIds || !Array.isArray(projectIds)) {
          console.warn(
            "Project IDs data is null, undefined, or not an array:",
            projectIds
          );
          setUserProjects([]);
          return;
        }

        // If no projects found, set empty array
        if (projectIds.length === 0) {
          setUserProjects([]);
          return;
        }

        // Fetch project details for each ID to get the titles
        const projectPromises = projectIds.map((projectId) =>
          projectAPI.getProjectById(projectId)
        );

        const projects = await Promise.all(projectPromises);

        // Transform the data to match your existing structure
        const transformedProjects = projects.map((project) => ({
          id: project?.id,
          name: project?.title || "Untitled Project",
        }));

        setUserProjects(transformedProjects);
      } catch (err) {
        console.error("Failed to fetch user projects:", err);
        setError("Failed to load projects");
        // Fallback to empty array on error
        setUserProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProjects();
  }, []);

  const refetchProjects = async () => {
    try {
      const projects = await projectAPI.getUserProjects();

      // Add null check here too
      if (!projects || !Array.isArray(projects)) {
        console.warn(
          "Projects data is null, undefined, or not an array during refetch:",
          projects
        );
        setUserProjects([]);
        return;
      }

      const transformedProjects = projects.map((project) => ({
        id: project?.id,
        name: project?.title || "Untitled Project",
      }));
      setUserProjects(transformedProjects);
    } catch (err) {
      console.error("Failed to refetch projects:", err);
      setUserProjects([]);
    }
  };

  // Toggle projects dropdown
  const toggleProjects = (e) => {
    e.preventDefault();
    setProjectsOpen(!projectsOpen);
  };

  return (
    <aside
      className="sidenav navbar navbar-vertical navbar-expand-xs border-0 bg-slate-900 fixed-start overflow-hidden h-100"
      id="sidenav-main"
    >
      <div className="sidenav-header">
        <i
          className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
          aria-hidden="true"
          id="iconSidenav"
        ></i>
        <Link
          className="navbar-brand d-flex align-items-center m-0"
          href="/dashboard"
          target="_blank"
        >
          <div className="icon icon-shape icon-sm px-0 text-center d-flex align-items-center justify-content-center">
            <Image
              src={logo}
              alt="logo"
              height={30}
              width={30}
              style={{ marginRight: "7px" }}
            />
          </div>
          <span className="font-weight-bold text-lg">Collabify</span>
        </Link>
      </div>
      <div
        className="collapse navbar-collapse px-4 w-auto overflow-hidden"
        id="sidenav-collapse-main"
        style={{ height: "calc(100% - 70px)" }}
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link active" href="/dashboard">
              <div className="icon icon-shape icon-sm px-0 text-center d-flex align-items-center justify-content-center">
                <svg
                  width="30px"
                  height="30px"
                  viewBox="0 0 48 48"
                  version="1.1"
                >
                  <title>dashboard</title>
                  <g
                    id="dashboard"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g
                      id="template"
                      transform="translate(12.000000, 12.000000)"
                      fill="#FFFFFF"
                      fillRule="nonzero"
                    >
                      <path
                        className="color-foreground"
                        d="M0,1.71428571 C0,0.76752 0.76752,0 1.71428571,0 L22.2857143,0 C23.2325143,0 24,0.76752 24,1.71428571 L24,5.14285714 C24,6.08962286 23.2325143,6.85714286 22.2857143,6.85714286 L1.71428571,6.85714286 C0.76752,6.85714286 0,6.08962286 0,5.14285714 L0,1.71428571 Z"
                        id="Path"
                      ></path>
                      <path
                        className="color-background"
                        d="M0,12 C0,11.0532171 0.76752,10.2857143 1.71428571,10.2857143 L12,10.2857143 C12.9468,10.2857143 13.7142857,11.0532171 13.7142857,12 L13.7142857,22.2857143 C13.7142857,23.2325143 12.9468,24 12,24 L1.71428571,24 C0.76752,24 0,23.2325143 0,22.2857143 L0,12 Z"
                        id="Path"
                      ></path>
                      <path
                        className="color-background"
                        d="M18.8571429,10.2857143 C17.9103429,10.2857143 17.1428571,11.0532171 17.1428571,12 L17.1428571,22.2857143 C17.1428571,23.2325143 17.9103429,24 18.8571429,24 L22.2857143,24 C23.2325143,24 24,23.2325143 24,22.2857143 L24,12 C24,11.0532171 23.2325143,10.2857143 22.2857143,10.2857143 L18.8571429,10.2857143 Z"
                        id="Path"
                      ></path>
                    </g>
                  </g>
                </svg>
              </div>
              <span className="nav-link-text ms-1">Dashboard</span>
            </Link>
          </li>
          <li className="nav-item">
            <div
              className="nav-link d-flex justify-content-between align-items-center"
              style={{ cursor: "pointer" }}
            >
              <div className="d-flex align-items-center">
                <div className="icon icon-shape icon-sm px-0 text-center d-flex align-items-center justify-content-center">
                  <svg
                    width="30px"
                    height="30px"
                    viewBox="0 0 48 48"
                    version="1.1"
                  >
                    <title>table</title>
                    <g
                      id="table"
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                    >
                      <g
                        id="view-grid"
                        transform="translate(12.000000, 12.000000)"
                        fill="#FFFFFF"
                        fillRule="nonzero"
                      >
                        <path
                          className="color-foreground"
                          d="M3.42857143,0 C1.53502286,0 0,1.53502286 0,3.42857143 L0,6.85714286 C0,8.75069143 1.53502286,10.2857143 3.42857143,10.2857143 L6.85714286,10.2857143 C8.75069143,10.2857143 10.2857143,8.75069143 10.2857143,6.85714286 L10.2857143,3.42857143 C10.2857143,1.53502286 8.75069143,0 6.85714286,0 L3.42857143,0 Z"
                          id="Path"
                        ></path>
                        <path
                          className="color-background"
                          d="M3.42857143,13.7142857 C1.53502286,13.7142857 0,15.2492571 0,17.1428571 L0,20.5714286 C0,22.4650286 1.53502286,24 3.42857143,24 L6.85714286,24 C8.75069143,24 10.2857143,22.4650286 10.2857143,20.5714286 L10.2857143,17.1428571 C10.2857143,15.2492571 8.75069143,13.7142857 6.85714286,13.7142857 L3.42857143,13.7142857 Z"
                          id="Path"
                        ></path>
                        <path
                          className="color-background"
                          d="M13.7142857,3.42857143 C13.7142857,1.53502286 15.2492571,0 17.1428571,0 L20.5714286,0 C22.4650286,0 24,1.53502286 24,3.42857143 L24,6.85714286 C24,8.75069143 22.4650286,10.2857143 20.5714286,10.2857143 L17.1428571,10.2857143 C15.2492571,10.2857143 13.7142857,8.75069143 13.7142857,6.85714286 L13.7142857,3.42857143 Z"
                          id="Path"
                        ></path>
                        <path
                          className="color-foreground"
                          d="M13.7142857,17.1428571 C13.7142857,15.2492571 15.2492571,13.7142857 17.1428571,13.7142857 L20.5714286,13.7142857 C22.4650286,13.7142857 24,15.2492571 24,17.1428571 L24,20.5714286 C24,22.4650286 22.4650286,24 20.5714286,24 L17.1428571,24 C15.2492571,24 13.7142857,22.4650286 13.7142857,20.5714286 L13.7142857,17.1428571 Z"
                          id="Path"
                        ></path>
                      </g>
                    </g>
                  </svg>
                </div>
                <span className="nav-link-text ms-1">My Projects</span>
              </div>
              <div
                className="dropdown-icon ms-auto p-1 rounded-circle hover:bg-gray-700"
                onClick={toggleProjects}
                style={{
                  cursor: "pointer",
                  transition: "background-color 0.2s ease",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className={`transition-transform ${
                    projectsOpen ? "rotate-180" : ""
                  }`}
                  style={{ transition: "transform 0.3s ease" }}
                >
                  <path
                    fillRule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </div>
            </div>
            {/* Projects dropdown menu */}
            {projectsOpen && (
              <div
                className={`projects-dropdown overflow-hidden ${
                  projectsOpen ? "max-h-64" : "max-h-0"
                }`}
                style={{
                  transition: "max-height 0.3s ease",
                }}
              >
                <ul className="list-unstyled ps-4 pt-1 pb-1">
                  {loading ? (
                    <li className="mb-1">
                      <div className="text-sm py-2 px-2 text-white opacity-80">
                        Loading projects...
                      </div>
                    </li>
                  ) : error ? (
                    <li className="mb-1">
                      <div className="text-sm py-2 px-2 text-red-400">
                        {error}
                      </div>
                    </li>
                  ) : userProjects.length === 0 ? (
                    <li className="mb-1">
                      <div className="text-sm py-2 px-2 text-white opacity-60">
                        No projects found
                      </div>
                    </li>
                  ) : (
                    userProjects.map((project) => (
                      <li key={project.id} className="mb-1">
                        <Link
                          href={`/projects/${project.id}`}
                          className="text-sm py-2 px-2 d-block text-white opacity-80 hover:opacity-100 rounded hover:bg-gray-700"
                          style={{
                            transition: "all 0.2s ease",
                            textDecoration: "none",
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = "#774dd3";
                            e.currentTarget.style.opacity = "1";
                          }}
                          onMouseOut={(e) => {
                            if (activeTab !== `project-${project.id}`) {
                              e.currentTarget.style.backgroundColor = "";
                              e.currentTarget.style.opacity = "0.8";
                            } else {
                              e.currentTarget.style.backgroundColor =
                                "rgba(55, 65, 81, 1)"; // bg-gray-700
                            }
                          }}
                        >
                          {project.name}
                        </Link>
                      </li>
                    ))
                  )}
                  <li>
                    <Link
                      href="/projects/create"
                      className="text-sm py-2 px-2 d-block text-white opacity-80 hover:opacity-100 rounded hover:bg-gray-700"
                      style={{
                        transition: "all 0.2s ease",
                        textDecoration: "none",
                      }}
                    >
                      <div className="d-flex align-items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="#774dd3"
                          className="bi bi-plus-circle"
                          viewBox="0 0 16 16"
                          style={{ marginRight: "8px" }}
                        >
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                        </svg>
                        Create Project
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="#">
              <div className="icon icon-shape icon-sm px-0 text-center d-flex align-items-center justify-content-center">
                <svg
                  width="30px"
                  height="30px"
                  viewBox="0 0 48 48"
                  version="1.1"
                >
                  <title>reports</title>
                  <g
                    id="wallet"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g
                      id="credit-card"
                      transform="translate(12.000000, 15.000000)"
                      fill="#FFFFFF"
                    >
                      <path
                        className="color-background"
                        d="M3,0 C1.343145,0 0,1.343145 0,3 L0,4.5 L24,4.5 L24,3 C24,1.343145 22.6569,0 21,0 L3,0 Z"
                        id="Path"
                        fillRule="nonzero"
                      ></path>
                      <path
                        className="color-foreground"
                        d="M24,7.5 L0,7.5 L0,15 C0,16.6569 1.343145,18 3,18 L21,18 C22.6569,18 24,16.6569 24,15 L24,7.5 Z M3,13.5 C3,12.67155 3.67158,12 4.5,12 L6,12 C6.82842,12 7.5,12.67155 7.5,13.5 C7.5,14.32845 6.82842,15 6,15 L4.5,15 C3.67158,15 3,14.32845 3,13.5 Z M10.5,12 C9.67158,12 9,12.67155 9,13.5 C9,14.32845 9.67158,15 10.5,15 L12,15 C12.82845,15 13.5,14.32845 13.5,13.5 C13.5,12.67155 12.82845,12 12,12 L10.5,12 Z"
                        id="Shape"
                      ></path>
                    </g>
                  </g>
                </svg>
              </div>
              <span className="nav-link-text ms-1">Reports</span>
            </Link>
          </li>

          <li className="nav-item mt-2">
            <div className="d-flex align-items-center nav-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                className="ms-2 w-6 h-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-weight-normal text-md ms-2">
                Account Pages
              </span>
            </div>
          </li>
          <li className="nav-item border-start my-0 pt-2">
            <Link
              className="nav-link position-relative ms-0 ps-2 py-2"
              href="/profile"
            >
              <span className="nav-link-text ms-1">Profile</span>
            </Link>
          </li>
          <li className="nav-item border-start my-0 pt-2">
            <Link
              className="nav-link position-relative ms-0 ps-2 py-2"
              href="/Login"
            >
              <span className="nav-link-text ms-1">Sign In</span>
            </Link>
          </li>
          <li className="nav-item border-start my-0 pt-2">
            <Link
              className="nav-link position-relative ms-0 ps-2 py-2"
              href="/register"
            >
              <span className="nav-link-text ms-1">Sign Up</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
