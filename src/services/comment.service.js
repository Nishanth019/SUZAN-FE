import axios from "axios";

const { BACKEND_URL } = process.env;

// Creating a global instance of Axios with default configuration
const axiosInstance = axios.create({
  withCredentials: true,
});

class commentService {
  constructor() {
    // this.url=BACKEND_URL;
    // this.url = "http://localhost:8000";
    this.url = "https://suzan-be-mmz3.onrender.com";
    // this.url = "https://suzan-be-production.onrender.com";
  }

  createMainComment(commentData) {
    return axiosInstance.post(`${this.url}/api/comments/target/comment`, commentData);
  }

  createReplyComment(replyData) {
    return axiosInstance.post(`${this.url}/api/comments/comment/reply`, replyData);
  }

  createReplyToReply(replyData) {
    return axiosInstance.post(`${this.url}/api/comments/comment/replytoreply`, replyData);
  }

  getAllComments(targetId) {
    return axiosInstance.get(`${this.url}/api/comments/target/${targetId}/comments`);
  }

  deleteComment(commentId) {
    return axiosInstance.delete(`${this.url}/api/comments/comment/${commentId}`);
  }

  deleteReplyComment({replyId}) {
    return axiosInstance.delete(`${this.url}/api/comments/replycomment/${replyId}`);
  }

  likeComment(commentId, userId) {
    return axiosInstance.post(`${this.url}/api/comments/comment/${commentId}/like`, { userId });
  }

  likeReplyComment(replyId, userId) {
    return axiosInstance.post(`${this.url}/api/comments/replycomment/${replyId}/like`, { userId });
  }

  updateComment(commentId, commentData) {
    return axiosInstance.put(`${this.url}/api/comments/comment/${commentId}`, commentData);
  }

  updateReplyComment(replyId, replyData) {
    return axiosInstance.put(`${this.url}/api/comments/replycomment/${replyId}`, replyData);
  }

  getComment(commentId) {
    return axiosInstance.get(`${this.url}/api/comments/comment/${commentId}`);
  }

  getReplyComment(replyId) {
    return axiosInstance.get(`${this.url}/api/comments/replycomment/${replyId}`);
  }

    getCommentLikes(commentId) {
      return axiosInstance.get(`${this.url}/api/comments/comment/${commentId}/likes`);
    }
  
    getReplyCommentLikes(replyId) {
      return axiosInstance.get(`${this.url}/api/comments/replycomment/${replyId}/likes`);
    }

}

export default new commentService();
