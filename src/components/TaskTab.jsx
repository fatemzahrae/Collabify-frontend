import React, { useState } from "react";
import Task from "./Task";

const TaskTab = () => {
  const [taskForm, setTaskForm] = useState({
    name: "",
    description: "",
    assignee: "",
    customAssignee: "",
    priority: "Medium",
    dueDate: "",
  });

  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editForm, setEditForm] = useState({
    assignee: "",
    customAssignee: "",
  });

  const handleEditTask = (task) => {
    setEditingTask(task);
    setEditForm({
      assignee: task.assignee.name,
      customAssignee: "",
    });
    setShowEditModal(true);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    }
  };

  const handleSaveEdit = () => {
    if (!editForm.assignee.trim()) {
      alert("Assignee is required");
      return;
    }

    const assigneeName =
      editForm.assignee === "custom"
        ? editForm.customAssignee
        : editForm.assignee;
    if (!assigneeName.trim()) {
      alert("Assignee is required");
      return;
    }

    // Find or create assignee
    let assignee;
    const existingAssignee = availableAssignees.find(
      (a) => a.name === assigneeName
    );

    if (existingAssignee) {
      assignee = existingAssignee;
    } else {
      // Create new assignee with generated email
      assignee = {
        name: assigneeName,
        email: `${assigneeName.toLowerCase().replace(" ", ".")}@company.com`,
      };
    }

    // Update the task
    setTasks((prev) =>
      prev.map((task) =>
        task.id === editingTask.id ? { ...task, assignee: assignee } : task
      )
    );

    closeEditModal();
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingTask(null);
    setEditForm({
      assignee: "",
      customAssignee: "",
    });
  };

  return (
    <div className="card border shadow-xs mb-4">
      <div className="card-body px-0 py-0">
        <div className="border-bottom py-3 px-3 d-sm-flex align-items-center">
          <div className="input-group w-sm-25 me-auto mt-3 mt-sm-0">
            <span className="input-group-text text-body">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16px"
                height="16px"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                ></path>
              </svg>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Create Task Button */}
          <button
            type="button"
            className="btn btn-dark btn-sm d-flex align-items-center me-2 shadow-sm"
            style={{
              border: "none",
              color: "white",
              borderRadius: "0.5rem",
              padding: "0.5rem 1rem",
              transition: "all 0.3s ease",
            }}
            onClick={() => setShowAddTaskModal(true)}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow =
                "0 4px 15px rgba(119, 77, 211, 0.3)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
            }}
          >
            <span className="btn-inner--icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="white"
                className="bi bi-plus-lg"
                viewBox="0 0 16 16"
                style={{ marginRight: "5px" }}
              >
                <path
                  fillRule="evenodd"
                  d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                />
              </svg>
            </span>
            <span className="btn-inner--text">Add Task</span>
          </button>
        </div>
        <div className="table-responsive p-0">
          <table className="table align-items-center mb-0">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-secondary text-xs font-weight-semibold opacity-7">
                  Task
                </th>
                <th className="text-secondary text-xs font-weight-semibold opacity-7 ps-2">
                  Assigned To
                </th>
                <th className="text-center text-secondary text-xs font-weight-semibold opacity-7">
                  Status
                </th>
                <th className="text-center text-secondary text-xs font-weight-semibold opacity-7">
                  Due Date
                </th>
                <th className="text-secondary opacity-7"></th>
              </tr>
            </thead>
            <tbody>
              {getFilteredTasks().map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  handleDeleteTask={handleAddTask}
                  handleEditTask={handleEditTask}
                />
              ))}

              {getFilteredTasks().length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    <p className="text-sm mb-0">
                      No tasks found matching your criteria.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaskTab;
