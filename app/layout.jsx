"use client"

import React from 'react'
import '@/styles/globals.css'
import Provider from '@/components/Provider'



const RootLayout = ( {children}) => {
  return (
    <html>
        <body>
            <Provider>
              <div>
                  {children}
              </div>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout