import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import api, { addAuth } from "../utils/api"
import { logout } from "./userSlice"
import { Buffer } from 'buffer'

export type JobseekerState = {
  id: number | null
  img_url: string | null
  gender: string | null
  first_name: string | null
  last_name: string | null
  email: string | null
  phone: number | null
  birthdate: Date | null
  location: string | null
  profile_title: string | null
  sector: string | null
  CV: any
  linkedin: string | null
  website: string | null
  github: string | null
  message: string | null
  loading: boolean
  error: string | null
  validationError: { field: string, message: string } | null
}

export type ProfileProps = {
  img_url: string | null
  gender: string | null
  first_name: string | null
  last_name: string | null
  email: string | null
  phone: number | null
  birthdate: Date | null
  location: string | null
  profile_title: string | null
  sector: string | null
  CV?: any
  linkedin: string | null
  website: string | null
  github: string | null
  user: number| null
}

const initialState: JobseekerState = {
  id: null,
  img_url:  null,
  gender: null,
  first_name: null,
  last_name: null,
  email: null,
  phone: null,
  birthdate: null,
  location: null,
  profile_title: null,
  sector: null,
  CV: null,
  linkedin: null,
  website: null,
  github: null,
  loading: false,
  message: null,
  error: null,
  validationError: null,
}

export const updateProfile = createAsyncThunk(
  "jobseeker/updateProfile",
  async (
    {
      profileProps,
      hasProfile,
      id,
    }: { profileProps: ProfileProps, hasProfile: boolean, id: number | null},
    { rejectWithValue, getState }
  ) => {
    if(!hasProfile) profileProps.CV = null
    const state: any = getState()
    const token = state.user.token
    addAuth(token)
    return await api
      .post(
        `/jobseeker/${hasProfile ? "updateJobSeekerProfile/"+id : "createProfile"}`,
        profileProps, { headers: {'Content-Type': 'multipart/form-data'} }
      )
      .then((response: { data: any }) => response.data)
      .catch((error) => rejectWithValue(error.response.data))
  }
)

export const addCV = createAsyncThunk(
  "jobseeker/addCV",
  async (
    { cv, id }: { cv: any, id: number | null },
    { rejectWithValue, getState }
  ) => {
    const state: any = getState()
    const token = state.user.token
    addAuth(token)

    const formData = new FormData()
    formData.append("CV", cv)
    const data = cv == null ? {CV: null} : formData 
    return await api.post(`/jobseeker/updateJobSeekerProfile/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response: { data: any }) => response.data)
    .catch((error) => rejectWithValue(error.response.data))
  }
)

export const getJobseekerProfile = createAsyncThunk(
  "jobseeker/getJobseekerProfile", 
  async(userId: number | null, { rejectWithValue, getState }) => {
    const state: any = getState()
    const token = state.user.token
    addAuth(token)
    return await api
      .get(`/jobseeker/getJobSeekerProfile/${userId}`)
      .then((response: { data: any }) => response.data)
      .catch((error) => rejectWithValue(error.response.data))
  }
)

export const jobseekerSlice = createSlice({
  name: "jobseeker",
  initialState,
  reducers: {
    cleanErrors: (state) => {
      state.error = null
      state.validationError = null
    },
    cleanMessages: (state) => {
      state.message = null 
    }
  },
  extraReducers: (builder) => {
    builder.addCase(updateProfile.pending, (state) => {
      state.loading = true
    })
    builder.addCase(
      updateProfile.fulfilled,
      (state, { payload }: PayloadAction<any>) => {
        if (payload.data.CV) {
          payload.data.CV = Buffer.from(payload.data.CV, 'base64')
          payload.data.CV = new Blob([new Uint8Array(payload.data.CV).buffer], {type: 'application/pdf'})
        }
        return {...state, ...payload.data, message: payload.message, loading: false} 
      }
    )
    builder.addCase(
      updateProfile.rejected, 
      (state, action: PayloadAction<any>) => {
        state.loading = false
        if (typeof action.payload === "string") {
          state.error = action.payload
        } else {
          state.validationError = action.payload
        }
      }
    )

    builder.addCase(addCV.pending, (state) => {
      state.loading = true
    })
    builder.addCase(
      addCV.fulfilled,
      (state, { payload }: PayloadAction<any>) => {
        if (payload.data.CV) {
          payload.data.CV = Buffer.from(payload.data.CV, 'base64')
          payload.data.CV = new Blob([new Uint8Array(payload.data.CV).buffer], {type: 'application/pdf'})
        }
        return {...state, ...payload.data, message: payload.message, loading: false} 
      }
    )
    builder.addCase(
      addCV.rejected, 
      (state, action: PayloadAction<any>) => {
        state.loading = false
        state.error = action.payload
      }
    )

    builder.addCase(getJobseekerProfile.pending, (state) => {
      state.loading = true
    })
    builder.addCase(
      getJobseekerProfile.fulfilled,
      (state, { payload }: PayloadAction<any>) => {
        if (payload.CV) {
          payload.CV = Buffer.from(payload.CV, 'base64')
          payload.CV = new Blob([new Uint8Array(payload.CV).buffer], {type: 'application/pdf'})
        } 
        return {...state, ...payload, loading: false} 
      }
    )
    builder.addCase(
      getJobseekerProfile.rejected, 
      (state, action: PayloadAction<any>) => {
        state.loading = false
        state.error = action.payload
      }
    )

    builder.addCase(logout.fulfilled, () => initialState)
  },
})

export default jobseekerSlice.reducer
export const { cleanErrors, cleanMessages } = jobseekerSlice.actions
