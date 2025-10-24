/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // Async thunk to send OTP
// export const sendTestOTP = createAsyncThunk(
//   'beforeTest/sendOTP',
//   async (email, { rejectWithValue }) => {
//     try {
//       const response = await fetch('/api/test-taking/otp/send-otp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         return rejectWithValue(data);
//       }

//       return data;
//     } catch (error) {
//       return rejectWithValue({ error: 'Network error. Please try again.' });
//     }
//   }
// );

// // Async thunk to verify OTP
// export const verifyTestOTP = createAsyncThunk(
//   'beforeTest/verifyOTP',
//   async ({ email, otp }, { rejectWithValue }) => {
//     try {
//       const response = await fetch('/api/test-taking/otp/verify-otp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, otp }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         return rejectWithValue(data);
//       }

//       return data;
//     } catch (error) {
//       return rejectWithValue({ error: 'Network error. Please try again.' });
//     }
//   }
// );

// const beforeTestSlice = createSlice({
//   name: 'beforeTest',
//   initialState: {
//     // Email sending state
//     email: '',
//     isOTPSent: false,
//     sendingOTP: false,
//     sendOTPError: null,
//     canRetryAfter: 0,

//     // OTP verification state
//     verifyingOTP: false,
//     verifyOTPError: null,
//     remainingAttempts: 5,
//     isVerified: false,

//     // Student and courses data
//     student: null,
//     registeredCourses: [],

//     // UI state
//     currentStep: 'email', // 'email', 'otp', 'courses'
//   },
//   reducers: {
//     setEmail: (state, action) => {
//       state.email = action.payload;
//     },
//     resetOTPState: (state) => {
//       state.isOTPSent = false;
//       state.sendOTPError = null;
//       state.verifyOTPError = null;
//       state.remainingAttempts = 5;
//       state.canRetryAfter = 0;
//     },
//     setCurrentStep: (state, action) => {
//       state.currentStep = action.payload;
//     },
//     resetBeforeTest: (state) => {
//       state.email = '';
//       state.isOTPSent = false;
//       state.sendingOTP = false;
//       state.sendOTPError = null;
//       state.canRetryAfter = 0;
//       state.verifyingOTP = false;
//       state.verifyOTPError = null;
//       state.remainingAttempts = 5;
//       state.isVerified = false;
//       state.student = null;
//       state.registeredCourses = [];
//       state.currentStep = 'email';
//     },
//     decrementRetryTimer: (state) => {
//       if (state.canRetryAfter > 0) {
//         state.canRetryAfter -= 1;
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     // Send OTP
//     builder
//       .addCase(sendTestOTP.pending, (state) => {
//         state.sendingOTP = true;
//         state.sendOTPError = null;
//       })
//       .addCase(sendTestOTP.fulfilled, (state, action) => {
//         state.sendingOTP = false;
//         state.isOTPSent = true;
//         state.currentStep = 'otp';
//         state.sendOTPError = null;
//       })
//       .addCase(sendTestOTP.rejected, (state, action) => {
//         state.sendingOTP = false;
//         state.sendOTPError = action.payload?.error || 'Failed to send OTP';
//         state.canRetryAfter = action.payload?.canRetryAfter || 0;
//       });

//     // Verify OTP
//     builder
//       .addCase(verifyTestOTP.pending, (state) => {
//         state.verifyingOTP = true;
//         state.verifyOTPError = null;
//       })
//       .addCase(verifyTestOTP.fulfilled, (state, action) => {
//         state.verifyingOTP = false;
//         state.isVerified = true;
//         state.verifyOTPError = null;
//         state.student = action.payload.student;
//         state.registeredCourses = action.payload.student.registeredCourses;
//         state.currentStep = 'courses';
//       })
//       .addCase(verifyTestOTP.rejected, (state, action) => {
//         state.verifyingOTP = false;
//         state.verifyOTPError = action.payload?.error || 'Failed to verify OTP';
//         state.remainingAttempts = action.payload?.remainingAttempts ?? state.remainingAttempts;
//       });
//   },
// });

// export const {
//   setEmail,
//   resetOTPState,
//   setCurrentStep,
//   resetBeforeTest,
//   decrementRetryTimer,
// } = beforeTestSlice.actions;

// export default beforeTestSlice.reducer;


import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Define types
interface Course {
  testCourseId: string;
  title: string;
  description: string;
  durationMinutes: number;
  totalMarks: number;
  status: 'not_started' | 'in_progress' | 'submitted' | 'auto_submitted';
}

interface Student {
  id: string;
  name: string;
  email: string;
  registeredCourses: Course[];
}

