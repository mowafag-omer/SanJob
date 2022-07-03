export type jobSeekerProps = {
  id?: number
  gender: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birthdate: string;
  location: string;
  profile_title: string;
  sector: number;
  linkedin: string
  website: string
  github: string
}

export type ServicReturnType = {
  success: boolean 
  message: string
}