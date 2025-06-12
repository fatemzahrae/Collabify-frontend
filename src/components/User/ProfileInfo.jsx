import "@/assets/css/nucleo-icons.css";
import "@/assets/css/nucleo-svg.css";
import "@/assets/css/corporate-ui-dashboard.css?v=1.0.0";
import React from "react";

const ProfileInfo = ({ user, editable = true }) => {
  // Handle case where user might be null/undefined
  if (!user) {
    return (
      <div className="card border shadow-xs h-100">
        <div className="card-body p-3 d-flex align-items-center justify-content-center">
          <p>Loading user information...</p>
        </div>
      </div>
    );
  }

  const {
    firstname = "",
    lastname = "",
    email = "",
    role = "",
    id = "",
  } = user;

  return (
    <div className="card border shadow-xs h-100">
      <div className="card-header pb-0 p-3">
        <div className="row">
          <div className="col-md-8 col-9">
            <h6 className="mb-0 font-weight-semibold text-lg">
              Profile information
            </h6>
            <p className="text-sm mb-1">Edit the information about you.</p>
          </div>
          {editable && (
            <div className="col-md-4 col-3 text-end">
              <button
                type="button"
                className="btn btn-white btn-icon px-2 py-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="card-body p-3">
        {/* User Details */}
        <ul className="list-group">
          <li className="list-group-item border-0 ps-0 text-dark font-weight-semibold pt-0 pb-1 text-sm">
            <span className="text-secondary">User ID:</span> &nbsp; {id}
          </li>
          <li className="list-group-item border-0 ps-0 text-dark font-weight-semibold pb-1 text-sm">
            <span className="text-secondary">First Name:</span> &nbsp;{" "}
            {firstname}
          </li>
          <li className="list-group-item border-0 ps-0 text-dark font-weight-semibold pb-1 text-sm">
            <span className="text-secondary">Last Name:</span> &nbsp; {lastname}
          </li>
          <li className="list-group-item border-0 ps-0 text-dark font-weight-semibold pb-1 text-sm">
            <span className="text-secondary">Email:</span> &nbsp; {email}
          </li>
          <li className="list-group-item border-0 ps-0 text-dark font-weight-semibold pb-1 text-sm">
            <span className="text-secondary">Role:</span> &nbsp; {role}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileInfo;
