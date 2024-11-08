import React from 'react';
import { useState, useEffect } from 'react';
import CardDataStats from "./CardDataStats";
import { AiOutlineEye } from 'react-icons/ai';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AppWidgetSummary from './app-widget-summary';
import Image from 'next/image';
import userService from '@/services/user.service';
import courseService from '@/services/course.service'; 
import feedbackService from '@/services/feedback.service';


// Import images
import bagIcon from '@/assets/dashboard/glasss/ic_glass_bag.png';
import usersIcon from '@/assets/dashboard/glasss/ic_glass_users.png';
import buyIcon from '@/assets/dashboard/glasss/ic_glass_buy.png';
import messageIcon from '@/assets/dashboard/glasss/ic_glass_message.png';

const Dashboard = () => {

  const [userCount,setUserCount]=useState(0);
  const [AdminCount,setAdminCount]=useState(0);
  const [CourseCount,setCourseCount]=useState(0);
  const [FeedbackCount,setFeedbackCount]=useState(0);

  
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await userService.getUsersCount();
        console.log(response);
        const {studentCount}=response.data;
        setUserCount(studentCount);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserCount();
    
    
  }, []);

  useEffect(() => {
    const fetchAdminCount = async () => {
      try {
        const response = await userService.getAdminsCount();
        console.log(response);
        const {adminCount}=response.data;
        setAdminCount(adminCount);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
      
    fetchAdminCount();
    
    
  }, []);

  useEffect(()=>{
    const fetchCountCoursesVisits = async () => {
      try{
        // console.log("hi1!");
        const response = await courseService.getCourseViews();
        // console.log("hi!",response);
        const {courseViews}=response.data;
        setCourseCount(courseViews);
      }
      catch(err){
        console.log("Error in fetching courses",err);
      }
    };

    fetchCountCoursesVisits();

  },[]);

  useEffect(()=>{
    const fetchCountFeedbacks = async () => {
      try{
        const response = await feedbackService.getAllFeedbacks();
        
        const {feedbackCount}=response.data;
        setFeedbackCount(feedbackCount);
      }
      catch(err){
        console.log("Error in fetching courses",err);
      }
    };

    fetchCountFeedbacks();

  },[]);


  
 

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={0} gap={3}>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Students"
            total={userCount}
            color="info"
            icon={
              <Image
                alt="New Students"
                src={usersIcon}
                width={64}
                height={64}
              />
            }
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Admins"
            total={AdminCount}
            color="info"
            icon={
              <Image
                alt="Total Admins"
                src={usersIcon}
                width={64}
                height={64}
              />
            }
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Courses Explored"
            total={CourseCount}
            color="success"
            icon={
              <Image
                alt="Weekly Sales"
                src={bagIcon}
                width={64}
                height={64}
              />
            }
          />
        </Grid>

       

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Feedbacks"
            total={FeedbackCount}
            color="error"
            icon={
              <Image
                alt="Bug Reports"
                src={messageIcon}
                width={64}
                height={64}
              />
            }
          />
        </Grid>
        
        
      </Grid>
    </Container>
  );
}

export default Dashboard;
