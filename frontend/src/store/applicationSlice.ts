import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../utils/api";
import { logout } from "./userSlice";

export type ApplicationState = {
  loading: boolean
  jobApplications: []
  companyApplications: any[]
  jobseekerApplications: any[]
  message: string | null
  error: string | null;
}

export type applicationProps = {
  id?: number
  status?: string
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
  "jobs/getJobSeekerApplications", 
  async(jobSeekerId: number | null, { rejectWithValue }) => {
    return await api
      .get(`/application/getJobSeekerApplications/${jobSeekerId}`)
      .then((response: { data: any }) => response.data)
      .catch((error) => rejectWithValue(error.response.data));
  }
)

export const getCompanyApplications = createAsyncThunk(
  "jobs/getCompanyApplications", 
  async(companyId: number | null, { rejectWithValue }) => {
    return await api
      .get(`/application/getCompanyApplications/${companyId}`)
      .then((response: { data: any }) => response.data)
      .catch((error) => rejectWithValue(error.response.data));
  }
)

export const updateApplication = createAsyncThunk(
  "jobs/updateApplication", 
  async({applicaionId, status}: {applicaionId: number, status: string}, { rejectWithValue }) => {
    return await api
      .post(`/application/updateApplication/${applicaionId}`, {status: status})
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

    builder.addCase(getCompanyApplications.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(
      getCompanyApplications.fulfilled,
      (state, { payload }: PayloadAction<any>) => {
        return {...state, companyApplications: payload, loading: false}
      }
    )
    builder.addCase(
      getCompanyApplications.rejected, 
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      }
    )
    
    builder.addCase(updateApplication.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(
      updateApplication.fulfilled,
      (state, { payload }: PayloadAction<any>) => {
        let updatedApp = state.companyApplications.filter((app: any) => app.id === payload.data.id)[0]
        let newApp = {...updatedApp, status: payload.data.status}
        let apps = state.companyApplications.filter((app: any) => app.id !== payload.data.id)

        return {...state, companyApplications: [...apps, newApp], loading: false}
      }
    )
    builder.addCase(
      updateApplication.rejected, 
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      }
    )

    builder.addCase(logout.fulfilled, () => initialState)
  }
})

export default applicationsSlice.reducer
export const { cleanErrors, cleanMessages } = applicationsSlice.actions
