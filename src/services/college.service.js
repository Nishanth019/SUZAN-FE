import axios from "axios";

const { BACKEND_URL } = process.env;

// Creating a global instance of Axios with default configuration
const axiosInstance = axios.create({
  withCredentials: true,
});

class collegeService {
  constructor() {
    // this.url=BACKEND_URL;
    this.url = "http://localhost:8000";
    // this.url = "https://suzan-be.vercel.app";
  }

  getCollegeById(collegeId) {
    return axiosInstance.get(
      `${this.url}/api/colleges/getcollegefromid/${collegeId}`
    );
  }
  
  getAllColleges() {
    return axiosInstance.get(`${this.url}/api/colleges/`);
  }
  getAllVerifiedColleges() {
    return axiosInstance.get(`${this.url}/api/colleges/getverifiedcolleges`);
  }
  deleteCollegeById(collegeId) {
    return axiosInstance.delete(
      `${this.url}/api/colleges/${collegeId}`
    );
  }
  updateCollegeById(collegeId,collegeDetails) {
    return axiosInstance.put(
      `${this.url}/api/colleges/${collegeId}`,collegeDetails
    );
  }
}

export default new collegeService();
