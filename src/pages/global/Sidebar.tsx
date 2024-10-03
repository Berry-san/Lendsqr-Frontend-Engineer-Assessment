import React, { useRef, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  sidebarLinks,
  SidebarLink,
  SidebarSection,
} from '../../lib/constants/navigation'
import briefcase from '../../assets/icons/briefcase.svg'
import home from '../../assets/icons/home.svg'
import lendsqrLogo from '../../assets/icons/lendsqrLogo.svg'
import dropdown from '../../assets/icons/chevron-down.svg'

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const trigger = useRef<HTMLButtonElement>(null)
  const sidebar = useRef<HTMLElement>(null)

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded')
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  )
  const [overlayActive, setOverlayActive] = useState<boolean>(false)

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return
      if (
        !sidebarOpen ||
        sidebar.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return
      setSidebarOpen(false)
    }

    const resizeHandler = () => {
      if (window.innerWidth >= 1279) {
        setSidebarOpen(false)
        setOverlayActive(false)
      }
    }

    document.addEventListener('click', clickHandler)
    window.addEventListener('resize', resizeHandler)

    return () => {
      document.removeEventListener('click', clickHandler)
      window.removeEventListener('resize', resizeHandler)
    }
  }, [sidebarOpen, setSidebarOpen])

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return
      setSidebarOpen(false)
    }

    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  }, [sidebarOpen, setSidebarOpen])

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString())
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded')
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded')
    }
    setOverlayActive(sidebarOpen)
  }, [sidebarExpanded, sidebarOpen])

  console.log(sidebarOpen)

  return (
    <div className="relative scrollbar">
      {overlayActive && window.innerWidth <= 1024 && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black opacity-40"
        ></div>
      )}
      <aside
        ref={sidebar}
        className={`fixed left-0 top-0 inset-0 z-40 bg-white scrollbar-none flex h-screen w-[20rem] flex-col overflow-y-auto text-[#213F7D] bg-green duration-300 pt-4 lg:pt-24 pb-8 ease-linear lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* SIDEBAR HEADER */}
        <div className="flex flex-col">
          <div className="block px-10 py-8 lg:hidden">
            <img src={lendsqrLogo} className="h-8" alt="" />
          </div>
          <div className="flex items-center gap-5 px-8 py-2 mb-6 text-base font-normal">
            <img src={briefcase} className="w-5 h-5" alt="Home" />
            <span>Switch Organization</span>
            <div className="">
              <img src={dropdown} className="w-3" alt="" />
            </div>
          </div>
          <div className="flex items-center gap-5 px-8 py-2 mb-6 text-base font-normal opacity-70">
            <img src={home} className="w-6 h-6" alt="Home" />
            Dashboard
          </div>
        </div>
        {/* SIDEBAR MENU */}
        <div className="flex flex-col flex-1 duration-300 ease-linear">
          <nav className="">
            {sidebarLinks.map((section: SidebarSection, sectionIndex) => (
              <div key={sectionIndex}>
                <h3 className="px-10 my-2 text-xs font-medium text-gray-500 uppercase">
                  {section.title}
                </h3>
                <ul className="flex flex-col gap-2">
                  {section.links.map((link: SidebarLink, linkIndex) => (
                    <SidebarLinks
                      key={linkIndex}
                      link={link}
                      onClick={() => setSidebarOpen(false)}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </div>
  )
}

interface SidebarLinksProps {
  link: SidebarLink
  onClick: () => void
}

const SidebarLinks: React.FC<SidebarLinksProps> = ({ link, onClick }) => {
  return (
    <li>
      <NavLink
        onClick={onClick}
        to={link.route}
        className={({ isActive }) =>
          isActive
            ? 'group relative flex items-center gap-5 text-base font-normal rounded-sm duration-300 ease-in-out bg-[#39CDCC]/10 border-l-4 border-[#39CDCC] px-8 py-2'
            : 'group relative flex items-center gap-5 text-base font-normal rounded-sm duration-300 ease-in-out hover:bg-[#39CDCC]/10 hover:border-l-4 hover:border-[#39CDCC] px-10 py-2 opacity-70'
        }
      >
        {({ isActive }) => (
          <>
            <img
              src={isActive ? link.icon : link.icon}
              className="w-6 h-6"
              alt={link.name}
            />
            {link.name}
          </>
        )}
      </NavLink>
    </li>
  )
}

export default Sidebar
