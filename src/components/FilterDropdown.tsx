import React, { useState } from 'react'

interface FilterDropdownProps {
  applyFilter: (filters: any) => void
  resetFilter: () => void
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  applyFilter,
  resetFilter,
}) => {
  const [filters, setFilters] = useState({
    organization: '',
    username: '',
    email: '',
    date: '',
    phoneNumber: '',
    status: '',
  })

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFilters({ ...filters, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    applyFilter(filters)
  }

  return (
    <div className="absolute z-20 p-6 bg-white rounded-lg shadow-lg w-80">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm">Organization</label>
          <select
            name="organization"
            value={filters.organization}
            onChange={handleFilterChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded"
          >
            <option value="">Select</option>
            <option value="Lendsqr">Lendsqr</option>
            <option value="Kuda">Kuda</option>
            {/* Add other options here */}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm">Username</label>
          <input
            type="text"
            name="username"
            value={filters.username}
            onChange={handleFilterChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded"
            placeholder="User"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Email</label>
          <input
            type="email"
            name="email"
            value={filters.email}
            onChange={handleFilterChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded"
            placeholder="Email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Date</label>
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={filters.phoneNumber}
            onChange={handleFilterChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded"
            placeholder="Phone Number"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Status</label>
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded"
          >
            <option value="">Select</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="blacklisted">Blacklisted</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={resetFilter}
            className="px-4 py-2 text-sm text-gray-500 border border-gray-300 rounded"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm text-white bg-blue-500 rounded"
          >
            Filter
          </button>
        </div>
      </form>
    </div>
  )
}

export default FilterDropdown
