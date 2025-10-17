/* eslint-disable @typescript-eslint/no-unused-vars */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunks for API calls

// Send OTP to email
export const sendOTP = createAsyncThunk(
  'studentRegistration/sendOTP',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/test/student/send-otp', { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: 'Failed to send OTP' }
      );
    }
  }
);

// Verify OTP
export const verifyOTP = createAsyncThunk(
  'studentRegistration/verifyOTP',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/test/student/verify-otp', { 
        email, 
        otp 
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: 'Failed to verify OTP' }
      );
    }
  }
);

// Fetch active tests
export const fetchActiveTests = createAsyncThunk(
  'studentRegistration/fetchActiveTests',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/test/active-tests');
      // Return the tests array from the response
      return response.data.tests || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: 'Failed to fetch active tests' }
      );
    }
  }
);

// Check referral code
export const checkReferralCode = createAsyncThunk(
  'studentRegistration/checkReferralCode',
  async (referralCode, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/test/student/check-referral', { 
        referralCode 
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: 'Invalid referral code' }
      );
    }
  }
);

// Register student
export const registerStudent = createAsyncThunk(
  'studentRegistration/registerStudent',
  async (studentData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/test/student/register', studentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: 'Registration failed' }
      );
    }
  }
);

// Initial state
const initialState = {
  // Form data
  formData: {
    name: '',
    studentEmail: '',
    studentNumber: '',
    studentDOB: '',
    studentGuardianName: '',
    studentGuardianNumber: '',
    location: {
      state: '',
      district: ''
    },
    registeredCourses: [],
    referralCode: ''
  },
  
  // OTP verification state
  otp: {
    value: '',
    sent: false,
    verified: false,
    loading: false,
    error: null,
    expiresIn: null,
    canRetryAfter: null,
    remainingAttempts: 5
  },
  
  // Active tests state
  activeTests: {
    data: [],
    loading: false,
    error: null,
    fetched: false
  },
  
  // Referral state
  referral: {
    code: '',
    referrerName: null,
    isValid: null,
    loading: false,
    error: null,
    checked: false
  },
  
  // Registration state
  registration: {
    loading: false,
    error: null,
    success: false,
    data: null
  },
  
  // Validation flags
  validation: {
    isEmailVerified: false,
    isCoursesSelected: false,
    canSubmit: false
  }
};

