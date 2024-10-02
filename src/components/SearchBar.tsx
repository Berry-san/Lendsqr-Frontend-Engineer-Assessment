import React, { useState } from 'react'
import searchIcon from '../assets/icons/search.svg'

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleSearch = () => {
    console.log('Searching for:', searchTerm)
    // Implement your search logic here
  }

  return (
    <div className="flex items-center overflow-hidden border rounded-lg w-96">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 text-gray-600 border-none outline-none"
        placeholder="Search for anything"
      />
      <button
        onClick={handleSearch}
        className="flex items-center justify-center p-4 bg-[#39CDCC]"
      >
        <img src={searchIcon} alt="Search" className="w-5 h-5" />
      </button>
    </div>
  )
}

export default SearchBar
