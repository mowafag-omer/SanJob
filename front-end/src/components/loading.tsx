import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "../store"
import { useNavigate } from "react-router-dom"
import { getJobseekerProfile } from "../store/jobSeekerSlice"
import { getCompanyProfile } from '../store/companySlice'
import {Box, LinearProgress} from '@mui/material/';

const Loading = () => {
  const { id: userId, isLogged, hasProfile, role } = useSelector((state: RootState) => state.user)
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    !isLogged && navigate('/')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (role === 'jobseeker') {
      !hasProfile && navigate('/jobseekerInfo')
      if (hasProfile) {
        dispatch(getJobseekerProfile(userId))
        navigate('/JobseekerDashboard')
      }
    }

    if (role === 'company') {
      !hasProfile && navigate('/companyInfo')
      if (hasProfile) {
        console.log(userId);

        dispatch(getCompanyProfile(userId))
        navigate('/companyInfo')
      }
    }
  }, [dispatch, hasProfile, navigate, role, userId])

  return (
    <Box sx={{ width: '50%', m: 'auto', color: '#2b3247' }}>
      <LinearProgress color="inherit" />
    </Box>
  )
}

export default Loading