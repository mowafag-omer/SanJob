import { createSlice } from "@reduxjs/toolkit";
import api from "../utils/api";

export type Companies = {
  loading: boolean
  hasErrors: boolean
  companies: string[]
}

export const initialState = {
  loading: false,
  hasErrors: false,
  companies: [],
}

export const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    getCompanies: state => {
      state.loading = true
    },
    getCompaniesSuccess: (state, { payload }) => {
      payload.forEach((company: any) =>  JSON.parse(company.sector))
      state.companies = payload
      state.loading = false
      state.hasErrors = false
    },
    getCompaniesFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

export default companiesSlice.reducer;
export const { getCompanies, getCompaniesSuccess, getCompaniesFailure } = companiesSlice.actions

export function fetchCompanies() {
  return async (dispatch: (arg0: { payload: any; type: string; }) => void) => {
    dispatch(getCompanies())
    try {
      const response = await api.get('/company/getProfiles')
      dispatch(getCompaniesSuccess(response.data))
    } catch (error) {
      dispatch(getCompaniesFailure())
    }
  }
}
