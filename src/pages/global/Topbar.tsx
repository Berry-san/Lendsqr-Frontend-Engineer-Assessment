// import hamburger from '../assets/hamburger.svg'
import lendsqrLogo from '../../assets/icons/lendsqrLogo.svg'
import hamburger from '../../assets/icons/hamburger.svg'
import dropdown from '../../assets/icons/dropdown.svg'
import bell from '../../assets/icons/bell.png'
import avatar from '../../assets/images/avatar.png'
import SearchBar from '../../components/SearchBar'

interface TopbarProps {
  sidebarOpen: boolean
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Topbar: React.FC<TopbarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="fixed top-0 z-40 flex w-full bg-white border-b">
      <div className="flex items-center justify-between flex-grow px-3 py-6 lg:py-4 shadow-2 2xl:px-11">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <div className="items-center hidden lg:flex">
            <img src={lendsqrLogo} className="h-8" alt="" />
          </div>
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation()
              setSidebarOpen(!sidebarOpen)
            }}
            className="z-40 block px-4 lg:hidden"
          >
            <img src={hamburger} className="w-8 h-8" alt="" />
          </button>
        </div>
        <div className="hidden lg:block">
          <SearchBar />
        </div>
        <div className="items-center hidden space-x-8 lg:flex">
          <div className="">
            <p className="underline text-[#213F7D] font-normal text-base">
              Docs
            </p>
          </div>
          <div className="">
            <img src={bell} alt="" />
          </div>
          <button className="flex items-center">
            <img src={avatar} className="w-10 mr-4" alt="" />
            <p className="text-[#213F7D] font-medium text-base">Adedeji</p>
            <img src={dropdown} alt="" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Topbar
