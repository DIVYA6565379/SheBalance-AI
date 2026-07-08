import { Routes, Route } from 'react-router-dom'
import Landing from './Landing'
import Login from './Login'
import Register from './Register'
import Dashboard from './Dashboard'
import WelcomeShell from '../components/WelcomeShell'
import NotFound from './NotFound'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/welcome" element={<WelcomeShell />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}