interface SendOTPResponse {
  message: string;
  email: string;
  expiresIn: string;
  studentName?: string;
}

interface SendOTPError {
  error: string;
  canRetryAfter?: number;
}

interface VerifyOTPResponse {
  message: string;
  email: string;
  verified: boolean;
  student: Student;
}

interface VerifyOTPError {
  error: string;
  remainingAttempts?: number;
}

interface BeforeTestState {
  email: string;
  isOTPSent: boolean;
  sendingOTP: boolean;
  sendOTPError: string | null;
  canRetryAfter: number;
  verifyingOTP: boolean;
  verifyOTPError: string | null;
  remainingAttempts: number;
  isVerified: boolean;
  student: Student | null;
  registeredCourses: Course[];
  currentStep: 'email' | 'otp' | 'courses';
}

// Async thunk to send OTP
export const sendTestOTP = createAsyncThunk<
  SendOTPResponse,
  string,
  { rejectValue: SendOTPError }
>(
  'beforeTest/sendOTP',
  async (email, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/test-taking/otp/send-test-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data);
      }

      return data;
    } catch (error) {
      return rejectWithValue({ error: 'Network error. Please try again.' });
    }
  }
);

// Async thunk to verify OTP
export const verifyTestOTP = createAsyncThunk<
  VerifyOTPResponse,
  { email: string; otp: string },
  { rejectValue: VerifyOTPError }
>(
  'beforeTest/verifyOTP',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/test-taking/otp/verify-test-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data);
      }

      return data;
    } catch (error) {
      return rejectWithValue({ error: 'Network error. Please try again.' });
    }
  }
);

const initialState: BeforeTestState = {
  email: '',
  isOTPSent: false,
  sendingOTP: false,
  sendOTPError: null,
  canRetryAfter: 0,
  verifyingOTP: false,
  verifyOTPError: null,
  remainingAttempts: 5,
  isVerified: false,
  student: null,
  registeredCourses: [],
  currentStep: 'email',
};

const beforeTestSlice = createSlice({
  name: 'beforeTest',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    resetOTPState: (state) => {
      state.isOTPSent = false;
      state.sendOTPError = null;
      state.verifyOTPError = null;
      state.remainingAttempts = 5;
      state.canRetryAfter = 0;
    },
    setCurrentStep: (state, action: PayloadAction<'email' | 'otp' | 'courses'>) => {
      state.currentStep = action.payload;
    },
    resetBeforeTest: (state) => {
      state.email = '';
      state.isOTPSent = false;
      state.sendingOTP = false;
      state.sendOTPError = null;
      state.canRetryAfter = 0;
      state.verifyingOTP = false;
      state.verifyOTPError = null;
      state.remainingAttempts = 5;
      state.isVerified = false;
      state.student = null;
      state.registeredCourses = [];
      state.currentStep = 'email';
    },
    decrementRetryTimer: (state) => {
      if (state.canRetryAfter > 0) {
        state.canRetryAfter -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    // Send OTP
    builder
      .addCase(sendTestOTP.pending, (state) => {
        state.sendingOTP = true;
        state.sendOTPError = null;
      })
      .addCase(sendTestOTP.fulfilled, (state) => {
        state.sendingOTP = false;
        state.isOTPSent = true;
        state.currentStep = 'otp';
        state.sendOTPError = null;
      })
      .addCase(sendTestOTP.rejected, (state, action) => {
        state.sendingOTP = false;
        state.sendOTPError = action.payload?.error || 'Failed to send OTP';
        state.canRetryAfter = action.payload?.canRetryAfter || 0;
      });

    // Verify OTP
    builder
      .addCase(verifyTestOTP.pending, (state) => {
        state.verifyingOTP = true;
        state.verifyOTPError = null;
      })
      .addCase(verifyTestOTP.fulfilled, (state, action) => {
        state.verifyingOTP = false;
        state.isVerified = true;
        state.verifyOTPError = null;
        state.student = action.payload.student;
        state.registeredCourses = action.payload.student.registeredCourses;
        state.currentStep = 'courses';
      })
      .addCase(verifyTestOTP.rejected, (state, action) => {
        state.verifyingOTP = false;
        state.verifyOTPError = action.payload?.error || 'Failed to verify OTP';
        state.remainingAttempts = action.payload?.remainingAttempts ?? state.remainingAttempts;
      });
  },
});

export const {
  setEmail,
  resetOTPState,
  setCurrentStep,
  resetBeforeTest,
  decrementRetryTimer,
} = beforeTestSlice.actions;

export default beforeTestSlice.reducer;