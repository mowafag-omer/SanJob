import CompanySearch from '../components/companies/companySearch'
import CompaniesContainer from '../components/companies/companiesContainer'

const data = [
  {
    name: "CompanyX",
    sector: "Tech, business",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7F8l4iI0tf7AZRf0FGEnbHy14DmZD67JRENUHfsOAHMDv4KW0RdwfUVpEg67SY5JpF-M&usqp=CAU",
    location: "Paris",
    employees: "1200",
    jobs: 5
  },
  {
    name: "CompanyX",
    sector: "Tech, business",
    img: "https://i.pinimg.com/736x/e9/e2/78/e9e2787d0cb55d570fe1c76843506759.jpg",
    location: "Paris",
    employees: "60",
    jobs: 5
  },
  {
    name: "CompanyX",
    sector: "Tech, business",
    img: "https://cdn.dribbble.com/users/371199/screenshots/11891575/media/6df51f6e524e3918c4ccec381d4f4523.jpg?compress=1&resize=400x300",
    location: "Paris",
    employees: "50",
    jobs: 5
  },
  {
    name: "CompanyX",
    sector: "Tech, business",
    img: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/business-logo-design-template-78655edda18bc1196ab28760f1535baa_screen.jpg?ts=1617645324",
    location: "Paris",
    employees: "21",
    jobs: 8
  },
]

const Companies = () => {
  return (
    <>
      <CompanySearch />
      <CompaniesContainer companies={data} />
    </>
  )
}

export default Companies