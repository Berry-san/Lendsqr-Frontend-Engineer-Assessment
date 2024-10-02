import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import filterIcon from '../assets/icons/filter.svg'
import ellipsis from '../assets/icons/ellipsis.svg'
import viewDetailsIcon from '../assets/icons/view.svg'
import blacklistIcon from '../assets/icons/blacklist.svg'
import activateIcon from '../assets/icons/activate.svg'
import { useQuery } from 'react-query'
import axios from 'axios'
import Pagination from './Pagination/Pagination'
import FilterDropdown from './FilterDropdown'

interface UserData {
  fullName: string
  organization: string
  status: 'inactive' | 'pending' | 'active' | 'blacklisted'
  joinedDate: string
  personalInformation: {
    phoneNumber: string
    emailAddress: string
  }
  [key: string]: any
}

const statusStyles: Record<
  'inactive' | 'pending' | 'active' | 'blacklisted',
  string
> = {
  inactive: 'bg-gray-200 text-gray-700',
  pending: 'bg-yellow-200 text-yellow-700',
  active: 'bg-green-200 text-green-700',
  blacklisted: 'bg-red-200 text-red-700',
}

// Fetch data function using axios
const fetchTableData = async (): Promise<UserData[]> => {
  const { data } = await axios.get(
    'https://run.mocky.io/v3/3ed5e053-cf6b-4d54-9219-41f027915f92'
  )
  return data
}

