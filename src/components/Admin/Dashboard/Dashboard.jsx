import React from 'react';
import CardDataStats from "./CardDataStats";
import { AiOutlineEye } from 'react-icons/ai';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import AppWidgetSummary from './app-widget-summary';
import Image from 'next/image';


// Import images
import bagIcon from '@/assets/dashboard/glasss/ic_glass_bag.png';
import usersIcon from '@/assets/dashboard/glasss/ic_glass_users.png';
import buyIcon from '@/assets/dashboard/glasss/ic_glass_buy.png';
import messageIcon from '@/assets/dashboard/glasss/ic_glass_message.png';

const Dashboard = () => {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Users"
            total={1352831}
            color="info"
            icon={
              <Image
                alt="New Users"
                src={usersIcon}
                width={64}
                height={64}
              />
            }
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Weekly Sales"
            total={714000}
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
            title="Item Orders"
            total={1723315}
            color="warning"
            icon={
              <Image
                alt="Item Orders"
                src={buyIcon}
                width={64}
                height={64}
              />
            }
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Bug Reports"
            total={234}
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
