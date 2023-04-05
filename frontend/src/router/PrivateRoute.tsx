import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootState } from '../store'

const ProtectedRoute = ({ children, role }: {children: JSX.Element, role: string}) => {
  const {hasProfile, role: userRole} = useSelector((state: RootState) => state.user)
   
  return (
    hasProfile && userRole === role
    ? children : <Navigate to="/" />
  ) 
}

export default ProtectedRoute