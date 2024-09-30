import briefcase from '../../assets/icons/briefcase.svg'
import home from '../../assets/icons/home.svg'
import guarantor from '../../assets/icons/guarantor.svg'
import decisionModel from '../../assets/icons/decisionModel.svg'
import fees from '../../assets/icons/fees.svg'
import karma from '../../assets/icons/karma.svg'
import loan from '../../assets/icons/loan.svg'
import loanRequest from '../../assets/icons/loanRequest.svg'
import preferences from '../../assets/icons/preferences.svg'
import pricing from '../../assets/icons/pricing.svg'
import report from '../../assets/icons/report.svg'
import savings from '../../assets/icons/savings.svg'
import serviceAccount from '../../assets/icons/serviceAccount.svg'
import services from '../../assets/icons/services.svg'
import settlement from '../../assets/icons/settlement.svg'
import transactions from '../../assets/icons/transactions.svg'
import whitelist from '../../assets/icons/whitelist.svg'

export interface SidebarLink {
  name: string
  icon: string
  route: string
}

export interface SidebarSection {
  title: string
  links: SidebarLink[]
}

export const sidebarLinks: SidebarSection[] = [
  {
    title: 'Customers',
    links: [
      { name: 'Users', icon: '/path/to/users-icon.svg', route: '/users' },
      {
        name: 'Guarantors',
        icon: guarantor,
        route: '/guarantors',
      },
      { name: 'Loans', icon: loan, route: '/loans' },
      {
        name: 'Decision Models',
        icon: decisionModel,
        route: '/decision-models',
      },
      { name: 'Savings', icon: savings, route: '/savings' },
      {
        name: 'Loan Requests',
        icon: loanRequest,
        route: '/loan-requests',
      },
      {
        name: 'Whitelist',
        icon: whitelist,
        route: '/whitelist',
      },
      { name: 'Karma', icon: karma, route: '/karma' },
    ],
  },
  {
    title: 'Businesses',
    links: [
      {
        name: 'Organization',
        icon: '/path/to/organization-icon.svg',
        route: '/organization',
      },
      {
        name: 'Loan Products',
        icon: '/path/to/loan-products-icon.svg',
        route: '/loan-products',
      },
      {
        name: 'Savings Products',
        icon: '/path/to/savings-products-icon.svg',
        route: '/savings-products',
      },
      {
        name: 'Fees and Charges',
        icon: '/path/to/fees-icon.svg',
        route: '/fees-and-charges',
      },
      {
        name: 'Transactions',
        icon: '/path/to/transactions-icon.svg',
        route: '/transactions',
      },
      {
        name: 'Services',
        icon: '/path/to/services-icon.svg',
        route: '/services',
      },
      {
        name: 'Service Account',
        icon: '/path/to/service-account-icon.svg',
        route: '/service-account',
      },
      {
        name: 'Settlements',
        icon: '/path/to/settlements-icon.svg',
        route: '/settlements',
      },
      { name: 'Reports', icon: '/path/to/reports-icon.svg', route: '/reports' },
    ],
  },
  {
    title: 'Settings',
    links: [
      {
        name: 'Preferences',
        icon: '/path/to/preferences-icon.svg',
        route: '/preferences',
      },
      {
        name: 'Fees and Pricing',
        icon: '/path/to/pricing-icon.svg',
        route: '/fees-and-pricing',
      },
      {
        name: 'Audit Logs',
        icon: '/path/to/audit-logs-icon.svg',
        route: '/audit-logs',
      },
    ],
  },
]
