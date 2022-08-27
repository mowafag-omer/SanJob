import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../utils/api";
import filterSectorsNames from "../utils/filterSectorsNames";

export type Sectors = {
  loading: boolean
  hasErrors: boolean
  sectors: string[]
}

export const initialState = {
  loading: false,
  hasErrors: false,
  sectors: [],
}

export const sectorsSlice = createSlice({
  name: 'sectors',
  initialState,
  reducers: {
    getSectors: state => {
      state.loading = true
    },
    getSectorsSuccess: (state, { payload }) => {
      state.sectors = payload
      state.loading = false
      state.hasErrors = false
    },
    getSectorsFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

export default sectorsSlice.reducer;
export const { getSectors, getSectorsSuccess, getSectorsFailure } = sectorsSlice.actions

export function fetchSectors() {
  return async (dispatch: (arg0: { payload: any; type: string; }) => void) => {
    dispatch(getSectors())
    try {
      const response = await api.get('https://api.trademe.co.nz/v1/Categories/Jobs.json')
      console.log(response.data)
      dispatch(getSectorsSuccess(filterSectorsNames(response.data)))
    } catch (error) {
      dispatch(getSectorsFailure())
    }
  }
}
