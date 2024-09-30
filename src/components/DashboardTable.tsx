import React, { useState } from 'react'
import filter from '../assets/icons/filter.svg'
import { useQuery, QueryClient } from 'react-query'
import axios from 'axios'

// Sample data type
interface DataType {
  organization: string
  name: string
  email: string
  phoneNumber: string
  joinedDate: string
  status: 'Inactive' | 'Pending' | 'Active' | 'Blacklisted'
}

const statusStyles: Record<
  'Inactive' | 'Pending' | 'Active' | 'Blacklisted',
  string
> = {
  Inactive: 'bg-gray-200 text-gray-700',
  Pending: 'bg-yellow-200 text-yellow-700',
  Active: 'bg-green-200 text-green-700',
  Blacklisted: 'bg-red-200 text-red-700',
}

// Fetch data function using axios
const fetchTableData = async () => {
  const { data } = await axios.get(
    'https://run.mocky.io/v3/efccbfdc-a16b-439c-a7d7-6e01e23bc22c'
  )
  return data
}

const DashboardTable: React.FC = () => {
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null) // Track dropdown per row
  const [filterOpen, setFilterOpen] = useState<boolean>(false) // Track filter dropdown

  // Filter fields state
  const [filters, setFilters] = useState({
    organization: '',
    name: '',
    email: '',
    date: '',
    phoneNumber: '',
    status: '',
  })

  // React Query for fetching data
  const { data, isLoading, error } = useQuery<DataType[]>(
    ['tableData'],
    fetchTableData
  )

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading data</div>

  // Handle rows per page change
  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10))
    setCurrentPage(1) // Reset to first page on change
  }

  // Paginated data
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * rowsPerPage
    return data?.slice(startIndex, startIndex + rowsPerPage) || []
  }

  // Total number of pages
  const getTotalPages = () => {
    return Math.ceil((data?.length || 0) / rowsPerPage)
  }

  // Handle pagination click
  const handlePageClick = (page: number) => {
    setCurrentPage(page)
  }

  // Dropdown toggle for actions menu
  const toggleDropdown = (index: number) => {
    setDropdownIndex(dropdownIndex === index ? null : index) // Toggle open/close
  }

  // Filter toggle
  const toggleFilter = () => {
    setFilterOpen(!filterOpen) // Toggle the filter dropdown
  }

  // Handle filter field change
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFilters({ ...filters, [name]: value })
  }

  // Apply filter (placeholder logic for now)
  const applyFilter = () => {
    // Add filter logic here
    console.log('Filters applied:', filters)
  }

  // Reset filter
  const resetFilter = () => {
    setFilters({
      organization: '',
      name: '',
      email: '',
      date: '',
      phoneNumber: '',
      status: '',
    })
  }

  return (
    <div className="flex flex-col p-6 mx-auto bg-white rounded-lg shadow-lg">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="relative min-w-full border-collapse table-auto">
          <thead>
            <tr className="text-left bg-gray-50">
              <th className="p-3 text-xs font-semibold text-gray-600">
                ORGANIZATION
                <button onClick={toggleFilter} className="ml-2 text-gray-600">
                  <img src={filter} alt="Filter" className="inline w-4 h-4" />
                </button>
              </th>
              <th className="p-3 text-xs font-semibold text-gray-600">
                name
                <button onClick={toggleFilter} className="ml-2 text-gray-600">
                  <img src={filter} alt="Filter" className="inline w-4 h-4" />
                </button>
              </th>
              <th className="p-3 text-xs font-semibold text-gray-600">
                EMAIL
                <button onClick={toggleFilter} className="ml-2 text-gray-600">
                  <img src={filter} alt="Filter" className="inline w-4 h-4" />
                </button>
              </th>
              <th className="p-3 text-xs font-semibold text-gray-600">
                PHONE NUMBER
                <button onClick={toggleFilter} className="ml-2 text-gray-600">
                  <img src={filter} alt="Filter" className="inline w-4 h-4" />
                </button>
              </th>
              <th className="p-3 text-xs font-semibold text-gray-600">
                DATE JOINED
                <button onClick={toggleFilter} className="ml-2 text-gray-600">
                  <img src={filter} alt="Filter" className="inline w-4 h-4" />
                </button>
              </th>
              <th className="p-3 text-xs font-semibold text-gray-600">
                STATUS
                <button onClick={toggleFilter} className="ml-2 text-gray-600">
                  <img src={filter} alt="Filter" className="inline w-4 h-4" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {getPaginatedData().map((data, index) => (
              <tr key={index} className="bg-white border-b last:border-none">
                <td className="p-3 text-sm text-gray-700">
                  {data.organization}
                </td>
                <td className="p-3 text-sm text-gray-700">{data.name}</td>
                <td className="p-3 text-sm text-gray-700">{data.email}</td>
                <td className="p-3 text-sm text-gray-700">
                  {data.phoneNumber}
                </td>
                <td className="p-3 text-sm text-gray-700">{data.joinedDate}</td>
                <td className="p-3 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      statusStyles[data.status]
                    }`}
                  >
                    {data.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination and Rows per Page */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-600">
          Showing{' '}
          <select
            className="px-2 py-1 border border-gray-300 rounded"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>{' '}
          out of {data?.length || 0}
        </div>
        {/* Pagination */}
        <div className="flex items-center space-x-2">
          {Array.from({ length: getTotalPages() }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageClick(index + 1)}
              className={`px-3 py-1 border rounded-md ${
                currentPage === index + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-blue-500'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashboardTable
