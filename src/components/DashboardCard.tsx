import React from 'react'

interface DashboardCardProps {
  title: string
  value: string | number
  icon?: string
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon,
}) => {
  // Function to format the value if it's a number
  const formatValue = (value: string | number) => {
    if (typeof value === 'number') {
      return new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 2,
      }).format(value)
    }
    return value // If it's a string, just return it as is
  }

  return (
    <div className="py-5 pl-8 text-left bg-white rounded-lg shadow-md">
      {icon && <img src={icon} alt={title} className="w-10 h-10 mb-4" />}
      <h3 className="mb-2 text-sm font-medium text-gray-500 uppercase">
        {title}
      </h3>
      <p className="text-2xl font-semibold text-[#213F7D]">
        {formatValue(value)}
      </p>
    </div>
  )
}

export default DashboardCard
