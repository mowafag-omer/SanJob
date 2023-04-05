export default function countJobApplicaions(
  jobId: number,
  applications: { jobOffer: { id: number } }[]
): number {
  let count = 0;
  applications.forEach((app) => {
    if (jobId === app.jobOffer.id) ++count;
  });
  return count
}