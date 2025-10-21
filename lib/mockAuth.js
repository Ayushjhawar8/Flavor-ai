// Mock authentication system for community features
// This will be replaced with real auth later

export const mockUsers = [
  {
    id: "user_1",
    name: "Robert Dmello",
    email: "john@example.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    joinedAt: "2024-01-15",
  },
  {
    id: "user_2",
    name: "Sarah Chen",
    email: "sarah@example.com",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    joinedAt: "2024-02-01",
  },
  {
    id: "user_3",
    name: "Mike Johnson",
    email: "mike@example.com",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    joinedAt: "2024-01-20",
  },
  {
    id: "user_4",
    name: "Emily Stone",
    email: "emily@example.com",
    avatar:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&h=100&fit=crop&crop=face",
    joinedAt: "2024-02-10",
  },
  {
    id: "user_5",
    name: "Liam Patel",
    email: "liam@example.com",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&crop=face",
    joinedAt: "2024-03-05",
  },
  {
    id: "user_6",
    name: "Olivia Nguyen",
    email: "olivia@example.com",
    avatar:
      "https://images.unsplash.com/photo-1500048993953-d23a436266cf?w=100&h=100&fit=crop&crop=face",
    joinedAt: "2024-03-15",
  },
  {
    id: "user_7",
    name: "Daniel Kim",
    email: "daniel@example.com",
    avatar:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=100&h=100&fit=crop&crop=face",
    joinedAt: "2024-03-25",
  },
];

// Mock current user (simulate login)
export const getCurrentUser = () => {
  const stored = localStorage.getItem("current_user");
  if (stored) return JSON.parse(stored);

  // Default user
  const defaultUser = mockUsers[0];
  localStorage.setItem("current_user", JSON.stringify(defaultUser));
  return defaultUser;
};

export const setCurrentUser = (userId) => {
  const user = mockUsers.find((u) => u.id === userId);
  if (user) {
    localStorage.setItem("current_user", JSON.stringify(user));
    return user;
  }
  return null;
};

export const logout = () => {
  localStorage.removeItem("current_user");
};
