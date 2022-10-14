import { Grid, Container } from "@mui/material"
import CompanyCard, { companyProps } from "./companyCard"

const CompaniesContainer = ({ companies }: { companies: companyProps[] }) => {
  return (
    <Grid container direction="column" alignItems="center" sx={styles.gird}>
      <Container sx={styles.container}>
      {companies.map((company: companyProps) => (
          <CompanyCard company={company}/>
        ))}
        
      </Container>
    </Grid>
  )
}

export default CompaniesContainer

const styles = {
  gird : {
    height: "100%",
    width: '100%',
    p: 4
  },
  container: {
    maxWidth: {lg: '1440px'},
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap', 
    gap: 3,
    justifyContent: 'center',
  },
}