const DashboardTable: React.FC = () => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [activeFilterIndex, setActiveFilterIndex] = useState<number | null>(
    null
  )
  const [activeEllipsisIndex, setActiveEllipsisIndex] = useState<number | null>(
    null
  )
  const [filteredData, setFilteredData] = useState<UserData[] | null>(null) // New state for filtered data

  const filterRefs = useRef<(HTMLDivElement | null)[]>([])
  const ellipsisRefs = useRef<(HTMLDivElement | null)[]>([])

  const { data, isLoading, error } = useQuery<UserData[]>(
    'tableData',
    fetchTableData
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        activeFilterIndex !== null &&
        filterRefs.current[activeFilterIndex] &&
        !filterRefs.current[activeFilterIndex]?.contains(event.target as Node)
      ) {
        setActiveFilterIndex(null)
      }
      if (
        activeEllipsisIndex !== null &&
        ellipsisRefs.current[activeEllipsisIndex] &&
        !ellipsisRefs.current[activeEllipsisIndex]?.contains(
          event.target as Node
        )
      ) {
        setActiveEllipsisIndex(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [activeFilterIndex, activeEllipsisIndex])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading data</div>

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(parseInt(e.target.value, 10))
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleUserClick = (user: UserData) => {
    console.log('User clicked:', user)
    localStorage.setItem('selectedUser', JSON.stringify(user))
    navigate('/user-details') // Change this to your actual route
  }

  const applyFilter = (filters: any) => {
    // Filter logic: filter the data based on selected filters
    const filtered =
      data?.filter((user) => {
        return (
          (filters.organization === '' ||
            user.organization === filters.organization) &&
          (filters.username === '' ||
            user.fullName
              .toLowerCase()
              .includes(filters.username.toLowerCase())) &&
          (filters.email === '' ||
            user.personalInformation.emailAddress
              .toLowerCase()
              .includes(filters.email.toLowerCase())) &&
          (filters.date === '' || user.joinedDate === filters.date) &&
          (filters.phoneNumber === '' ||
            user.personalInformation.phoneNumber.includes(
              filters.phoneNumber
            )) &&
          (filters.status === '' || user.status === filters.status)
        )
      }) || []

    setFilteredData(filtered) // Update the filtered data
    setActiveFilterIndex(null)
  }

  const resetFilter = () => {
    setFilteredData(null) // Reset the filtered data to show all data
    setActiveFilterIndex(null)
  }

  const handleFilterClick = (index: number) => {
    setActiveEllipsisIndex(null) // Close ellipsis dropdown if open
    setActiveFilterIndex((prevIndex) => (prevIndex === index ? null : index))
  }

  const handleEllipsisClick = (index: number) => {
    setActiveFilterIndex(null) // Close filter dropdown if open
    setActiveEllipsisIndex((prevIndex) => (prevIndex === index ? null : index))
  }

  // Use filtered data if available, otherwise use full data
  const displayData = filteredData || data

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * pageSize
    return displayData?.slice(startIndex, startIndex + pageSize) || []
  }

  return (
    <div className="relative flex flex-col p-6 mx-auto bg-white rounded-lg shadow-lg text-[#545F7D]">
      <div className="overflow-x-auto">
        <table className="relative min-w-full border-collapse table-auto">
          <thead>
            <tr className="text-left">
              {[
                'ORGANIZATION',
                'USERNAME',
                'EMAIL',
                'PHONE NUMBER',
                'DATE JOINED',
                'STATUS',
              ].map((column, index) => (
                <th
                  key={index}
                  className="items-center p-3 text-xs font-semibold text-gray-600"
                >
                  <div className="relative flex items-center">
                    <span>{column}</span>
                    <button
                      className="mx-2"
                      onClick={() => handleFilterClick(index)}
                    >
                      <img src={filterIcon} alt="filter" />
                    </button>
                  </div>
                </th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {getPaginatedData().map((user, index) => (
              <tr
                key={index}
                className="bg-white border-b cursor-pointer last:border-none"
              >
                <td className="p-3 text-sm text-gray-700">
                  {user.organization}
                </td>
                <td
                  className="p-3 text-sm text-gray-700 hover:underline"
                  onClick={() => handleUserClick(user)}
                >
                  {user.fullName}
                </td>
                <td className="p-3 text-sm text-gray-700">
                  {user.personalInformation.emailAddress}
                </td>
                <td className="p-3 text-sm text-gray-700">
                  {user.personalInformation.phoneNumber}
                </td>
                <td className="p-3 text-sm text-gray-700">{user.joinedDate}</td>
                <td className="p-3 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                      statusStyles[user.status]
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="relative">
                  <button
                    onClick={() => handleEllipsisClick(index)}
                    className="flex flex-col items-center justify-center font-bold"
                  >
                    <img
                      src={ellipsis}
                      alt="ellipsis"
                      className="w-20 lg:w-5"
                    />
                  </button>

                  {activeEllipsisIndex === index && (
                    <div
                      ref={(el) => (ellipsisRefs.current[index] = el)}
                      className="absolute right-0 z-50 w-48 p-4 mt-2 mr-4 bg-white rounded-lg shadow-lg"
                    >
                      <ul>
                        <li className="flex items-center px-2 py-2 rounded cursor-pointer hover:bg-gray-100">
                          <img
                            src={viewDetailsIcon}
                            alt="View Details"
                            className="w-5 mr-2"
                          />
                          <span>View Details</span>
                        </li>
                        <li className="flex items-center px-2 py-2 rounded cursor-pointer hover:bg-gray-100">
                          <img
                            src={blacklistIcon}
                            alt="Blacklist User"
                            className="w-5 mr-2"
                          />
                          <span>Blacklist User</span>
                        </li>
                        <li className="flex items-center px-2 py-2 rounded cursor-pointer hover:bg-gray-100">
                          <img
                            src={activateIcon}
                            alt="Activate User"
                            className="w-5 mr-2"
                          />
                          <span>Activate User</span>
                        </li>
                      </ul>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Filter Dropdown */}
      {activeFilterIndex !== null && (
        <div
          ref={(el) => (filterRefs.current[activeFilterIndex] = el)}
          className="absolute top-0 left-0 z-50 ml-4"
          style={{ transform: 'translateY(100%)' }}
        >
          <FilterDropdown applyFilter={applyFilter} resetFilter={resetFilter} />
        </div>
      )}

      {/* Pagination and Rows per Page */}
      <div className="flex flex-col items-center mt-4 md:flex-row md:mt-0 md:justify-between">
        <div className="text-sm text-gray-600">
          Showing{' '}
          <select
            className="px-2 py-1 border border-gray-300 rounded"
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>{' '}
          out of {displayData?.length || 0}
        </div>
        <Pagination
          onPageChange={handlePageChange}
          totalCount={displayData?.length || 0}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      </div>
    </div>
  )
}

export default DashboardTable
