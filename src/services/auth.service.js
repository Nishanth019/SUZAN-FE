import httpservice from "../config/httpservice,";
const { BACKEND_URL }=process.env;

class AuthService {
  constructor() {
    // this.userServiceUrl=BACKEND_URL;
    this.userServiceUrl="http://localhost:8000";
  }
  
  
}

export default new AuthService();
