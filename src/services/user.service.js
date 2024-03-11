import axios from "axios";

const { BACKEND_URL } = process.env;

// Creating a global instance of Axios with default configuration
const axiosInstance = axios.create({
  withCredentials: true,
});

class UserService {
  constructor() {
    // You can use the BACKEND_URL from environment variables if available
    // this.userServiceUrl = BACKEND_URL || "http://localhost:8000";
    this.userServiceUrl = "http://localhost:8000";
  }

  getCurrentUser() {
    return axiosInstance.get(`${this.userServiceUrl}/api/users/currentuser`);
  }

  getUserById(userId) {
    return axiosInstance.get(`${this.userServiceUrl}/api/users/${userId}`);
  }

  // Function to delete user by ID
  deleteUserById(userId) {
    return axiosInstance.delete(`${this.userServiceUrl}/api/users/${userId}`);
  }

  // Function to update user by ID
  updateUserById(userId, userData) {
    return axiosInstance.put(
      `${this.userServiceUrl}/api/users/${userId}`,
      userData
    );
  }
}

export default new UserService();
