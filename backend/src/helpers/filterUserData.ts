export default function filterUserData(applications: any[]) {
  return applications.forEach(application => {
    application.job.company.user = null
    application.jobSeeker.user = null
  } )
}