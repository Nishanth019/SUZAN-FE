'use client'

import React, {useState} from 'react'
import MainSection from "@/components/Homepage/MainSection/MainSection.jsx"
import TrustedSection from '@/components/Homepage/TrustedSection/TrustedSection'
import CoreTeamSection from '@/components/Homepage/CoreTeamSection/CoreTeamSection'
import Services from '@/components/Homepage/Services/Services'
import CoursesSection from '@/components/Homepage/CoursesSection/CoursesSection'
import NearbyPlaces from '@/components/Homepage/NearbyPlaces/NearbyPlaces'
import FaqSection from '@/components/Homepage/FaqSection/FaqSection'
import ContactSection from '@/components/Homepage/ContactSection/ContactSection'

const Home = () => {
  const [user,setUser] = useState(null);
  return (
    <div className="bg-[#FFFFFF]">
      <MainSection/>
      <Services/>
      <TrustedSection/>
      <CoursesSection/>
      <NearbyPlaces/>
      <CoreTeamSection/>
      <FaqSection/>
      <ContactSection/>
    </div>
  )
}

export default Home
