import React from 'react'
import Navbar from './_components/Navbar'

export default function ProtectedLayout({ 
    children 
}: {
    children: React.ReactNode
}) {
  return (
    <div className="p-10 flex w-full min-h-screen flex-col gap-y-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
        <Navbar />
        
        {children}
    </div>
  )
}
