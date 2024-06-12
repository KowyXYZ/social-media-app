"use client"

import React from 'react'
import '@/styles/globals.css'
import Provider from '@/components/Provider'
import Navbar from '@/components/Global/Navbar'
import Footer from '@/components/Global/Footer'



const RootLayout = ( {children}) => {
  return (
    <html>
        <body>
            <Provider>
              <div>
                <Navbar/>
                  {children}
                <Footer/>
              </div>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout