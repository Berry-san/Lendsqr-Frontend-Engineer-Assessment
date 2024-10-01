import React, { useState, useEffect, useRef } from 'react'
import filterIcon from '../assets/icons/filter.svg'
import { useQuery } from 'react-query'
import axios from 'axios'
import Pagination from './Pagination/Pagination'
import FilterDropdown from './FilterDropdown'

// Sample data type
interface UserData {
  fullName: string
  organization: string
  status: 'inactive' | 'pending' | 'active' | 'blacklisted'
  joinedDate: string
  personalInformation: {
    phoneNumber: string
    emailAddress: string
  }
  [key: string]: any // Allows flexibility for other fields coming from the API
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
    'https://run.mocky.io/v3/17c54da7-b5c8-415d-aedf-fb5d2966a236'
  )
  return data
}

const DashboardTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [activeFilterIndex, setActiveFilterIndex] = useState<number | null>(
    null
  ) // Tracks active dropdown

  const filterRefs = useRef<(HTMLDivElement | null)[]>([])

  // React Query for fetching data
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
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [activeFilterIndex])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading data</div>

  // Paginated data
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * pageSize
    return data?.slice(startIndex, startIndex + pageSize) || []
  }

  // Handle rows per page change
  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(parseInt(e.target.value, 10))
    setCurrentPage(1) // Reset to first page on change
  }

  // Handle pagination click
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Store full user data in localStorage and navigate
  const handleUserClick = (user: UserData) => {
    localStorage.setItem('selectedUser', JSON.stringify(user)) // Store the full user data
    window.location.href = '/user-details' // Navigate to user details page
  }

  const applyFilter = (filters: any) => {
    console.log('Applied filters:', filters)
    // Implement filter logic here
  }

  const resetFilter = () => {
    console.log('Filters reset')
    // Implement reset logic here
  }

  const handleFilterClick = (index: number) => {
    // Toggle logic: Close if the same filter is clicked, open if a different one is clicked
    setActiveFilterIndex((prevIndex) => (prevIndex === index ? null : index))
  }

  const columns = [
    { name: 'ORGANIZATION', accessor: 'organization' },
    { name: 'USERNAME', accessor: 'fullName' },
    { name: 'EMAIL', accessor: 'emailAddress' },
    { name: 'PHONE NUMBER', accessor: 'phoneNumber' },
    { name: 'DATE JOINED', accessor: 'joinedDate' },
    { name: 'STATUS', accessor: 'status' },
  ]

  return (
    <div className="relative flex flex-col p-6 mx-auto bg-white rounded-lg shadow-lg text-[#545F7D]">
      <div className="overflow-x-auto">
        <table className="relative min-w-full border-collapse table-auto">
          <thead>
            <tr className="text-left">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="items-center p-3 text-xs font-semibold text-gray-600"
                >
                  <div className="relative flex items-center">
                    <span>{column.name}</span>
                    <button
                      className="mx-2"
                      onClick={() => handleFilterClick(index)}
                    >
                      <img src={filterIcon} alt="filter" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {getPaginatedData().map((user, index) => (
              <tr
                key={index}
                className="bg-white border-b cursor-pointer last:border-none"
                onClick={() => handleUserClick(user)} // Store full user object and navigate
              >
                <td className="p-3 text-sm text-gray-700">
                  {user.organization}
                </td>
                <td className="p-3 text-sm text-gray-700">{user.fullName}</td>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Filter Dropdown */}
      {activeFilterIndex !== null && (
        <div
          ref={(el) => (filterRefs.current[activeFilterIndex] = el)}
          className="absolute top-0 left-0 z-50 mt-16 ml-4" // Position outside table and adjust position
        >
          <FilterDropdown applyFilter={applyFilter} resetFilter={resetFilter} />
        </div>
      )}

      {/* Pagination and Rows per Page */}
      <div className="flex items-center justify-between mt-4">
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
          out of {data?.length || 0}
        </div>
        <Pagination
          onPageChange={handlePageChange}
          totalCount={data?.length || 0}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      </div>
    </div>
  )
}

export default DashboardTable
