import axios from "axios";

const { BACKEND_URL } = process.env;

// Creating a global instance of Axios with default configuration
const axiosInstance = axios.create({
  withCredentials: true,
});

class AuthService {
  constructor() {
    // this.userServiceUrl=BACKEND_URL;
    this.userServiceUrl = "http://localhost:8000";
  }

  signIn(data) {
    return axiosInstance.post(`${this.userServiceUrl}/api/users/signin`, data);
  }

  signUpAdmin(data) {
    return axiosInstance.post(
      `${this.userServiceUrl}/api/users/admin/signup`,
      data
    );
  }

  verifyOtpForAdmin(data) {
    return axiosInstance.post(
      `${this.userServiceUrl}/api/users/admin/verifyOtp`,
      data
    );
  }

  completeAdminSignup(data) {
    return axiosInstance.post(
      `${this.userServiceUrl}/api/users/admin/completeSignup`,
      data
    );
  }

  signUpStudent(data) {
    return axiosInstance.post(
      `${this.userServiceUrl}/api/users/student/signup`,
      data
    );
  }

  verifyOtpForStudent(data) {
    return axiosInstance.post(
      `${this.userServiceUrl}/api/users/student/verifyOtp`,
      data
    );
  }

  completeStudentSignup(data) {
    return axiosInstance.post(
      `${this.userServiceUrl}/api/users/student/completeSignup`,
      data
    );
  }

  forgetPassword(data) {
    return axiosInstance.post(
      `${this.userServiceUrl}/api/users/forgetpassword`,
      data
    );
  }

  changePassword(data) {
    return axiosInstance.post(
      `${this.userServiceUrl}/api/users/changepassword`,
      data
    );
  }

  getCurrentUser() {
    return axiosInstance.get(`${this.userServiceUrl}/api/users/currentuser`);
  }

  logout() {
    return axiosInstance.post(`${this.userServiceUrl}/api/users/logout`, null);
  }
}

export default new AuthService();
