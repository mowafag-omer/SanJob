import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../utils/api";
import { logout } from "./userSlice";

export type JobseekerState = {
  id: number | null;
  gender: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: number | null;
  birthdate: Date | null;
  location: string | null;
  profile_title: string | null;
  sector: string | null;
  linkedin: string | null;
  website: string | null;
  github: string | null;
  loading: boolean;
  error: string | null;
  validationError: { field: string; message: string } | null;
};

export type ProfileProps = {
  gender: string | null;
  first_name: string | null
  last_name: string | null;
  email: string | null;
  phone: number | null;
  birthdate: Date | null;
  location: string | null;
  profile_title: string | null;
  sector: string | null;
  linkedin: string | null;
  website: string | null;
  github: string | null;
};

const initialState: JobseekerState = {
  id: null,
  gender: null,
  first_name: null,
  last_name: null,
  email: null,
  phone: null,
  birthdate: null,
  location: null,
  profile_title: null,
  sector: null,
  linkedin: null,
  website: null,
  github: null,
  loading: false,
  error: null,
  validationError: null,
};

export const updateProfile = createAsyncThunk(
  "jobseeker/updateProfile",
  async (
    {
      profileProps,
      hasProfile,
      id,
    }: { profileProps: ProfileProps; hasProfile: boolean; id: number | null},
    { rejectWithValue }
  ) => {
    return await api
      .post(
        `/jobseeker/${hasProfile ? "updateJobSeekerProfile/"+id : "createProfile"}`,
        profileProps
      )
      .then((response: { data: any }) => response.data)
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const getJobseekerProfile = createAsyncThunk(
  "jobseeker/getJobseekerProfile", 
  async(userId: number | null, { rejectWithValue }) => {
    return await api
      .get(`/jobseeker/getJobSeekerProfile/${userId}`)
      .then((response: { data: any }) => response.data)
      .catch((error) => rejectWithValue(error.response.data));
  }
)

export const jobseekerSlice = createSlice({
  name: "jobseeker",
  initialState,
  reducers: {
    cleanErrors: (state) => {
      state.error = null;
      state.validationError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      updateProfile.fulfilled,
      (state, action: PayloadAction<any>) => {
        console.log(action.payload);
        
        return {...state, ...action.payload, loading: false}
      }
    );
    builder.addCase(
      updateProfile.rejected, 
      (state, action: PayloadAction<any>) => {
        console.log("action", action);
        state.loading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.validationError = action.payload;
        }
      }
    );

    builder.addCase(getJobseekerProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getJobseekerProfile.fulfilled,
      (state, action: PayloadAction<any>) => {
        return {...state, ...action.payload, loading: false}
      }
    )
    builder.addCase(
      getJobseekerProfile.rejected, 
      (state, action: PayloadAction<any>) => {
        console.log("action getProfile", action);
        state.loading = false;
        state.error = action.payload;
      }
    );
    builder.addCase(logout, () => initialState)
  },
});

export default jobseekerSlice.reducer;
export const { cleanErrors } = jobseekerSlice.actions;
