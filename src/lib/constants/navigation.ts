import briefcase from '../../assets/icons/briefcase.svg'
import audit from '../../assets/icons/audit.svg'
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
import savingProduct from '../../assets/icons/savingProduct.svg'
import serviceAccount from '../../assets/icons/serviceAccount.svg'
import services from '../../assets/icons/services.svg'
import settlement from '../../assets/icons/settlement.svg'
import transactions from '../../assets/icons/transactions.svg'
import whitelist from '../../assets/icons/whitelist.svg'
import user from '../../assets/icons/user.svg'

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
      { name: 'Users', icon: user, route: '/' },
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
        icon: briefcase,
        route: '/organization',
      },
      {
        name: 'Loan Products',
        icon: loanRequest,
        route: '/loan-products',
      },
      {
        name: 'Savings Products',
        icon: savingProduct,
        route: '/savings-products',
      },
      {
        name: 'Fees and Charges',
        icon: fees,
        route: '/fees-and-charges',
      },
      {
        name: 'Transactions',
        icon: transactions,
        route: '/transactions',
      },
      {
        name: 'Services',
        icon: services,
        route: '/services',
      },
      {
        name: 'Service Account',
        icon: serviceAccount,
        route: '/service-account',
      },
      {
        name: 'Settlements',
        icon: settlement,
        route: '/settlements',
      },
      { name: 'Reports', icon: report, route: '/reports' },
    ],
  },
  {
    title: 'Settings',
    links: [
      {
        name: 'Preferences',
        icon: preferences,
        route: '/preferences',
      },
      {
        name: 'Fees and Pricing',
        icon: pricing,
        route: '/fees-and-pricing',
      },
      {
        name: 'Audit Logs',
        icon: audit,
        route: '/audit-logs',
      },
    ],
  },
]
