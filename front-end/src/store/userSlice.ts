import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../utils/api";
import decodeToken from "../utils/decodeToken";
import { updateProfile } from "./jobSeekerSlice";
import { updateCompanyProfile } from "./companySlice";

export type UserState = {
  token: string | null;
  id: number | null;
  email: string | null;
  role: string | null;
  isLogged: boolean;
  hasProfile: boolean;
  message: string
  loading: boolean;
  error: string | null;
  validationError: { field: string; message: string } | null;
};

export type registerProps = {
  email: string;
  password: string;
  role: string;
};

export type loginProps = {
  email: string;
  password: string;
};

const initialState: UserState = {
  token: null,
  id: null,
  email: null,
  role: null,
  hasProfile: false,
  message: '',
  isLogged: false,
  loading: false,
  error: null,
  validationError: null,
};

export const register = createAsyncThunk(
  "user/register",
  async (props: registerProps, { rejectWithValue }) => {
    return await api
      .post("/user/register", props)
      .then((response: { data: any }) => response.data)
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (props: loginProps, { rejectWithValue }) => {
    return await api
      .post("/user/login", props)
      .then((response: { data: any }) => response.data)
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    cleanErrors: (state) => {
      state.error = null;
      state.validationError = null;
    },
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, { payload }: PayloadAction<any>) => {
      const { email, hasProfile, id, role } = decodeToken(payload.token);
      console.log(decodeToken(payload.token));
      
      return {
        ...state,
        token: payload.token,
        id,
        email,
        hasProfile,
        role,
        message: payload.message,
        isLogged: true,
        loading: false,
      };
    });
    builder.addCase(register.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      } else {
        state.validationError = action.payload;
      }
    });

    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
      const { email, hasProfile, id, role } = decodeToken(action.payload.token);

      return {
        ...state,
        id,
        token: action.payload.token,
        email,
        hasProfile,
        role,
        isLogged: true,
        loading: false,
      };
    });
    builder.addCase(login.rejected, (state, action: PayloadAction<any>) => {
      console.log("action", action);
      state.loading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      } else {
        state.validationError = action.payload;
      }
    });
    builder.addCase(updateProfile.fulfilled, (state) => {
      state.hasProfile = true;
    });
    builder.addCase(updateCompanyProfile.fulfilled, (state) => {
      state.hasProfile = true;
    });
  },
});

export default userSlice.reducer;
export const { cleanErrors, logout } = userSlice.actions;
