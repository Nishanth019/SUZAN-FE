import axios from "axios";

const { BACKEND_URL } = process.env;

// Creating a global instance of Axios with default configuration
const axiosInstance = axios.create({
  withCredentials: true,
});

class UserService {
  constructor() {
    // You can use the BACKEND_URL from environment variables if available
    // this.url = BACKEND_URL;
    // this.url = "http://localhost:8000";
    // this.url = "https://suzan-be-mmz3.onrender.com";
    this.url = "https://suzan-be-production.onrender.com";
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
    updateUser( userData) {
      return axiosInstance.put(
        `${this.url}/api/users/updateuser`,
        userData
      );
    }
    updateUserRole( userData) {
      return axiosInstance.put(
        `${this.url}/api/users/updateuserrole`,
        userData
      );
    }

  // Function to delete user
  deleteUser() {
    return axiosInstance.delete(
      `${this.url}/api/users/deleteuser`
    );
  }

  getUsersCount(){
    return axiosInstance.get(
      `${this.url}/api/users/getuserscount`
    );
  }
  getAdminsCount(){
    return axiosInstance.get(
      `${this.url}/api/users/getadminscount`
    );
  }
    

  getUserById(userId) {
    return axiosInstance.get(
      `${this.url}/api/users/getuser/${userId}`
    );
  }

  // Function to delete user by ID
  deleteUserById(userId) {
    return axiosInstance.delete(
      `${this.url}/api/users/deleteuser/${userId}`
    );
  }

  // Function to update user by ID
  updateUserById(userId, userData) {
    return axiosInstance.put(
      `${this.url}/api/users/updateuser/${userId}`,
      userData
    );
  }

    // Function to upload picture
    uploadPicture(formData) {
      return axiosInstance.post(
        `${this.url}/api/users/uploadpicture`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
    }

  
}

export default new UserService();
