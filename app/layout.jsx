"use client"

import React from 'react'
import '@/styles/globals.css'



const RootLayout = ( {children}) => {
  return (
    <html>
        <body>
            <div>
                {children}
            </div>
        </body>
    </html>
  )
}

export default RootLayout