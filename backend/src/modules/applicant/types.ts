export type applicantProps = {
  id?: number
  gender: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birthdate: string;
  location: string;
  profile_headline: string;
  sector: number;
}

export type ServicReturnType = {
  success: boolean 
  message: string
}