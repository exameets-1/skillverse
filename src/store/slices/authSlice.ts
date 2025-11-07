/* eslint-disable @typescript-eslint/no-unused-vars */
// src/store/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store"; // adjust path if needed

// --- Types
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

// --- Helper: parse fetch JSON safely
async function parseJsonResponse<T>(res: Response): Promise<T> {
  // may throw if response body not JSON
  return (await res.json()) as T;
}

// --- Thunk return / arg / thunkAPI typing
// All thunks will use rejectWithValue<string>() on errors

export const loginUser = createAsyncThunk<
  AuthUser, // return type on success (fulfilled)
  { email: string; password: string }, // argument
  { rejectValue: string } // rejectWithValue type
>("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    // NOTE: response contains message and user or error
    const data = await parseJsonResponse<{ message?: string; user?: AuthUser; error?: string }>(res);

    if (!res.ok) {
      // prefer server-provided error -> fall back to generic
      return rejectWithValue(data.error ?? "Login failed");
    }

    if (!data.user) {
      return rejectWithValue("Invalid server response: missing user");
    }

    return data.user;
  } catch (error) {
    // use the caught error to comply with no-unused-vars and to give better messages
    const msg = error instanceof Error ? error.message : "Network error";
    return rejectWithValue(msg);
  }
});

export const registerUser = createAsyncThunk<
  AuthUser | undefined, // we don't necessarily receive user in register response in your endpoint but you do; use undefined if none
  {
    name: string;
    email: string;
    phone: string;
    password: string;
    educationLevel?: string;
    address?: string;
    location?: { state?: string; district?: string };
    guardianName?: string;
    guardianPhone?: string;
  },
  { rejectValue: string }
>("auth/registerUser", async (formData, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await parseJsonResponse<{ message?: string; user?: AuthUser; error?: string }>(res);

    if (!res.ok) {
      return rejectWithValue(data.error ?? "Registration failed");
    }

    // your endpoint returns user in body — return it if present.
    return data.user;
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Network error";
    return rejectWithValue(msg);
  }
});

export const logoutUser = createAsyncThunk<
  true, // success payload
  void,
  { rejectValue: string }
>("auth/logoutUser", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/auth/logout", { method: "POST" });

    if (!res.ok) {
      // try to parse message if any
      const data = await parseJsonResponse<{ error?: string }>(res);
      return rejectWithValue(data.error ?? "Logout failed");
    }

    return true;
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Network error";
    return rejectWithValue(msg);
  }
});

export const fetchMe = createAsyncThunk<
  AuthUser | null,
  void,
  { rejectValue: string }
>("auth/fetchMe", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/auth/me", {
      method: "GET",
      credentials: "include", // ensures cookies are sent (optional but good practice)
    });

    if (!res.ok) {
      // Not authenticated, return null (silent failure)
      return null;
    }

    const data = await res.json();
    return data.user ?? null;
  } catch (error) {
    return rejectWithValue("Failed to re-authenticate");
  }
});


// --- Initial state
const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// --- Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // optional synchronous helper: set user (useful for hydration)
    setUser(state, action: PayloadAction<AuthUser | null>) {
      state.user = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // LOGIN
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthUser>) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      // action.payload is rejectWithValue string OR undefined if thrown
      state.error = action.payload ?? (action.error?.message ?? "Login failed");
    });

    // REGISTER
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      // If register returns user, set it, else keep null (you require login after register)
      state.user = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? (action.error?.message ?? "Registration failed");
    });

    // LOGOUT
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      // we still clear user locally even if server logout failed? keep user cleared only on success
      state.error = action.payload ?? (action.error?.message ?? "Logout failed");
    });

    // FETCH ME 
    builder.addCase(fetchMe.pending, (state) => {
    state.loading = true;
    });
    builder.addCase(fetchMe.fulfilled, (state, action: PayloadAction<AuthUser | null>) => {
    state.loading = false;
    state.user = action.payload; // either user or null
    });
    builder.addCase(fetchMe.rejected, (state) => {
    state.loading = false;
    state.user = null; // session invalid -> ensure logged out
    });

  },
});

export const { setUser, clearError } = authSlice.actions;

export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
