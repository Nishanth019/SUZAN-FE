import axios from "axios";

const  NEXT_PUBLIC_BACKEND_URL  = process.env.NEXT_PUBLIC_BACKEND_URL;

// Creating a global instance of Axios with default configuration
const axiosInstance = axios.create({
  withCredentials: true,
});

class UserService {
  constructor() {
    this.url = NEXT_PUBLIC_BACKEND_URL;
  }

  getCurrentUser() {
    return axiosInstance.get(`${this.url}/api/users/currentuser`);
  }

  getUserByEmail(email) {
    return axiosInstance.get(`${this.url}/api/users/userbyemail`, {
      params: { email },
    });
  }

  // Function to update user
  updateUser(userData) {
    return axiosInstance.put(`${this.url}/api/users/updateuser`, userData);
  }

  updateUserRole(userData) {
    return axiosInstance.put(`${this.url}/api/users/updateuserrole`, userData);
  }

  // Function to delete user
  deleteUser() {
    return axiosInstance.delete(`${this.url}/api/users/deleteuser`);
  }

  getUsersCount() {
    return axiosInstance.get(`${this.url}/api/users/getuserscount`);
  }

  getAdminsCount() {
    return axiosInstance.get(`${this.url}/api/users/getadminscount`);
  }

  // Function to get all admins
  getAllAdmins() {
    return axiosInstance.get(`${this.url}/api/users/getalladmins`);
  }

  getUserById(userId) {
    return axiosInstance.get(`${this.url}/api/users/getuser/${userId}`);
  }

  // Function to delete user by ID
  deleteUserById(userId) {
    return axiosInstance.delete(`${this.url}/api/users/deleteuser/${userId}`);
  }

  // Function to update user by ID
  updateUserById(userId, userData) {
    return axiosInstance.put(`${this.url}/api/users/updateuser/${userId}`, userData);
  }

  // Function to upload picture
  uploadPicture(formData) {
    return axiosInstance.post(`${this.url}/api/users/uploadpicture`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

    // Function to switch main admin access
    switchMainAdmin(data) {
      return axiosInstance.put(`${this.url}/api/users/switchmainadmin`, data);
    }
}

export default new UserService();
