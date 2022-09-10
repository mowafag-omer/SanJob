import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { fetchJobs } from '../../store/jobsSlice'
import JobsContainer from "../../components/jobseeker/jobs/jobsContainer"
import SearchFrom from "../../components/jobseeker/jobs/searchFrom"

const data = [
  {
    title: "Dev fornt-end",
    company: "company",
    contract: "Permanent contract",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7F8l4iI0tf7AZRf0FGEnbHy14DmZD67JRENUHfsOAHMDv4KW0RdwfUVpEg67SY5JpF-M&usqp=CAU",
    location: "Paris",
    date: "2 days ago"
  },
  {
    title: "Dev fornt-end",
    company: "company",
    contract: "Permanent contract",
    img: "https://i.pinimg.com/736x/e9/e2/78/e9e2787d0cb55d570fe1c76843506759.jpg",
    location: "Paris",
    date: "2 days ago"
  },
  {
    title: "Dev fornt-end",
    company: "company",
    contract: "Permanent contract",
    img: "https://cdn.dribbble.com/users/371199/screenshots/11891575/media/6df51f6e524e3918c4ccec381d4f4523.jpg?compress=1&resize=400x300",
    location: "Paris",
    date: "2 days ago"
  },
  {
    title: "Dev fornt-end",
    company: "company",
    contract: "Permanent contract",
    img: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/business-logo-design-template-78655edda18bc1196ab28760f1535baa_screen.jpg?ts=1617645324",
    location: "Paris",
    date: "2 days ago"
  },
]

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