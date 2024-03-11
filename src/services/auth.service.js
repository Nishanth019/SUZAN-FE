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
    return axiosInstance.post(`${this.userServiceUrl}/api/auth/signin`, data);
  }

  signUpAdmin(data) {
    return axiosInstance.post(
      `${this.userServiceUrl}/api/auth/admin/signup`,
      data
    );
  }

  verifyOtpForAdmin(data) {
    return axiosInstance.post(
      `${this.userServiceUrl}/api/auth/admin/verifyOtp`,
      data
    );
  }

  completeAdminSignup(data) {
    return axiosInstance.post(
      `${this.userServiceUrl}/api/auth/admin/completeSignup`,
      data
    );
  }

  signUpStudent(data) {
    return axiosInstance.post(
      `${this.userServiceUrl}/api/auth/student/signup`,
      data
    );
  }

  verifyOtpForStudent(data) {
    return axiosInstance.post(
      `${this.userServiceUrl}/api/auth/student/verifyOtp`,
      data
    );
  }

  completeStudentSignup(data) {
    return axiosInstance.post(
      `${this.userServiceUrl}/api/auth/student/completeSignup`,
      data
    );
  }

  forgetPassword(data) {
    return axiosInstance.post(
      `${this.userServiceUrl}/api/auth/forgetpassword`,
      data
    );
  }

  changePassword(data) {
    return axiosInstance.post(
      `${this.userServiceUrl}/api/auth/changepassword`,
      data
    );
  }



  logout() {
    return axiosInstance.post(`${this.userServiceUrl}/api/auth/logout`, null);
  }
}

export default new AuthService();
