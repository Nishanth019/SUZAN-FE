'use client'

import React, {useState} from 'react'
import MainSection from "@/components/Homepage/MainSection/MainSection.jsx"
import TrustedSection from '@/components/Homepage/TrustedSection/TrustedSection'
import Services from '@/components/Services/Services'
import CoreTeamSection from '@/components/Homepage/CoreTeamSection/CoreTeamSection'

const Home = () => {
  const [user,setUser] = useState(null);
  return (
    <div className="bg-[#FFFFFF]">
      <MainSection/>
      <Services/>
      <TrustedSection/>
      <CoreTeamSection/>
    </div>
  )
}

export default Home
