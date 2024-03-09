import axios from "axios";

const { BACKEND_URL } = process.env;

// Creating a global instance of Axios with default configuration
const axiosInstance = axios.create({
  withCredentials: true,
});

class UserService {
  constructor() {
    // this.userServiceUrl=BACKEND_URL;
    this.userServiceUrl = "http://localhost:8000";
  }

  getCurrentUser() {
    return axiosInstance.get(`${this.userServiceUrl}/api/users/currentuser`);
  }
  
}

export default new UserService();
