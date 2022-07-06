export type userProps = {
  email: string
  password: string
  role: string
}

export type ServicReturnType = {
  success: boolean 
  message: string
  payload?: any
}

// export type loginService = { success: boolean,  payload: object } | { success: boolean, message: string }