"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import "@/assets/css/nucleo-icons.css";
import "@/assets/css/nucleo-svg.css";
import "@/assets/css/corporate-ui-dashboard.css?v=1.0.0";
import LetterAvatar from "@/components/LetterAvatar";
import { projectAPI, userAPI } from "@/api/api";

export default function CreateProject() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    members: [],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMembersDropdown, setShowMembersDropdown] = useState(false);
  const [memberSearchQuery, setMemberSearchQuery] = useState("");
  const [availableMembers, setAvailableMembers] = useState(null); // Changed to null initially
  const [isLoadingMembers, setIsLoadingMembers] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const dropdownContentRef = useRef(null);

  // Helper function to get display name from user object
  const getDisplayName = (user) => {
    if (!user) return "Unknown User";

    // Based on your User entity: firstname, lastname, email
    const fullName = `${user.firstname || ""} ${user.lastname || ""}`.trim();

    return fullName || user.email?.split("@")[0] || "Unknown User";
  };

  // Filter members based on search query and exclude current user
  const filteredMembers =
    availableMembers?.filter((member) => {
      // Skip if member is null
      if (!member) return false;

      // Exclude current user from the list
      if (currentUser && member.id === currentUser.id) {
        return false;
      }

      const searchLower = memberSearchQuery.toLowerCase();
      const displayName = getDisplayName(member);
      const nameMatch = displayName.toLowerCase().includes(searchLower);
      const emailMatch = member.email?.toLowerCase().includes(searchLower);
      const roleMatch = member.role?.toLowerCase().includes(searchLower);

      return nameMatch || emailMatch || roleMatch;
    }) || [];

  // Fetch current user and available members on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch current user
        const user = await userAPI.getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error("Error fetching current user:", error);
        setErrors((prev) => ({ ...prev, user: "Failed to load user data" }));
      }
    };

    fetchInitialData();
  }, []);

  // Fetch all users when dropdown is first opened
  const fetchAllUsers = async () => {
    if (availableMembers !== null) return; // Already loaded or attempted to load

    setIsLoadingMembers(true);
    try {
      const users = await userAPI.getAllUsers();
      setAvailableMembers(users || []); // Ensure we set an array even if null is returned
    } catch (error) {
      console.error("Error fetching users:", error);
      setErrors((prev) => ({ ...prev, members: "Failed to load users" }));
      setAvailableMembers([]); // Set to empty array on error
    } finally {
      setIsLoadingMembers(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMembersDropdown(false);
        setMemberSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus search input when dropdown opens and handle scroll positioning
  useEffect(() => {
    if (showMembersDropdown && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();

        // Check if dropdown is visible and scroll if needed
        if (dropdownContentRef.current) {
          const dropdownRect =
            dropdownContentRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const scrollBuffer = 20; // Extra space from bottom

          // If dropdown extends beyond viewport, scroll to make it visible
          if (dropdownRect.bottom > viewportHeight - scrollBuffer) {
            const scrollAmount =
              dropdownRect.bottom - viewportHeight + scrollBuffer;
            window.scrollBy({
              top: scrollAmount,
              behavior: "smooth",
            });
          }
        }
      }, 100);
    }
  }, [showMembersDropdown]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleMemberToggle = (member) => {
    if (!member) return; // Skip if member is null

    setFormData((prev) => {
      const isSelected = prev.members.some((m) => m?.id === member.id);
      if (isSelected) {
        return {
          ...prev,
          members: prev.members.filter((m) => m?.id !== member.id),
        };
      } else {
        return {
          ...prev,
          members: [
            ...prev.members,
            { ...member, name: getDisplayName(member) },
          ],
        };
      }
    });
  };

  const removeMember = (memberId) => {
    setFormData((prev) => ({
      ...prev,
      members: prev.members.filter((m) => m?.id !== memberId),
    }));
  };

  const handleDropdownToggle = () => {
    if (!showMembersDropdown) {
      // Fetch users when opening dropdown for the first time
      fetchAllUsers();
    }
    setShowMembersDropdown(!showMembersDropdown);
    if (!showMembersDropdown) {
      setMemberSearchQuery("");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.projectName.trim()) {
      newErrors.projectName = "Project name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // Prepare project data for API
        const projectData = {
          title: formData.projectName.trim(),
          description: formData.description.trim() || undefined,
          // Send only member IDs to the backend
          memberIds: formData.members
            .filter((m) => m)
            .map((member) => member.id), // Filter out any null members
        };

        console.log("Creating project:", projectData);

        // Call the API to create the project
        const createdProject = await projectAPI.createProject(projectData);

        console.log("Project created successfully:", createdProject);

        // Reset form
        setFormData({
          projectName: "",
          description: "",
          members: [],
        });

        // Show success message or redirect
        alert("Project created successfully!");

        // Optional: Redirect to project page or projects list
        if (createdProject.id) {
          router.push(`/projects/${createdProject.id}`);
        } else {
          router.push("/projects");
        }
      } catch (error) {
        console.error("Error creating project:", error);
        setErrors({
          form:
            error.message || "Failed to create the project. Please try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <main>
      <section>
        <div className="page-header min-vh-100">
          <div
            className="container"
            style={{
              marginBottom: showMembersDropdown ? "500px" : "0px",
              transition: "margin-bottom 0.3s ease",
            }}
          >
            <div className="row justify-content-center align-items-center min-vh-100">
              <div className="col-xl-6 col-md-8 col-12 d-flex flex-column mx-auto">
                <div className="card card-plain mt-7">
                  <div className="card-header pb-0 text-left bg-transparent">
                    <h3 className="font-weight-black text-dark display-6">
                      Create Project
                    </h3>
                    <p className="mb-0">
                      Please enter the details of the new project
                    </p>
                    {errors.form && (
                      <div
                        className="alert alert-danger text-white mt-2"
                        role="alert"
                      >
                        {errors.form}
                      </div>
                    )}
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      {/* Project Name */}
                      <label>Project Name</label>
                      <div className="mb-3">
                        <input
                          type="text"
                          name="projectName"
                          className={`form-control ${
                            errors.projectName ? "is-invalid" : ""
                          }`}
                          placeholder="Enter project name"
                          value={formData.projectName}
                          onChange={handleChange}
                          disabled={isSubmitting}
                        />
                        {errors.projectName && (
                          <div className="invalid-feedback">
                            {errors.projectName}
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      <label>Description</label>
                      <div className="mb-3">
                        <textarea
                          name="description"
                          className="form-control"
                          placeholder="Enter project description (optional)"
                          rows="3"
                          value={formData.description}
                          onChange={handleChange}
                          disabled={isSubmitting}
                        />
                      </div>

                      {/* Members */}
                      <label>Team Members</label>
                      <div className="mb-3" ref={dropdownRef}>
                        <div className="position-relative">
                          <div
                            className="form-control d-flex align-items-center justify-content-between"
                            style={{ cursor: "pointer", minHeight: "45px" }}
                            onClick={handleDropdownToggle}
                          >
                            <div className="d-flex align-items-center flex-wrap">
                              {formData.members.length === 0 ? (
                                <span className="text-muted">
                                  Select team members (optional)
                                </span>
                              ) : (
                                formData.members
                                  .filter((m) => m)
                                  .map(
                                    (
                                      member // Filter out null members
                                    ) => (
                                      <div
                                        key={member.id}
                                        className="d-flex align-items-center px-3 py-1 me-2 mb-1"
                                        style={{
                                          fontSize: "0.875rem",
                                          fontWeight: "bold",
                                          borderRadius: "15px",
                                          backgroundColor: "#CDA3FF",
                                        }}
                                      >
                                        <span className="text-white me-2 fw-medium">
                                          {member.name ||
                                            getDisplayName(member)}
                                        </span>
                                        <button
                                          type="button"
                                          className="btn-close btn-close-white"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            removeMember(member.id);
                                          }}
                                          disabled={isSubmitting}
                                          style={{
                                            fontSize: "10px",
                                            width: "12px",
                                            height: "12px",
                                          }}
                                        ></button>
                                      </div>
                                    )
                                  )
                              )}
                            </div>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              style={{
                                transform: showMembersDropdown
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                                transition: "transform 0.2s ease",
                              }}
                            >
                              <polyline points="6,9 12,15 18,9"></polyline>
                            </svg>
                          </div>

                          {showMembersDropdown && (
                            <div
                              ref={dropdownContentRef}
                              className="position-absolute w-100 bg-white border rounded-3 shadow-lg"
                              style={{
                                zIndex: 1000,
                                top: "100%",
                                marginTop: "4px",
                                minHeight: "200px",
                                maxHeight: "400px",
                              }}
                            >
                              {/* Search Bar */}
                              <div className="p-3 border-bottom">
                                <div className="position-relative">
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="position-absolute text-muted"
                                    style={{
                                      left: "12px",
                                      top: "50%",
                                      transform: "translateY(-50%)",
                                    }}
                                  >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.35-4.35"></path>
                                  </svg>
                                  <input
                                    ref={searchInputRef}
                                    type="text"
                                    className="form-control"
                                    placeholder="Search team members..."
                                    value={memberSearchQuery}
                                    onChange={(e) =>
                                      setMemberSearchQuery(e.target.value)
                                    }
                                    onClick={(e) => e.stopPropagation()}
                                    style={{
                                      paddingLeft: "40px",
                                      fontSize: "0.875rem",
                                      borderWidth: "1px",
                                      borderColor: "#CDA3FF",
                                    }}
                                  />
                                </div>
                              </div>

                              {/* Members List */}
                              <div
                                style={{
                                  maxHeight: "250px",
                                  overflowY: "auto",
                                }}
                              >
                                {isLoadingMembers ? (
                                  <div className="p-4 text-center">
                                    <div
                                      className="spinner-border spinner-border-sm me-2"
                                      role="status"
                                    ></div>
                                    Loading users...
                                  </div>
                                ) : errors.members ? (
                                  <div className="p-4 text-center text-danger">
                                    <i className="fas fa-exclamation-triangle me-2"></i>
                                    {errors.members}
                                  </div>
                                ) : availableMembers === null ? (
                                  <div className="p-4 text-center text-muted">
                                    <svg
                                      width="48"
                                      height="48"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="1"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="mx-auto mb-2 opacity-50"
                                    >
                                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                      <circle cx="9" cy="7" r="4"></circle>
                                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                    </svg>
                                    <div>Click to load members</div>
                                  </div>
                                ) : filteredMembers.length === 0 ? (
                                  <div className="p-4 text-center text-muted">
                                    <svg
                                      width="48"
                                      height="48"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="1"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="mx-auto mb-2 opacity-50"
                                    >
                                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                      <circle cx="9" cy="7" r="4"></circle>
                                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                    </svg>
                                    <div>No members found</div>
                                    <small className="text-muted">
                                      {memberSearchQuery
                                        ? `Try adjusting your search terms`
                                        : `No users available`}
                                    </small>
                                  </div>
                                ) : (
                                  filteredMembers.map((member, index) => {
                                    if (!member) return null; // Skip null members

                                    const isSelected = formData.members.some(
                                      (m) => m?.id === member.id
                                    );
                                    const isLastItem =
                                      index === filteredMembers.length - 1;
                                    const displayName = getDisplayName(member);

                                    return (
                                      <div
                                        key={member.id}
                                        className={`d-flex align-items-center p-3 cursor-pointer transition-all  ${
                                          !isLastItem
                                            ? "border-bottom border-light"
                                            : ""
                                        }`}
                                        style={{
                                          cursor: "pointer",
                                          transition: "all 0.15s ease",
                                        }}
                                        onClick={() =>
                                          handleMemberToggle(member)
                                        }
                                        onMouseEnter={(e) => {
                                          if (!isSelected) {
                                            e.currentTarget.style.backgroundColor =
                                              "#f8f9fa";
                                          }
                                        }}
                                        onMouseLeave={(e) => {
                                          if (!isSelected) {
                                            e.currentTarget.style.backgroundColor =
                                              "white";
                                          }
                                        }}
                                      >
                                        <div className="me-3">
                                          <LetterAvatar
                                            name={displayName}
                                            size="md"
                                          />
                                        </div>
                                        <div className="flex-grow-1">
                                          <div
                                            className="fw-semibold text-dark mb-1"
                                            style={{ fontSize: "0.9rem" }}
                                          >
                                            {displayName}
                                          </div>
                                          <div
                                            className="text-muted mb-1"
                                            style={{ fontSize: "0.8rem" }}
                                          >
                                            {member.email}
                                          </div>
                                          {member.role && (
                                            <div className="d-inline-block">
                                              <span
                                                className="badge bg-light text-dark border"
                                                style={{ fontSize: "0.7rem" }}
                                              >
                                                {member.role}
                                              </span>
                                            </div>
                                          )}
                                        </div>
                                        <div className="ms-2">
                                          {isSelected ? (
                                            <div
                                              className="d-flex align-items-center justify-content-center bg-success rounded-circle"
                                              style={{
                                                width: "24px",
                                                height: "24px",
                                              }}
                                            >
                                              <svg
                                                width="14"
                                                height="14"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="white"
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              >
                                                <polyline points="20,6 9,17 4,12"></polyline>
                                              </svg>
                                            </div>
                                          ) : (
                                            <div
                                              className="border border-2 rounded-circle"
                                              style={{
                                                width: "24px",
                                                height: "24px",
                                                borderColor:
                                                  "#dee2e6 !important",
                                              }}
                                            ></div>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-dark w-100 mt-4 mb-3"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              Creating...
                            </>
                          ) : (
                            "Create Project"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="col-md-6 d-none d-md-block">
                <div className="position-absolute w-40 top-0 end-0 h-100">
                  <div
                    className="oblique-image position-absolute fixed-top ms-auto h-100 z-index-0 bg-cover ms-n8"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  >
                    <div className="mt-10 p-4 text-start max-width-700 position-absolute m-8">
                      <h1 className="mt-3 text-white font-weight-bolder">
                        Collaborate & Innovate
                      </h1>
                      <p className="text-white font-weight-bold text-lg mt-2 mb-4">
                        Create your next project and lead your agile team to
                        success.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
