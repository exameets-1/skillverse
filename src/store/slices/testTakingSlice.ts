/* eslint-disable @typescript-eslint/no-unused-vars */
// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// interface AnswerAttempt {
//   questionId: string;
//   optionSelected: number;
// }

// interface TestTakingState {
//   sessionToken: string | null;
//   testAttemptId: string | null;
//   studentId: string | null;
//   testCourseId: string | null;
//   status: 'idle' | 'loading' | 'in_progress' | 'submitting' | 'submitted' | 'error';
//   error: string | null;
//   answerAttempts: Record<string, number>; // questionId -> optionIndex
//   startTime: string | null;
//   endTime: string | null;
// }

// const initialState: TestTakingState = {
//   sessionToken: null,
//   testAttemptId: null,
//   studentId: null,
//   testCourseId: null,
//   status: 'idle',
//   error: null,
//   answerAttempts: {},
//   startTime: null,
//   endTime: null,
// };

// // Create test attempt and get session token
// export const createTestAttempt = createAsyncThunk(
//   'testTaking/create',
//   async (payload: { studentId: string; testCourseId: string; durationMinutes: number }, { rejectWithValue }) => {
//     try {
//       const response = await fetch('/api/test-taking/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         const error = await response.json();
//         return rejectWithValue(error.error || 'Failed to create test attempt');
//       }

//       const data = await response.json();
//       return data;
//     } catch (error) {
//       return rejectWithValue('Network error. Please check your connection.');
//     }
//   }
// );

// // Submit answer attempt
// export const submitAnswerAttempt = createAsyncThunk(
//   'testTaking/attemptAnswer',
//   async (
//     payload: { questionId: string; optionSelected: number },
//     { getState, rejectWithValue }
//   ) => {
//     try {
//       const state = getState() as { testTaking: TestTakingState };
//       const { sessionToken, testAttemptId } = state.testTaking;

//       if (!sessionToken || !testAttemptId) {
//         return rejectWithValue('Session not found. Please restart the test.');
//       }

//       const response = await fetch('/api/test-taking/attempt-answer', {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${sessionToken}`,
//         },
//         body: JSON.stringify({
//           testAttemptId,
//           questionId: payload.questionId,
//           optionSelected: payload.optionSelected,
//         }),
//       });

//       if (!response.ok) {
//         const error = await response.json();
//         return rejectWithValue(error.error || 'Failed to save answer');
//       }

//       const data = await response.json();
//       return { ...data, ...payload };
//     } catch (error) {
//       return rejectWithValue('Network error. Answer not saved.');
//     }
//   }
// );

// // Submit test
// export const submitTest = createAsyncThunk(
//   'testTaking/submit',
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const state = getState() as { testTaking: TestTakingState };
//       const { sessionToken, testAttemptId } = state.testTaking;

//       if (!sessionToken || !testAttemptId) {
//         return rejectWithValue('Session not found. Please restart the test.');
//       }

//       const response = await fetch('/api/test-taking/submit', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${sessionToken}`,
//         },
//         body: JSON.stringify({ testAttemptId }),
//       });

//       if (!response.ok) {
//         const error = await response.json();
//         return rejectWithValue(error.error || 'Failed to submit test');
//       }

//       const data = await response.json();
//       return data;
//     } catch (error) {
//       return rejectWithValue('Network error. Test submission failed.');
//     }
//   }
// );

// const testTakingSlice = createSlice({
//   name: 'testTaking',
//   initialState,
//   reducers: {
//     // Local answer update (optimistic)
//     updateLocalAnswer: (state, action: PayloadAction<{ questionId: string; optionSelected: number }>) => {
//       state.answerAttempts[action.payload.questionId] = action.payload.optionSelected;
//     },
//     // Clear test session
//     clearTestSession: (state) => {
//       state.sessionToken = null;
//       state.testAttemptId = null;
//       state.studentId = null;
//       state.testCourseId = null;
//       state.status = 'idle';
//       state.error = null;
//       state.answerAttempts = {};
//       state.startTime = null;
//       state.endTime = null;
//     },
//     // Set error
//     setError: (state, action: PayloadAction<string>) => {
//       state.error = action.payload;
//       state.status = 'error';
//     },
//   },
//   extraReducers: (builder) => {
//     // Create test attempt
//     builder
//       .addCase(createTestAttempt.pending, (state) => {
//         state.status = 'loading';
//         state.error = null;
//       })
//       .addCase(createTestAttempt.fulfilled, (state, action) => {
//         state.status = 'in_progress';
//         state.sessionToken = action.payload.sessionToken;
//         state.testAttemptId = action.payload.testAttemptId;
//         state.studentId = action.payload.studentId;
//         state.testCourseId = action.payload.testCourseId;
//         state.startTime = action.payload.startTime;
//         state.endTime = action.payload.endTime;
//         state.error = null;
//       })
//       .addCase(createTestAttempt.rejected, (state, action) => {
//         state.status = 'error';
//         state.error = action.payload as string;
//       });

//     // Submit answer attempt
//     builder
//       .addCase(submitAnswerAttempt.fulfilled, (state, action) => {
//         state.answerAttempts[action.payload.questionId] = action.payload.optionSelected;
//       })
//       .addCase(submitAnswerAttempt.rejected, (state, action) => {
//         console.error('Answer save failed:', action.payload);
//         // Don't change status to error - just log it
//       });

//     // Submit test
//     builder
//       .addCase(submitTest.pending, (state) => {
//         state.status = 'submitting';
//         state.error = null;
//       })
//       .addCase(submitTest.fulfilled, (state) => {
//         state.status = 'submitted';
//         state.error = null;
//       })
//       .addCase(submitTest.rejected, (state, action) => {
//         state.status = 'error';
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { updateLocalAnswer, clearTestSession, setError } = testTakingSlice.actions;
// export default testTakingSlice.reducer;


