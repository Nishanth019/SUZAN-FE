import axios from "axios";

const { BACKEND_URL } = process.env;

// Creating a global instance of Axios with default configuration
const axiosInstance = axios.create({
  withCredentials: true,
});

class CourseService {
  constructor() {
    // this.url = BACKEND_URL;
    this.url = "http://localhost:8000"; // Backend URL
    // this.url = 'https://suzan-be.vercel.app'; // Backend URL if deployed
  }

  // Create a program under a college
  createProgram(data) {
    return axiosInstance.post(`${this.url}/api/course/programs`, data);
  }
  updateProgram(data) {
    return axiosInstance.put(`${this.url}/api/course/programs/updateProgram`, data);
  }
  deleteProgram({programId}) {
    return axiosInstance.delete(`${this.url}/api/course/programs/${programId}`);
  }

  // Get all programs
  getAllPrograms() {
    return axiosInstance.get(`${this.url}/api/course/programs`);
  }

  // Create a field of study under a program
  createFieldOfStudy(data) {
    return axiosInstance.post(`${this.url}/api/course/fieldOfStudy`, data);
  }

  // Get all fields of study for a program
  getAllFieldsOfStudy(data) {
    return axiosInstance.get(`${this.url}/api/course/fieldOfStudy/${data}`);
  }

  getFieldOfStudyById(data) {
    return axiosInstance.get(`${this.url}/api/course/fieldOfStudyById/${data}`);
  }

  // Create a course under a semester
  createCourse(data) {
    return axiosInstance.post(`${this.url}/api/course/courses`, data);
  }

  // Get all courses for a program
  getAllCourses(programId) {
    return axiosInstance.get(`${this.url}/api/course/courses`, {
      programId,
    });
  }

  getSemesterById(data) {
    return axiosInstance.get(`${this.url}/api/course/semesters/${data}`); 
  }

  // Get all courses
  getAllSpecificCourses(data) {
    return axiosInstance.get(`${this.url}/api/course/specificcourses`,data);
  }
}

export default new CourseService();
