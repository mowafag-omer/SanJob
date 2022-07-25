import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import api from '../utils/api'

export interface UserState {
  token: string | null,
  id: number | null,
  email: string | null,
  role: string | null,
  isLogged: boolean,
  loading: boolean,
  error: string
}

const initialState: UserState = {
  token: null,
  id: null,
  email: null,
  role: null,
  isLogged: false,
  loading: false,
  error: ''
}

export const register = createAsyncThunk('user/register', (userProps) => {
  return api
    .post('/user/register', {userProps} )
    .then(response => response.data)
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(register.pending, state => {
      state.loading = true
    })
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false
      state.users = action.payload
      state.error = ''
    })
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false
      state.users = []
      state.error = action.error.message
    })
  },
})


export default userSlice.reducer

