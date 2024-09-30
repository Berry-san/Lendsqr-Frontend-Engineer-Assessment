// src/Autocomplete.tsx
import React, { useState, ChangeEvent, useRef } from 'react'

interface Item {
  id: number
  name: string
  category: string
}

interface AutocompleteProps {
  data: Item[]
}

const Autocomplete: React.FC<AutocompleteProps> = ({ data }) => {
  const [query, setQuery] = useState<string>('')
  const [suggestions, setSuggestions] = useState<Item[]>([])
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false)
  const debounceTimeout = useRef<number | undefined>(undefined)

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }

    debounceTimeout.current = window.setTimeout(() => {
      if (value.trim() === '') {
        setSuggestions([])
        setShowSuggestions(false)
        return
      }

      const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(value.trim().toLowerCase())
      )

      setSuggestions(filteredData)
      setShowSuggestions(true)
    }, 300) // Debounce delay in milliseconds
  }

  const onSuggestionClick = (item: Item) => {
    setQuery(item.name)
    setSuggestions([])
    setShowSuggestions(false)
    // Optionally, handle additional selection logic here
  }

  return (
    <div className="relative w-64">
      <input
        type="text"
        value={query}
        onChange={onInputChange}
        placeholder="Search..."
        className="w-full p-2 border border-gray-300 rounded"
      />
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 overflow-y-auto bg-white border border-gray-300 rounded max-h-60">
          {suggestions.map((item) => {
            const searchTerm = item.name.toLowerCase()
            const index = item.name.toLowerCase().indexOf(query.toLowerCase())
            const beforeMatch = item.name.slice(0, index)
            const matchText = item.name.slice(index, index + query.length)
            const afterMatch = item.name.slice(index + query.length)

            return (
              <div
                key={item.id}
                onClick={() => onSuggestionClick(item)}
                className="p-2 cursor-pointer hover:bg-gray-100"
              >
                {searchTerm}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Autocomplete
