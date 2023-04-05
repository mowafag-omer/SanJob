export default function numberOfDays(applingDate: Date) {
  const difference = new Date().getTime() - applingDate.getTime()
  return Math.ceil(difference / (1000 * 3600 * 24))
}