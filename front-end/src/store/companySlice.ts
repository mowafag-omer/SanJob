import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../utils/api";
import { logout } from "./userSlice";

export type CompanyState = {
  id: number | null
  name: string | null
  location: string | null
  sector: number | null
  presentation: string | null
  founding_year: string | null
  employees: number | null
  website: string | null
  loading: boolean;
  error: string | null;
  validationError: { field: string; message: string } | null;
}

export type CompanyProps = {
  name: string | null
  location: string | null
  sector: number | null
  presentation: string | null
  founding_year: string | null
  employees: number | null
  website: string | null
}

const initialState: CompanyState = {
  id: null,
  name: null,
  location: null,
  sector: 0,
  presentation: null,
  founding_year: null,
  employees: null,
  website: null,
  loading: false,
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
    }: { profileProps: CompanyProps; hasProfile: boolean; id: number | null},
    { rejectWithValue }
  ) => {
    return await api
      .post(
        `/conmpany/${hasProfile ? "updateCompanyProfile/"+id : "createProfile"}`,
        profileProps
      )
      .then((response: { data: any }) => response.data)
      .catch((error) => rejectWithValue(error.response.data));
  }
)

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    cleanErrors: (state) => {
      state.error = null;
      state.validationError = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(updateProfile.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(
      updateProfile.fulfilled,
      (state, action: PayloadAction<any>) => {
        return {...state, ...action.payload, loading: false}
      }
    )
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
    )

    builder.addCase(logout, () => initialState)
  },
})

export default companySlice.reducer
export const { cleanErrors } = companySlice.actions