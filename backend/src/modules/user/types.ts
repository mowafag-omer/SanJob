export type userProps = {
  id?: any
  email: string
  password: string
  role: string
  hasProfile?: boolean 
}

export type ServicReturnType = {
  success: boolean 
  message: string
  payload?: any
}

// export type loginService = { success: boolean,  payload: object } | { success: boolean, message: string }