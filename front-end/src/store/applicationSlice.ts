import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../utils/api";
import { logout } from "./userSlice";

export type ApplicationState = {
  loading: boolean
  jobApplications: []
  companyApplications: []
  jobseekerApplications: Object[]
  message: string | null
  error: string | null;
}

export type applicationProps = {
  id?: number
  jobOffer: number
  jobSeeker: number
}

const initialState : ApplicationState = {
  loading: false,
  jobApplications: [],
  companyApplications: [],
  jobseekerApplications: [],
  message: null,
  error: null
}

export const apply = createAsyncThunk(
  "applications/apply",
  async (props: applicationProps, { rejectWithValue }) => {
    return await api
      .post('/application/apply', props)
      .then((response: { data: any }) => response.data)
      .catch((error) => rejectWithValue(error.response.data));
  }
)

export const getJobSeekerApplications = createAsyncThunk(
  "jobs/getCompanyJobs", 
  async(jobSeekerId: number | null, { rejectWithValue }) => {
    return await api
      .get(`/application/getJobSeekerApplications/${jobSeekerId}`)
      .then((response: { data: any }) => response.data)
      .catch((error) => rejectWithValue(error.response.data));
  }
)

export const applicationsSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    cleanErrors: (state) => {
      state.error = null;
    },
    cleanMessages: (state) => {
      state.message = null 
    }
  },
  extraReducers(builder) {
    builder.addCase(apply.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(
      apply.fulfilled,
      (state, { payload }: PayloadAction<any>) => {
        state.jobseekerApplications.push(payload.data)
        state.message = payload.message
      }
    )
    builder.addCase(
      apply.rejected, 
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      }
    )

    builder.addCase(getJobSeekerApplications.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(
      getJobSeekerApplications.fulfilled,
      (state, { payload }: PayloadAction<any>) => {
        return {...state, jobseekerApplications: payload, loading: false}
      }
    )
    builder.addCase(
      getJobSeekerApplications.rejected, 
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      }
    )
  }
})

export default applicationsSlice.reducer
export const { cleanErrors, cleanMessages } = applicationsSlice.actions
