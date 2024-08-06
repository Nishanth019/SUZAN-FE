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
    // this.url = "https://suzan-be-mmz3.onrender.com"; // Backend URL if deployed
  } 
  // Programs
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
  // Get program by ID
  getProgramById({programId}) {
    return axiosInstance.get(`${this.url}/api/course/programs/${programId}`);
  }
  // Search and get program by name
  searchProgram(searchTerm) {
    return axiosInstance.post(`${this.url}/api/course/programs/search?searchTerm=${searchTerm}`);
  }
  // Field of Study
  // Create field of study under a program
  createFieldOfStudy(data) {
    return axiosInstance.post(`${this.url}/api/course/fieldOfStudy`, data);
  }
  // Update field of study
  updateFieldOfStudy(fieldOfStudyId, data) {
    return axiosInstance.put(`${this.url}/api/course/fieldOfStudy/${fieldOfStudyId}`, data);
  }
  // Delete field of study
  deleteFieldOfStudy(fieldOfStudyId) {
    return axiosInstance.delete(`${this.url}/api/course/fieldOfStudy/${fieldOfStudyId}`);
  }

  // Get all fields of study
  getAllFieldsOfStudy(programId) {
    return axiosInstance.get(`${this.url}/api/course/fieldOfStudy/${programId}`);
  }
  // Get all fields of study of a college
  getAllFieldOfStudyOfCollege() {
    return axiosInstance.get(`${this.url}/api/course/fieldOfStudy`);
  }
  // Get field of study by ID
  getFieldOfStudyById({fieldOfStudyId}) {
    return axiosInstance.get(`${this.url}/api/course/fieldOfStudyById/${fieldOfStudyId}`);
  }
  // Search and get field of study by name
  searchFieldOfStudy(payload) {
    return axiosInstance.post(`${this.url}/api/course/fieldOfStudy/search`,payload);
  }
  //Semester
  // Get all semesters by fieldOfStudy
  getAllSemestersByFieldOfStudy({fieldOfStudyId}) {
    return axiosInstance.get(`${this.url}/api/course/semester/${fieldOfStudyId}`);
  }
  getSemesterByCourseId({courseId}){
    return axiosInstance.get(`${this.url}/api/course/semester/course/${courseId}`);
  }

  // Course
  // Create course under a semester
  createCourse(data) {
    return axiosInstance.post(`${this.url}/api/course/courses`, data);
  }

  // Update course
  updateCourse(courseId, data) {
    return axiosInstance.put(`${this.url}/api/course/courses/${courseId}`, data);
  }

  // Delete course
  deleteCourse({deletingCourseId}) {
    console.log(555,deletingCourseId)
    return axiosInstance.delete(`${this.url}/api/course/courses/${deletingCourseId}`);
  }

  // Get all courses
  getAllCourses({ programId, fieldOfStudyId, semesterId }) {
    return axiosInstance.post(`${this.url}/api/course/getcourses`, {
      programId,
      fieldOfStudyId,
      semesterId
    });
  }

  // Get course by ID
  getCourseById({courseId}) {
    return axiosInstance.get(`${this.url}/api/course/courses/${courseId}`);
  }
  
  // Search and get Courses by name
  searchCourse(payload) {
    return axiosInstance.post(`${this.url}/api/course/courses/search`,payload);
  }

  // Upload file
  uploadFile(data) {
    return axiosInstance.post(`${this.url}/api/course/uploadfile`, data, 
           {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }


  //media
  getMediaByCourceId({courseId}){
    return axiosInstance.get(`${this.url}/api/course/courses/media/${courseId}`);
  }
  

    // Upload picture
    uploadPicture(data) {
      return axiosInstance.post(`${this.url}/api/course/uploadpicture`, data,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    }

}

export default new CourseService();