// Slice
const studentRegistrationSlice = createSlice({
  name: 'studentRegistration',
  initialState,
  reducers: {
    // Update form field
    updateFormField: (state, action) => {
      const { field, value } = action.payload;
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        state.formData[parent][child] = value;
        
        // Reset district when state changes
        if (parent === 'location' && child === 'state') {
          state.formData.location.district = '';
        }
      } else {
        state.formData[field] = value;
      }
    },
    
    // Update OTP value
    updateOTPValue: (state, action) => {
      state.otp.value = action.payload;
    },
    
    // Toggle course selection
    toggleCourseSelection: (state, action) => {
      const courseId = action.payload;
      const index = state.formData.registeredCourses.indexOf(courseId);
      
      if (index > -1) {
        state.formData.registeredCourses.splice(index, 1);
      } else {
        state.formData.registeredCourses.push(courseId);
      }
      
      // Update validation
      state.validation.isCoursesSelected = state.formData.registeredCourses.length > 0;
      state.validation.canSubmit = 
        state.validation.isEmailVerified && 
        state.validation.isCoursesSelected;
    },
    
    // Update referral code
    updateReferralCode: (state, action) => {
      state.referral.code = action.payload;
      state.formData.referralCode = action.payload;
      // Reset validation when code changes
      if (!action.payload) {
        state.referral.isValid = null;
        state.referral.referrerName = null;
        state.referral.checked = false;
        state.referral.error = null;
      }
    },
    
    // Reset OTP state
    resetOTPState: (state) => {
      state.otp = {
        value: '',
        sent: false,
        verified: false,
        loading: false,
        error: null,
        expiresIn: null,
        canRetryAfter: null,
        remainingAttempts: 5
      };
      state.validation.isEmailVerified = false;
      state.validation.canSubmit = false;
    },
    
    // Reset entire form
    resetForm: (state) => {
      return initialState;
    },
    
    // Clear registration success (for showing another form)
    clearRegistrationSuccess: (state) => {
      state.registration.success = false;
      state.registration.data = null;
    },
    
    // Clear registration error
    clearRegistrationError: (state) => {
      state.registration.error = null;
    }
  },
  
  extraReducers: (builder) => {
    // Send OTP
    builder
      .addCase(sendOTP.pending, (state) => {
        state.otp.loading = true;
        state.otp.error = null;
      })
      .addCase(sendOTP.fulfilled, (state, action) => {
        state.otp.loading = false;
        state.otp.sent = true;
        state.otp.error = null;
        state.otp.expiresIn = action.payload.expiresIn;
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.otp.loading = false;
        state.otp.error = action.payload?.error || 'Failed to send OTP';
        state.otp.canRetryAfter = action.payload?.canRetryAfter || null;
      });
    
    // Verify OTP
    builder
      .addCase(verifyOTP.pending, (state) => {
        state.otp.loading = true;
        state.otp.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.otp.loading = false;
        state.otp.verified = true;
        state.otp.error = null;
        state.validation.isEmailVerified = true;
        state.validation.canSubmit = 
          state.validation.isEmailVerified && 
          state.validation.isCoursesSelected;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.otp.loading = false;
        state.otp.error = action.payload?.error || 'Failed to verify OTP';
        state.otp.remainingAttempts = action.payload?.remainingAttempts ?? state.otp.remainingAttempts;
      });
    
    // Fetch active tests
    builder
      .addCase(fetchActiveTests.pending, (state) => {
        state.activeTests.loading = true;
        state.activeTests.error = null;
      })
      .addCase(fetchActiveTests.fulfilled, (state, action) => {
        state.activeTests.loading = false;
        state.activeTests.data = action.payload;
        state.activeTests.fetched = true;
        state.activeTests.error = null;
      })
      .addCase(fetchActiveTests.rejected, (state, action) => {
        state.activeTests.loading = false;
        state.activeTests.error = action.payload?.error || 'Failed to fetch tests';
      });
    
    // Check referral code
    builder
      .addCase(checkReferralCode.pending, (state) => {
        state.referral.loading = true;
        state.referral.error = null;
        state.referral.isValid = null;
      })
      .addCase(checkReferralCode.fulfilled, (state, action) => {
        state.referral.loading = false;
        state.referral.isValid = true;
        state.referral.referrerName = action.payload.referrerName;
        state.referral.error = null;
        state.referral.checked = true;
      })
      .addCase(checkReferralCode.rejected, (state, action) => {
        state.referral.loading = false;
        state.referral.isValid = false;
        state.referral.referrerName = null;
        state.referral.error = action.payload?.error || 'Invalid referral code';
        state.referral.checked = true;
      });
    
    // Register student
    builder
      .addCase(registerStudent.pending, (state) => {
        state.registration.loading = true;
        state.registration.error = null;
      })
      .addCase(registerStudent.fulfilled, (state, action) => {
        state.registration.loading = false;
        state.registration.success = true;
        state.registration.data = action.payload;
        state.registration.error = null;
      })
      .addCase(registerStudent.rejected, (state, action) => {
        state.registration.loading = false;
        state.registration.error = action.payload?.error || 'Registration failed';
      });
  }
});

// Export actions
export const {
  updateFormField,
  updateOTPValue,
  toggleCourseSelection,
  updateReferralCode,
  resetOTPState,
  resetForm,
  clearRegistrationSuccess,
  clearRegistrationError
} = studentRegistrationSlice.actions;

// Selectors
export const selectFormData = (state) => state.studentRegistration.formData;
export const selectOTPState = (state) => state.studentRegistration.otp;
export const selectActiveTests = (state) => state.studentRegistration.activeTests;
export const selectReferralState = (state) => state.studentRegistration.referral;
export const selectRegistrationState = (state) => state.studentRegistration.registration;
export const selectValidation = (state) => state.studentRegistration.validation;
export const selectCanSubmit = (state) => state.studentRegistration.validation.canSubmit;

// Export reducer
export default studentRegistrationSlice.reducer;