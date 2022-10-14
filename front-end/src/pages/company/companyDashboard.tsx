import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { getCompanyJobs } from '../../store/jobsSlice';
import { getCompanyApplications } from '../../store/applicationSlice';


const CompanyDashboard = () => {
  const { id } = useSelector((state: RootState) => state.company);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getCompanyJobs(id))
    dispatch(getCompanyApplications(id))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
    <div>CompanyDashboard</div>
    </>
  )
}

export default CompanyDashboard