import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface AnswerAttempt {
  questionId: string;
  optionSelected: number;
}

interface TestTakingState {
  sessionToken: string | null;
  testAttemptId: string | null;
  studentId: string | null;
  testCourseId: string | null;
  status: 'idle' | 'loading' | 'in_progress' | 'submitting' | 'submitted' | 'error';
  error: string | null;
  answerAttempts: Record<string, number>; // questionId -> optionIndex
  startTime: string | null;
  endTime: string | null;
}

const initialState: TestTakingState = {
  sessionToken: null,
  testAttemptId: null,
  studentId: null,
  testCourseId: null,
  status: 'idle',
  error: null,
  answerAttempts: {},
  startTime: null,
  endTime: null,
};

// Create test attempt and get session token
export const createTestAttempt = createAsyncThunk(
  'testTaking/create',
  async (payload: { studentId: string; testCourseId: string; durationMinutes: number }, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/test-taking/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.error || 'Failed to create test attempt');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('Network error. Please check your connection.');
    }
  }
);

// Submit answer attempt
export const submitAnswerAttempt = createAsyncThunk(
  'testTaking/attemptAnswer',
  async (
    payload: { questionId: string; optionSelected: number },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as { testTaking: TestTakingState };
      const { sessionToken, testAttemptId } = state.testTaking;

      if (!sessionToken || !testAttemptId) {
        return rejectWithValue('Session not found. Please restart the test.');
      }

      const response = await fetch('/api/test-taking/attempt-answer', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`,
        },
        body: JSON.stringify({
          testAttemptId,
          questionId: payload.questionId,
          optionSelected: payload.optionSelected,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.error || 'Failed to save answer');
      }

      const data = await response.json();
      return { ...data, ...payload };
    } catch (error) {
      return rejectWithValue('Network error. Answer not saved.');
    }
  }
);

// Track question time
export const trackQuestionTime = createAsyncThunk(
  'testTaking/trackTime',
  async (
    payload: { questionId: string; timeSpent: number },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as { testTaking: TestTakingState };
      const { sessionToken, testAttemptId } = state.testTaking;

      if (!sessionToken || !testAttemptId) {
        return rejectWithValue('Session not found. Please restart the test.');
      }

      const response = await fetch('/api/test-taking/question-time', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`,
        },
        body: JSON.stringify({
          testAttemptId,
          questionId: payload.questionId,
          timeSpent: payload.timeSpent,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.error || 'Failed to track time');
      }

      const data = await response.json();
      return { ...data, ...payload };
    } catch (error) {
      return rejectWithValue('Network error. Time tracking failed.');
    }
  }
);

// Submit test
export const submitTest = createAsyncThunk(
  'testTaking/submit',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { testTaking: TestTakingState };
      const { sessionToken, testAttemptId } = state.testTaking;

      if (!sessionToken || !testAttemptId) {
        return rejectWithValue('Session not found. Please restart the test.');
      }

      const response = await fetch('/api/test-taking/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`,
        },
        body: JSON.stringify({ testAttemptId }),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.error || 'Failed to submit test');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('Network error. Test submission failed.');
    }
  }
);

const testTakingSlice = createSlice({
  name: 'testTaking',
  initialState,
  reducers: {
    // Local answer update (optimistic)
    updateLocalAnswer: (state, action: PayloadAction<{ questionId: string; optionSelected: number }>) => {
      state.answerAttempts[action.payload.questionId] = action.payload.optionSelected;
    },
    // Clear test session
    clearTestSession: (state) => {
      state.sessionToken = null;
      state.testAttemptId = null;
      state.studentId = null;
      state.testCourseId = null;
      state.status = 'idle';
      state.error = null;
      state.answerAttempts = {};
      state.startTime = null;
      state.endTime = null;
    },
    // Set error
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.status = 'error';
    },
  },
  extraReducers: (builder) => {
    // Create test attempt
    builder
      .addCase(createTestAttempt.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createTestAttempt.fulfilled, (state, action) => {
        state.status = 'in_progress';
        state.sessionToken = action.payload.sessionToken;
        state.testAttemptId = action.payload.testAttemptId;
        state.studentId = action.payload.studentId;
        state.testCourseId = action.payload.testCourseId;
        state.startTime = action.payload.startTime;
        state.endTime = action.payload.endTime;
        state.error = null;
      })
      .addCase(createTestAttempt.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload as string;
      });

    // Submit answer attempt
    builder
      .addCase(submitAnswerAttempt.fulfilled, (state, action) => {
        state.answerAttempts[action.payload.questionId] = action.payload.optionSelected;
      })
      .addCase(submitAnswerAttempt.rejected, (state, action) => {
        //console.error('Answer save failed:', action.payload);
        // Don't change status to error - just log it
      });

    // Track question time
    builder
      .addCase(trackQuestionTime.fulfilled, (state, action) => {
        // Silently track time - no state changes needed
        //console.log('Time tracked:', action.payload.questionId, action.payload.timeSpent, 'seconds');
      })
      .addCase(trackQuestionTime.rejected, (state, action) => {
//console.error('Time tracking failed:', action.payload);
        // Don't change status to error - just log it
      });

    // Submit test
    builder
      .addCase(submitTest.pending, (state) => {
        state.status = 'submitting';
        state.error = null;
      })
      .addCase(submitTest.fulfilled, (state) => {
        state.status = 'submitted';
        state.error = null;
      })
      .addCase(submitTest.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload as string;
      });
  },
});

export const { updateLocalAnswer, clearTestSession, setError } = testTakingSlice.actions;
export default testTakingSlice.reducer;