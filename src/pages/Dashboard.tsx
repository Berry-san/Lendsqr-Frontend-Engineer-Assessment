import users from '../assets/icons/users.svg'
import activeUsers from '../assets/icons/activeUsers.svg'
import userLoans from '../assets/icons/userLoans.svg'
import userSavings from '../assets/icons/userSavings.svg'
import DashboardCard from '../components/DashboardCard'
import DashboardTable from '../components/DashboardTable'

const cardDetails = [
  {
    title: 'Users',
    value: 2453,
    icon: users,
  },
  {
    title: 'Active Users',
    value: 2453,
    icon: activeUsers,
  },
  {
    title: 'Users with Loans',
    value: 12453,
    icon: userLoans,
  },
  {
    title: 'Users with Savings',
    value: 102453,
    icon: userSavings,
  },
]

const Dashboard = () => {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {cardDetails.map((item, index) => (
          <DashboardCard
            title={item.title}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </div>
      <div className="">
        <DashboardTable />
      </div>
    </div>
  )
}

export default Dashboard
