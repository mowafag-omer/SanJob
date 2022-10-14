import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { fetchJobs } from '../../store/jobsSlice'
import JobsContainer from "../../components/jobseeker/jobs/jobsContainer"
import SearchFrom from "../../components/jobseeker/jobs/searchFrom"

const Jobs = () => {
  const dispatch: AppDispatch = useDispatch()
  const jobs = useSelector((state: RootState) => state.jobs.jobs)

  useEffect(() => {
    dispatch(fetchJobs())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <SearchFrom />
      <JobsContainer jobs={jobs} />
    </>
  )
}

export default Jobs