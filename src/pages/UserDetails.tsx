import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import star from '../assets/icons/star.svg'
import inactiveStar from '../assets/icons/inactive-star.svg'
import avatar from '../assets/icons/avatar.svg'
import backButton from '../assets/icons/backButton.svg'

// Define the valid tab names as a type
type TabName =
  | 'General Details'
  | 'Documents'
  | 'Bank Details'
  | 'Loans'
  | 'Savings'
  | 'App and System'

// Format currency function
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(value)
}

const UserDetails: React.FC = () => {
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState<TabName>('General Details')
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    // Retrieve the stored user data from localStorage
    const storedUser = localStorage.getItem('selectedUser')
    if (storedUser) {
      setUserData(JSON.parse(storedUser))
    } else {
      console.error('No user data found in localStorage')
    }
  }, [])

  if (!userData) {
    return <div>Loading user details...</div>
  }

  const renderStars = (userTier: number) => {
    const stars = []
    for (let i = 1; i <= 3; i++) {
      stars.push(
        <img
          key={i}
          src={i <= userTier ? star : inactiveStar}
          alt={i <= userTier ? 'Active Star' : 'Inactive Star'}
          className="w-4 h-4"
        />
      )
    }
    return stars
  }

  const tabContent: Record<TabName, JSX.Element | null> = {
    'General Details': userData ? (
      <div className="space-y-6 divide-y-2">
        {/* Personal Information section */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">Personal Information</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">
            <div>
              <p className="text-sm">Full Name</p>
              <p className="font-medium">{userData.fullName}</p>
            </div>
            <div>
              <p className="text-sm">Phone Number</p>
              <p className="font-medium">
                {userData.personalInformation.phoneNumber}
              </p>
            </div>
            <div>
              <p className="text-sm">Email Address</p>
              <p className="font-medium break-words">
                {userData.personalInformation.emailAddress}
              </p>
            </div>
            <div>
              <p className="text-sm">BVN</p>
              <p className="font-medium">{userData.personalInformation.bvn}</p>
            </div>
            <div>
              <p className="text-sm">Gender</p>
              <p className="font-medium">
                {userData.personalInformation.gender}
              </p>
            </div>
            <div>
              <p className="text-sm">Marital Status</p>
              <p className="font-medium">
                {userData.personalInformation.maritalStatus}
              </p>
            </div>
            <div>
              <p className="text-sm">Children</p>
              <p className="font-medium">
                {userData.personalInformation.children}
              </p>
            </div>
            <div>
              <p className="text-sm">Type of Residence</p>
              <p className="font-medium">
                {userData.personalInformation.typeOfResidence}
              </p>
            </div>
          </div>
        </div>

        {/* Education and Employment section */}
        <div className="py-6">
          <h3 className="mb-4 text-lg font-semibold">
            Education and Employment
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm">Level of Education</p>
              <p className="font-medium">
                {userData.educationAndEmployment.levelOfEducation}
              </p>
            </div>
            <div>
              <p className="text-sm">Employment Status</p>
              <p className="font-medium">
                {userData.educationAndEmployment.employmentStatus}
              </p>
            </div>
            <div>
              <p className="text-sm">Sector of Employment</p>
              <p className="font-medium">
                {userData.educationAndEmployment.sectorOfEmployment}
              </p>
            </div>
            <div>
              <p className="text-sm">Duration of Employment</p>
              <p className="font-medium">
                {userData.educationAndEmployment.durationOfEmployment}
              </p>
            </div>
            <div>
              <p className="text-sm">Office Email</p>
              <p className="font-medium">
                {userData.educationAndEmployment.officeEmail}
              </p>
            </div>
            <div>
              <p className="text-sm">Monthly Income</p>
              <p className="font-medium">
                {formatCurrency(
                  userData.educationAndEmployment.monthlyIncome.minimum
                )}{' '}
                -{' '}
                {formatCurrency(
                  userData.educationAndEmployment.monthlyIncome.maximum
                )}
              </p>
            </div>
            <div>
              <p className="text-sm">Loan Repayment</p>
              <p className="font-medium">
                {formatCurrency(userData.educationAndEmployment.loanRepayment)}
              </p>
            </div>
          </div>
        </div>

        {/* Socials section */}
        <div className="py-6">
          <h3 className="mb-4 text-lg font-semibold">Socials</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5">
            <div>
              <p className="text-sm">Twitter</p>
              <p className="font-medium">{userData.socials.twitter}</p>
            </div>
            <div>
              <p className="text-sm">Facebook</p>
              <p className="font-medium">{userData.socials.facebook}</p>
            </div>
            <div>
              <p className="text-sm">Instagram</p>
              <p className="font-medium">{userData.socials.instagram}</p>
            </div>
          </div>
        </div>

        {/* Guarantor section */}
        <div className="py-6">
          <h3 className="mb-4 text-lg font-semibold">Guarantor</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
            <div>
              <p className="text-sm">Full Name</p>
              <p className="font-medium">{userData.guarantor.fullName}</p>
            </div>
            <div>
              <p className="text-sm">Phone Number</p>
              <p className="font-medium">{userData.guarantor.phoneNumber}</p>
            </div>
            <div>
              <p className="text-sm">Email Address</p>
              <p className="font-medium break-words">
                {userData.guarantor.emailAddress}
              </p>
            </div>
            <div>
              <p className="text-sm">Relationship</p>
              <p className="font-medium">{userData.guarantor.relationship}</p>
            </div>
          </div>
        </div>
      </div>
    ) : null,
    Documents: null,
    'Bank Details': null,
    Loans: null,
    Savings: null,
    'App and System': null,
  }

  return (
    <div className="px-4 py-8 mx-auto max-w-7xl text-[#213F7D]">
      {/* Header section */}
      <div className="flex flex-col items-start mb-6 md:items-center md:justify-between md:flex-row">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center mb-4 md:mb-0"
        >
          <img src={backButton} alt="" className="mr-3" />
          Back to Users
        </button>
        <div className="space-x-4">
          <button className="px-4 py-2 text-sm font-semibold uppercase text-[#E4033B] border border-[#E4033B] rounded-md">
            Blacklist User
          </button>
          <button className="px-4 py-2 text-sm font-semibold uppercase text-[#39CDCC] border border-[#39CDCC] rounded-md">
            Activate User
          </button>
        </div>
      </div>

      <h2 className="my-5 text-2xl font-medium">User Details</h2>

      {/* User Info section */}
      <div className="px-8 bg-white rounded-sm shadow-lg">
        <div className="flex flex-col items-center justify-center py-10 md:flex-row md:justify-start">
          {/* Avatar */}
          <div className="w-20 h-20 mr-4 bg-gray-200 rounded-full">
            <img src={avatar} alt="Avatar" className="rounded-full" />
          </div>
          <div className="flex flex-col items-center justify-center text-center md:text-left md:flex-row">
            {/* User Info */}
            <div className="flex flex-col py-2 pr-5">
              <h2 className="text-2xl font-medium">{userData.fullName}</h2>
              <p className="text-sm">{userData.userId}</p>
            </div>
            {/* User's Tier */}
            <div className="flex flex-col px-5 py-2 md:border-x">
              <p className="mr-2 text-sm">User's Tier:</p>
              <div className="flex space-x-1">
                {renderStars(userData.userTier)}
              </div>
            </div>
            {/* Account Info */}
            <div className="flex flex-col pl-5">
              <p className="text-2xl font-semibold">
                {formatCurrency(userData.accountBalance)}
              </p>
              <p className="text-sm">
                {userData.accountNumber} / {userData.bankName}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation section */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {Object.keys(tabContent).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as TabName)}
                className={`${
                  activeTab === tab
                    ? 'text-[#39CDCC] border-b-2 border-[#39CDCC]'
                    : 'hover:text-[#39CDCC]'
                } pb-2`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab content section */}
      <div className="p-6 bg-white rounded-lg shadow-lg">
        {tabContent[activeTab]}
      </div>
    </div>
  )
}

export default UserDetails
