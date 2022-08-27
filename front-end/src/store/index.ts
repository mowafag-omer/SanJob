import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import jobseekerReducer from './jobSeekerSlice'
import companyReducer from './companySlice'
import sectorsReducer from './sectorsSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    jobseeker: jobseekerReducer,
    company: companyReducer,
    sectors: sectorsReducer
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store