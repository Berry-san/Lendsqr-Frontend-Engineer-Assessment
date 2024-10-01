import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

const Layout: React.FC = () => {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  return (
    <div className="flex h-screen overflow-hidden bg-[#FBFBFB]">
      <Topbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex w-full">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 h-screen overflow-x-hidden overflow-y-auto bg-primary">
          <div className="px-4 pt-24 pb-24 mx-auto max-w-screen-2xl shadow-2 md:px-6 2xl:px-11 lg:pt-20">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout
