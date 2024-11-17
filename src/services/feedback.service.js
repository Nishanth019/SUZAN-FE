import axios from "axios";

const  NEXT_PUBLIC_BACKEND_URL  = process.env.NEXT_PUBLIC_BACKEND_URL;

// Creating a global instance of Axios with default configuration
const axiosInstance = axios.create({
  withCredentials: true,
});

class FeedbackService {
  constructor() {
    this.url = NEXT_PUBLIC_BACKEND_URL;
  } 

  createFeedback(data) {
    return axiosInstance.post(`${this.url}/api/feedback/`, data);
  }
  getAllFeedbacks() {
    return axiosInstance.get(`${this.url}/api/feedback/`);
  }

}

export default new FeedbackService();
