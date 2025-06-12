import React from "react";
import LetterAvatar from "./LetterAvatar";
import getPriorityBadge from "./getPriorityBadge";

const Task = ({
  task,
  handleEditTask,
  handleDeleteTask,
  projectLeadId,
  currentUser,
}) => {
  const isProjectLead = currentUser && currentUser.id === projectLeadId;
  const getDisplayName = (user) => {
    if (!user) return "Unknown User";

    const fullName = `${user.firstname || ""} ${user.lastname || ""}`.trim();

    return fullName || user.email?.split("@")[0] || "Unknown User";
  };

  const getDisplayEmail = (user) => {
    if (!user || !user.email) return "No email";
    return user.email;
  };

  const renderAssigneeSection = () => {
    if (!task.assignee) {
      return (
        <div className="d-flex px-2 py-1">
          <div className="d-flex align-items-center">
            <LetterAvatar name="Unassigned" size="sm" />
          </div>
          <div className="d-flex flex-column justify-content-center ms-1">
            <h6 className="mb-0 text-sm font-weight-semibold">Unassigned</h6>
            <p className="text-sm text-secondary mb-0">No assignee</p>
          </div>
        </div>
      );
    }

    return (
      <div className="d-flex px-2 py-1">
        <div className="d-flex align-items-center">
          <LetterAvatar name={getDisplayName(task.assignee)} size="sm" />
        </div>
        <div className="d-flex flex-column justify-content-center ms-1">
          <h6 className="mb-0 text-sm font-weight-semibold">
            {getDisplayName(task.assignee)}
          </h6>
          <p className="text-sm text-secondary mb-0">
            {getDisplayEmail(task.assignee)}
          </p>
        </div>
      </div>
    );
  };

  return (
    <tr key={task.id}>
      <td>
        <div className="d-flex px-2 py-1">
          <div className="d-flex flex-column justify-content-center">
            <div
              className="d-flex align-items-center mb-0"
              style={{ minWidth: 0 }}
            >
              <h6
                className="mb-0 text-sm font-weight-semibold text-truncate"
                style={{
                  minWidth: 0,
                  flex: "1 1 auto",
                }}
              >
                {task.name}
              </h6>
              <div className="ms-2" style={{ flexShrink: 0 }}>
                {getPriorityBadge(task.priority)}
              </div>
            </div>
            <p className="text-sm text-secondary mb-0">{task.description}</p>
          </div>
        </div>
      </td>
      <td>{renderAssigneeSection()}</td>
      <td className="align-middle text-center text-sm">
        <span
          className={`badge badge-sm border ${
            task.status === "Done"
              ? "border-success text-success bg-success"
              : task.status === "In Progress"
              ? "border-info text-info bg-info"
              : "border-warning text-warning bg-warning"
          }`}
        >
          {task.status}
        </span>
      </td>
      <td className="align-middle text-center">
        <span className="text-secondary text-sm font-weight-normal">
          {task.dueDate}
        </span>
      </td>
      {isProjectLead && (
        <td className="align-middle">
          <div className="d-flex gap-2">
            <a
              href="#"
              className="text-secondary font-weight-bold text-xs"
              onClick={(e) => {
                e.preventDefault();
                handleEditTask(task);
              }}
              style={{ cursor: "pointer" }}
              title="Edit task"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 15 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.2201 2.02495C10.8292 1.63482 10.196 1.63545 9.80585 2.02636C9.41572 2.41727 9.41635 3.05044 9.80726 3.44057L11.2201 2.02495ZM12.5572 6.18502C12.9481 6.57516 13.5813 6.57453 13.9714 6.18362C14.3615 5.79271 14.3609 5.15954 13.97 4.7694L12.5572 6.18502ZM11.6803 1.56839L12.3867 2.2762L12.3867 2.27619L11.6803 1.56839ZM14.4302 4.31284L15.1367 5.02065L15.1367 5.02064L14.4302 4.31284ZM3.72198 15V16C3.98686 16 4.24091 15.8949 4.42839 15.7078L3.72198 15ZM0.999756 15H-0.000244141C-0.000244141 15.5523 0.447471 16 0.999756 16L0.999756 15ZM0.999756 12.2279L0.293346 11.5201C0.105383 11.7077 -0.000244141 11.9624 -0.000244141 12.2279H0.999756ZM9.80726 3.44057L12.5572 6.18502L13.97 4.7694L11.2201 2.02495L9.80726 3.44057ZM12.3867 2.27619C12.7557 1.90794 13.3549 1.90794 13.7238 2.27619L15.1367 0.860593C13.9869 -0.286864 12.1236 -0.286864 10.9739 0.860593L12.3867 2.27619ZM13.7238 2.27619C14.0917 2.64337 14.0917 3.23787 13.7238 3.60504L15.1367 5.02064C16.2875 3.8721 16.2875 2.00913 15.1367 0.860593L13.7238 2.27619ZM13.7238 3.60504L3.01557 14.2922L4.42839 15.7078L15.1367 5.02065L13.7238 3.60504ZM3.72198 14H0.999756V16H3.72198V14ZM1.99976 15V12.2279H-0.000244141V15H1.99976ZM1.70617 12.9357L12.3867 2.2762L10.9739 0.86059L0.293346 11.5201L1.70617 12.9357Z"
                  fill="#64748B"
                />
              </svg>
            </a>
            <a
              href="#"
              className="text-danger font-weight-bold text-xs"
              onClick={(e) => {
                e.preventDefault();
                handleDeleteTask(task.id);
              }}
              style={{ cursor: "pointer" }}
              title="Delete task"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14zM10 11v6M14 11v6"
                  stroke="#dc3545"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </td>
      )}
    </tr>
  );
};

export default Task;
