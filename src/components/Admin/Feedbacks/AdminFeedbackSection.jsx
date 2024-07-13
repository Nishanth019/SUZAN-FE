import React,{ useState , useEffect } from 'react'
import Card from "@mui/material/Card";
import { MdPerson2 } from 'react-icons/md';

import feedbackService from '@/services/feedback.service';

const AdminFeedbackSection = () => {
    

      const [Feedbacks,setFeedbacks]=useState([]);
      
      useEffect(() => {
        async function getAllTheFeedbacks() {
          try {
            const response = await feedbackService.getAllFeedbacks();
            setFeedbacks(response.data.feedbacks);
            // console.log(response.data.feedbacks);
            // setSelectedFieldOfStudy(response.data.fieldsOfStudy[0]?._id);
          } catch (error) {
            console.error("Error fetching colleges", error);
          }
        }
        getAllTheFeedbacks();
      }, []);


      return (

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-6">
          {Feedbacks.map((feedback, index) => (
            <Card key={index} className="p-6 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-primary rounded-full p-2 flex items-center justify-center">
                <MdPerson2 size={22} />
                  {/* <UserIcon className="w-6 h-6 text-primary-foreground" /> */}
                </div>
                <div>
                  <h3 className="text-lg font-medium">{feedback.fullname}</h3>
                  <p className="text-sm text-muted-foreground">{feedback.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{feedback.mobile}</span>
              </div>
              <p className="text-muted-foreground">{feedback.message}</p>
            </Card>
          ))}
        </section>
      )
}

export default AdminFeedbackSection