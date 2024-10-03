import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/auth/Login'
import Dashboard from './pages/Dashboard'
import Layout from './pages/global/Layout'
import UserDetails from './pages/UserDetails'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Protected Layout and nested routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/user-details" element={<UserDetails />} />
      </Route>

      {/* Catch-all route that redirects any unavailable routes to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
