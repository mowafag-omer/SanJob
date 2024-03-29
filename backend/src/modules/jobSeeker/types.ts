export type jobSeekerProps = {
  id?: number
  img_url: string
  gender: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birthdate: string;
  location: string;
  profile_title: string;
  sector: string;
  CV?: any
  linkedin: string
  website: string
  github: string
  user: { id: number }
}

export type jobSeekerUpdateProps = {
  id?: number
  img_url?: string
  gender?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  birthdate?: string;
  location?: string;
  profile_title?: string;
  sector?: string;
  CV: any
  linkedin?: string
  website?: string
  github?: string
  user?: { id: number }
}

export type ServicReturnType = {
  success: boolean 
  payload?: object
  message: string
}