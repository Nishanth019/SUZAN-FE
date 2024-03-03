import httpservice from "../config/httpservice,";
const { BACKEND_URL }=process.env;

class AuthService {
  constructor() {
    // this.userServiceUrl=BACKEND_URL;
    this.userServiceUrl="http://localhost:8000";
  }
  login=async (data) => {
    return httpservice.post(this.userServiceUrl+"/api/users/login", {
      ...data
    });

  };
  loginViaOtp=async (data) => {
    return httpservice.post(this.userServiceUrl+"/api/users/login/otp", {
      ...data
    });

  };
  sendOtp = async (data) => {
    return httpservice.post(this.userServiceUrl+"/api/users/otp/send", {
      ...data
    });
  }
  verifyOtp = async (data) => {
    return httpservice.post(this.userServiceUrl+"/api/users/verify/otp", {
      ...data
    });
  }
  sendOtpForSignUp=async (data) => {
    return httpservice.post(this.userServiceUrl+"/api/users/signUp", {
      ...data
    });

  };
  verifyOtpForSignUp=async (data) => {
    return httpservice.post(
      this.userServiceUrl+"/api/users/verify/otp",
      { ...data }
    );
  };
  createPassword=async (email, password, token) => {
    // console.log({token})
    try {
      return await httpservice.put(
        this.userServiceUrl+`/api/users/update/password`,
        { password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (ex) {
      console.log({ ex });
    }
  };
}

export default new AuthService();
