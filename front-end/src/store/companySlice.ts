import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../utils/api";
import { logout } from "./userSlice";

export type CompanyState = {
  id: number | null
  name: string | null
  location: string | null
  sector: string[]
  presentation: string | null
  founding_year: number | null
  employees: number | null
  website: string | null
  message: string | null
  loading: boolean;
  error: string | null;
  validationError: { field: string; message: string } | null;
}

export type CompanyProps = {
  name: string | null
  location: string | null
  sector: string[] | null
  presentation: string | null
  founding_year: number | null
  employees: number | null
  website: string | null
}

const initialState: CompanyState = {
  id: null,
  name: null,
  location: null,
  sector: [],
  presentation: null,
  founding_year: null,
  employees: null,
  website: null,
  message: null,
  loading: false,
  error: null,
  validationError: null,
}

export const updateCompanyProfile = createAsyncThunk(
  "company/updateCompanyProfile",
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
        `/company/${hasProfile ? "updateCompanyProfile/"+id : "createProfile"}`,
        profileProps
      )
      .then((response: { data: any }) => response.data)
      .catch((error) => rejectWithValue(error.response.data));
  }
)

export const getCompanyProfile = createAsyncThunk(
  "company/getCompanyProfile", 
  async(userId: number | null, { rejectWithValue }) => {
    return await api
      .get(`/company/getCompanyProfile/${userId}`)
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
    cleanMessages: (state) => {
      state.message = null 
    }
  },
  extraReducers(builder) {
    builder.addCase(updateCompanyProfile.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(
      updateCompanyProfile.fulfilled,
      (state, { payload }: PayloadAction<any>) => {
        payload.payload.sector = JSON.parse(payload.payload.sector)
        return {...state, ...payload.payload, message: payload.message, loading: false}
      }
    )
    builder.addCase(
      updateCompanyProfile.rejected, 
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
    
    builder.addCase(getCompanyProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getCompanyProfile.fulfilled,
      (state, { payload }: PayloadAction<any>) => {
        return {...state, ...payload, loading: false}
      }
    )
    builder.addCase(
      getCompanyProfile.rejected, 
      (state, { payload }: PayloadAction<any>) => {
        state.loading = false
        state.error = payload
      }
    );
    builder.addCase(logout, () => initialState)
  },
})

export default companySlice.reducer
export const { cleanErrors, cleanMessages } = companySlice.actions