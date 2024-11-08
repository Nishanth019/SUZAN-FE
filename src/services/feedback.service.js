import axios from "axios";

const { BACKEND_URL } = process.env;

// Creating a global instance of Axios with default configuration
const axiosInstance = axios.create({
  withCredentials: true,
});

class FeedbackService {
  constructor() {
    // this.url = BACKEND_URL;
    // this.url = "http://localhost:8000"; // Backend URL
    this.url = "https://suzan-be-mmz3.onrender.com"; // Backend URL if deployed
    // this.url = "https://suzan-be-production.onrender.com";
  } 

  createFeedback(data) {
    return axiosInstance.post(`${this.url}/api/feedback/`, data);
  }
  getAllFeedbacks() {
    return axiosInstance.get(`${this.url}/api/feedback/`);
  }

}

export default new FeedbackService();
