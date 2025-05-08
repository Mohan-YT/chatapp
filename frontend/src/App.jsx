import './App.css'

import { useEffect } from 'react'
import { Routes , Route, Navigate } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'

import Navbar from './components/Navbar'
import ProfilePage from './pages/ProfilePage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import SettingsPage from './pages/SettingsPage'
import { useAuthStore } from './store/useAuthStore'
import { LoadingBar } from './components/Loadings'
import { useThemeStore } from './store/useThemeStore'

function App() {
  const {authUser,checkAuth,isCheckingAuth,onlineUsers} = useAuthStore()
  const {theme,setTheme} = useThemeStore()

  console.log({onlineUsers})

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  console.log({authUser})

  if(isCheckingAuth && !authUser) return (
    <div className='w-full h-screen flex justify-center items-center'>
      <LoadingBar />
    </div>
  )

  return (
    <main data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={ authUser ? <HomePage /> : <Navigate to='/login' /> } />
        <Route path="/signup" element={ !authUser ? < SignUpPage/> : <Navigate to='/' /> } />
        <Route path="/login" element={ !authUser ? <LoginPage /> : <Navigate to='/' /> } />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={ authUser ? <ProfilePage /> : <Navigate to='/login' /> } />
      </Routes>
      <Toaster />
    </main>
  )
}

export default App
