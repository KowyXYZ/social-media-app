import Footer from '@/components/Global/Footer'
import Navbar from '@/components/Global/Navbar'
import Home from '@/components/Home'
import React from 'react'

export const metadata = {
    title: "KowyHub",
    description: 'Kowyhub | SocialMedia App',
    icons: {
      icon: ['/favicon.ico']
      }
  }
  

const HomePage = () => {
  return (
    <div>
        <Navbar/>
        <Home/>
        <Footer/>
    </div>
  )
}

export default HomePage