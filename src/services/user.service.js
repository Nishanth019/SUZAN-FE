import httpservice from "../config/httpservice,";
const { BACKEND_URL }=process.env;

class UserService {
  constructor() {
    // this.userServiceUrl=BACKEND_URL;
    this.userServiceUrl="http://localhost:8000";
  }
  getCurrentUser=async () => {
    try {
      return await httpservice.get(this.userServiceUrl+"/api/users/own");
    } catch (ex) {
      console.log({ ex });
    }
  };
  updateCurrentUser=async (data) => {
    // console.log({token})
    try {
      return await httpservice.put(this.userServiceUrl+`/api/users/update`, {
        ...data,
      });
    } catch (ex) {
      console.log({ ex });
    }
  };
  addContactInBiginAfterSignUpViaOtp=async (data) => {
    // console.log({token})
    try {
      return httpservice.post(this.userServiceUrl+`/api/users/register/otp`, {
        ...data,
      });
    } catch (ex) {
      console.log({ ex });
    }
  };
}

export default new UserService();
