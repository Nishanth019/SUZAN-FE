import axios from "axios";

const { BACKEND_URL } = process.env;

// Creating a global instance of Axios with default configuration
const axiosInstance = axios.create({
  withCredentials: true,
});

class collegeService {
  constructor() {
    // this.collegeServiceUrl=BACKEND_URL;
    this.collegeServiceUrl = "http://localhost:8000";
  }

  getCollegeById(collegeId) {
    return axiosInstance.get(
      `${this.collegeServiceUrl}/api/colleges/${collegeId}`
    );
  }
  getAllColleges() {
    return axiosInstance.get(`${this.collegeServiceUrl}/api/colleges/`);
  }
  deleteCollegeById(collegeId) {
    return axiosInstance.delete(
      `${this.collegeServiceUrl}/api/colleges/${collegeId}`
    );
  }
  updateCollegeById(collegeId) {
    return axiosInstance.put(
      `${this.collegeServiceUrl}/api/colleges/${collegeId}`
    );
  }
}

export default new collegeService();
