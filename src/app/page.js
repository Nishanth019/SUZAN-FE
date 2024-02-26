'use client'

import React, {useState} from 'react'
import MainSection from "@/components/Homepage/MainSection/MainSection.jsx"
import TrustedSection from '@/components/Homepage/TrustedSection/TrustedSection'
<<<<<<< HEAD
import Services from '@/components/Services/Services'
import CoreTeamSection from '@/components/Homepage/CoreTeamSection/CoreTeamSection'
=======
import Services from '@/components/Homepage/Services/Services'
import CoursesSection from '@/components/Homepage/CoursesSection/CoursesSection'
>>>>>>> bf3f33d26146c80b87939b7174f63a2a01d740b7

const Home = () => {
  const [user,setUser] = useState(null);
  return (
    <div className="bg-[#FFFFFF]">
      <MainSection/>
      <Services/>
      <TrustedSection/>
<<<<<<< HEAD
      <CoreTeamSection/>
=======
      <CoursesSection/>
>>>>>>> bf3f33d26146c80b87939b7174f63a2a01d740b7
    </div>
  )
}

export default Home
