import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import jobseekerReducer from './jobSeekerSlice'
import companyReducer from './companySlice'
import sectorsReducer from './sectorsSlice'
import companiesReducer from './companiesSlice'
import jobsReducer from './jobsSlice'
import applicationsReducer from './applicationSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    jobseeker: jobseekerReducer,
    company: companyReducer,
    sectors: sectorsReducer,
    companies: companiesReducer,
    jobs: jobsReducer,
    applications: applicationsReducer
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store