export default function toDate(date: any) {
  return new Date(date).toLocaleString().split(', 12:00:00 AM')
}