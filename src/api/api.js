// api/api.js
const API_BASE_URL = "https://collabify-backend-production-cb65.up.railway.app";

// Generic API request function
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
   // credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  try {
    console.log("Sending to backend:", url, config);
    const response = await fetch(url, config);

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(
        data?.message || `HTTP error! status: ${response.status}`
      );
    }

    return data;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}

// Auth API functions
export const authAPI = {
  register: async (userData) => {
    return apiRequest("/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  login: async (credentials) => {
    return apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
};

// User API functions
export const userAPI = {
  getCurrentUser: async () => {
    return apiRequest("/api/users/me");
  },

  getUserById: async (userId) => {
    return apiRequest(`/api/users/${userId}`);
  },

  // Add this new function
  getAllUsers: async () => {
    return apiRequest("/api/users/");
  },
};

// Projects API functions (example)
export const projectAPI = {
  // Get projects for the authenticated user
  getUserProjects: async () => {
    try {
      console.log("🔍 Fetching user projects...");
      const token = tokenManager.getToken();
      console.log("🔑 Token exists:", !!token);

      if (!token) {
        throw new Error("No authentication token found");
      }

      const result = await apiRequest("/api/projects/my-projects");
      console.log("✅ User projects response:", result);
      return result;
    } catch (error) {
      console.error("❌ Failed to fetch user projects:", error);
      throw error;
    }
  },

  getAllProjects: async () => {
    return apiRequest("/api/projects");
  },

  getProjectById: async (projectId) => {
    return apiRequest(`/api/projects/${projectId}`);
  },

  createProject: async (projectData) => {
    return apiRequest("/api/projects", {
      method: "POST",
      body: JSON.stringify(projectData),
    });
  },

  updateProject: async (projectId, projectData) => {
    return apiRequest(`/api/projects/${projectId}`, {
      method: "PUT",
      body: JSON.stringify(projectData),
    });
  },

  deleteProject: async (projectId) => {
    return apiRequest(`/api/projects/${projectId}`, {
      method: "DELETE",
    });
  },

  // Member management
  addMember: async (projectId, userId) => {
    return apiRequest(`/api/projects/${projectId}/members/${userId}`, {
      method: "POST",
    });
  },

  removeMember: async (projectId, userId) => {
    return apiRequest(`/api/projects/${projectId}/members/${userId}`, {
      method: "DELETE",
    });
  },

  getProjectMembers: async (projectId) => {
    return apiRequest(`/api/projects/${projectId}/members`);
  },

  getProjectIdsByUserId: async (userId) => {
    return apiRequest(`/api/projects/user/${userId}/ids`);
  },

  getProjectTasks: async (projectId) => {
    return apiRequest(`/api/projects/${projectId}/tasks`);
  },
};

// Token management
export const tokenManager = {
  setToken: (token) => {
    localStorage.setItem("authToken", token);
  },

  getToken: () => {
    return localStorage.getItem("authToken");
  },

  removeToken: () => {
    localStorage.removeItem("authToken");
  },

  isTokenExpired: (token) => {
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  },
};

export const taskAPI = {
  getTasksByProject: async (projectId) => {
    return apiRequest(`/api/projects/${projectId}/tasks`);
  },

  createTask: async (taskData) => {
    return apiRequest("/api/tasks", {
      method: "POST",
      body: JSON.stringify(taskData),
    });
  },

  updateTask: async (taskId, taskData) => {
    return apiRequest(`/api/tasks/${taskId}`, {
      method: "PUT",
      body: JSON.stringify(taskData),
    });
  },

  updateTaskStatus: async (taskId, status) => {
    return apiRequest(`/api/tasks/${taskId}/status?status=${status}`, {
      method: "PATCH",
    });
  },

  deleteTask: async (taskId) => {
    return apiRequest(`/api/tasks/${taskId}`, {
      method: "DELETE",
    });
  },

  assignUser: async (taskId, userId) => {
    return apiRequest(`/api/tasks/${taskId}/assignee/${userId}`, {
      method: "POST",
    });
  },

  unassignUser: async (taskId) => {
    return apiRequest(`/api/tasks/${taskId}/assignee`, {
      method: "DELETE",
    });
  },
};
// Comments API functions
export const commentAPI = {
  createComment: async (projectId, commentData) => {
    return apiRequest(`/api/projects/${projectId}/comments`, {
      method: "POST",
      body: JSON.stringify(commentData),
    });
  },

  getCommentsByProject: async (projectId) => {
    return apiRequest(`/api/projects/${projectId}/comments`);
  },
};
