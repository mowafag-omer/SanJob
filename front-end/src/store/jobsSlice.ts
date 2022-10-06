import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../utils/api";
import { logout } from "./userSlice";
import { SingleJobProps } from "../components/jobseeker/jobs/jobCard";

export type JobsState = {
  loading: boolean
  jobs: []
  jobById: any
  companyJobs: []
  message: string | null
  error: string | null;
  validationError: { field: string; message: string } | null;
}

export type JobProps = {
  id: number | null
  job_title: string | null
  location: string | null
  contract_type: string[] | null
  sector: string | null
  description: string | null
  requirement: string | null
  start_date: Date | null
  posted_at?: string
  hiring_process: string | null
  status?: string | null
  company: number | null
}

const initialState: JobsState = {
  loading: false,
  jobs: [],
  jobById: null,
  companyJobs: [],
  message: null,
  error: null,
  validationError: null
}

export const postJob = createAsyncThunk(
  "jobs/postJob",
  async ({ jobProps, id }: { jobProps: JobProps; id: number | null},
    { rejectWithValue }
  ) => {
    return await api
      .post(
        `/jobOffer/${id ? "updateJobOffer/"+id : "postJobOffer"}`,
        jobProps
      )
      .then((response: { data: any }) => response.data)
      .catch((error) => rejectWithValue(error.response.data));
  }
)

export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs", 
  async(_,{ rejectWithValue }: any) => {
    return await api
      .get(`/jobOffer/getAllJobOffers/`)
      .then((response: { data: any }) => response.data)
      .catch((error) => rejectWithValue(error.response.data))
  }
)

export const getCompanyJobs = createAsyncThunk(
  "jobs/getCompanyJobs", 
  async(companyId: number | null, { rejectWithValue }) => {
    return await api
      .get(`/jobOffer/getCompanyJobOffers/${companyId}`)
      .then((response: { data: any }) => response.data)
      .catch((error) => rejectWithValue(error.response.data));
  }
)

export const jobsSlie = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    getJobById: (state, { payload }) => {
      const job = current(state).jobs.filter((job: SingleJobProps) => job.id === +payload)[0]
      return {...state, jobById: job}
    },
    cleanErrors: (state) => {
      state.error = null;
      state.validationError = null;
    },
    cleanMessages: (state) => {
      state.message = null 
    }
  },
  extraReducers(builder) {
    builder.addCase(postJob.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(
      postJob.fulfilled,
      (state, { payload }: PayloadAction<any>) => {
        // const newJobs: [] = [...state.companyJobs, payload.payload]
        return {...state, message: payload.message, loading: false}
      }
    )
    builder.addCase(
      postJob.rejected, 
      (state, { payload }: PayloadAction<any>) => {
        state.loading = false;
        if (typeof payload === "string") {
          state.error = payload;
        } else {
          state.validationError = payload;
        }
      }
    )

    builder.addCase(fetchJobs.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(
      fetchJobs.fulfilled,
      (state, { payload }: PayloadAction<any>) => {
        return {...state, jobs: payload, loading: false}
      }
    )
    builder.addCase(
      fetchJobs.rejected, 
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      }
    )

    builder.addCase(getCompanyJobs.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(
      getCompanyJobs.fulfilled,
      (state, { payload }: PayloadAction<any>) => {
        return {...state, companyJobs: payload, loading: false}
      }
    )
    builder.addCase(
      getCompanyJobs.rejected, 
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      }
    )

    builder.addCase(logout.fulfilled, (state) =>{
      return {...state, companyJobs: []}
    })
  }
})

export default jobsSlie.reducer
export const { getJobById , cleanErrors, cleanMessages } = jobsSlie.actions