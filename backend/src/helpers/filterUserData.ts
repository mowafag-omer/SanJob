export default function filterUserData(array: any[], moduleName: string) {
  if (moduleName =='application') {
    return array.forEach(application => {
      application.jobOffer.company.user = null
      application.jobSeeker.user = null
    })
  }

  if (moduleName =='job') {
    return array.forEach(job => {
      job.company.user = null
    })
  }
}