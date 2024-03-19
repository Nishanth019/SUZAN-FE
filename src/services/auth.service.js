import axios from "axios";

const { BACKEND_URL } = process.env;

// Creating a global instance of Axios with default configuration
const axiosInstance = axios.create({
  withCredentials: true,
});

class AuthService {
  constructor() {
    // this.url=BACKEND_URL;
    this.url = "http://localhost:8000";
    // this.url = "https://suzan-be.vercel.app";
  }

  signIn(data) {
    return axiosInstance.post(`${this.url}/api/auth/signin`, data);
  }

  signUpAdmin(data) {
    return axiosInstance.post(
      `${this.url}/api/auth/admin/signup`,
      data
    );
  }

  verifyOtpForAdmin(data) {
    return axiosInstance.post(
      `${this.url}/api/auth/admin/verifyOtp`,
      data
    );
  }

  completeAdminSignup(data) {
    return axiosInstance.post(
      `${this.url}/api/auth/admin/completeSignup`,
      data
    );
  }

  signUpStudent(data) {
    return axiosInstance.post(
      `${this.url}/api/auth/student/signup`,
      data
    );
  }

  verifyOtpForStudent(data) {
    return axiosInstance.post(
      `${this.url}/api/auth/student/verifyOtp`,
      data
    );
  }

  completeStudentSignup(data) {
    return axiosInstance.post(
      `${this.url}/api/auth/student/completeSignup`,
      data
    );
  }

  forgetPassword(data) {
    return axiosInstance.post(
      `${this.url}/api/auth/forgetpassword`,
      data
    );
  }

  changePassword(data) {
    return axiosInstance.post(
      `${this.url}/api/auth/changepassword`,
      data
    );
  }

  signout() {
    return axiosInstance.post(`${this.url}/api/auth/signout`);
  }
}

export default new AuthService();
