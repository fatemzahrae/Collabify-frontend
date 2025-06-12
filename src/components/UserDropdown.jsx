// components/UserDropdown.js
"use client";

import { useState, useRef, useEffect } from "react";
import LetterAvatar from "./LetterAvatar";

const UserDropdown = ({
  users,
  selectedUserId,
  onSelect,
  currentUser,
  isLoading = false,
  error = null,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);
    }
  }, [isOpen]);

  const getDisplayName = (user) => {
    if (!user) return "Unknown User";
    const fullName = `${user.firstname || ""} ${user.lastname || ""}`.trim();
    return fullName || user.email?.split("@")[0] || "Unknown User";
  };

  const filteredUsers = users.filter((user) => {
    const searchLower = searchQuery.toLowerCase();
    const displayName = getDisplayName(user);
    const nameMatch = displayName.toLowerCase().includes(searchLower);
    const emailMatch = user.email?.toLowerCase().includes(searchLower);
    return nameMatch || emailMatch;
  });

  const selectedUser = users.find((user) => user.id === selectedUserId);

  return (
    <div className="position-relative" ref={dropdownRef}>
      <div
        className="form-control d-flex align-items-center justify-content-between"
        style={{ cursor: "pointer", minHeight: "45px" }}
        onClick={() => {
          setIsOpen(!isOpen);
          setSearchQuery("");
        }}
      >
        <div className="d-flex align-items-center">
          {selectedUser ? (
            <>
              <LetterAvatar name={getDisplayName(selectedUser)} size="sm" />
              <span className="ms-2 fw-medium">
                {getDisplayName(selectedUser)}
              </span>
            </>
          ) : (
            <span className="text-muted">Select an assignee...</span>
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
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </div>

      {isOpen && (
        <div
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
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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

          {/* Users List */}
          <div style={{ maxHeight: "250px", overflowY: "auto" }}>
            {isLoading ? (
              <div className="p-4 text-center">
                <div
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                ></div>
                Loading users...
              </div>
            ) : error ? (
              <div className="p-4 text-center text-danger">
                <i className="fas fa-exclamation-triangle me-2"></i>
                {error}
              </div>
            ) : filteredUsers.length === 0 ? (
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
                <div>No users found</div>
                <small className="text-muted">
                  {searchQuery
                    ? `Try adjusting your search terms`
                    : `No users available`}
                </small>
              </div>
            ) : (
              filteredUsers.map((user) => {
                const displayName = getDisplayName(user);
                return (
                  <div
                    key={user.id}
                    className={`d-flex align-items-center p-3 cursor-pointer ${
                      selectedUserId === user.id ? "bg-light" : ""
                    }`}
                    style={{
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                    onClick={() => {
                      onSelect(user.id);
                      setIsOpen(false);
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f8f9fa";
                    }}
                    onMouseLeave={(e) => {
                      if (selectedUserId !== user.id) {
                        e.currentTarget.style.backgroundColor = "white";
                      }
                    }}
                  >
                    <div className="me-3">
                      <LetterAvatar name={displayName} size="md" />
                    </div>
                    <div className="flex-grow-1">
                      <div
                        className="fw-semibold text-dark mb-1"
                        style={{ fontSize: "0.9rem" }}
                      >
                        {displayName}
                        {currentUser && user.id === currentUser.id && (
                          <span className="badge bg-primary ms-2">You</span>
                        )}
                      </div>
                      <div
                        className="text-muted"
                        style={{ fontSize: "0.8rem" }}
                      >
                        {user.email}
                      </div>
                    </div>
                    {selectedUserId === user.id && (
                      <div className="ms-2">
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
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
