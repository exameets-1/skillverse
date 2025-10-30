/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { 
  createTestAttempt, 
  submitAnswerAttempt, 
  submitTest,
  updateLocalAnswer,
  clearTestSession,
  trackQuestionTime,
  updateSessionInfo
} from '@/store/slices/testTakingSlice';
import { Clock, ChevronRight, AlertTriangle, CheckCircle, User, Mail } from 'lucide-react';
import ExitModal from '@/components/modals/ExitModal';
import FullscreenWarningModal from '@/components/modals/FullScreenWarningModal';
import AutoSubmitModal from '@/components/modals/AutoSubmitModal';
import ResumeTestModal from '@/components/modals/ResumeTestModal';
import TabSwitchWarningModal from '@/components/modals/TabSwitchWarningModal';

interface Question {
  id: string;
  questionText: string;
  options: Array<{ text: string }>;
}

interface Course {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  totalMarks: number;
  totalQuestions: number;
  questions: Question[];
  questionsPerTest: number;
  instructions: [string];
}

interface ApiResponse {
  success: boolean;
  course: Course;
}

interface StudentInfo {
  id: string;
  name: string;
  email: string;
}

interface SavedTestState {
  courseId: string;
  studentId: string;
  courseTitle: string;
  courseDescription: string;
  durationMinutes: number;
  totalMarks: number;
  questionsPerTest: number;
  instructions: string[];
  questions: Question[];
  answers: Record<string, number>;
  currentQuestionIndex: number;
  highestReachedIndex: number;
  questionTimeSpent: number[];
  testAttemptId: string;
  sessionToken: string;
  endTime: string;
  lastUpdate: string;
}

export default function TestPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const testTakingState = useSelector((state: RootState) => state.testTaking);
  
  const [courseId, setCourseId] = useState<string | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [highestReachedIndex, setHighestReachedIndex] = useState(0);
  const [questionTimeSpent, setQuestionTimeSpent] = useState<number[]>([]);
  const [questionStartTime, setQuestionStartTime] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [testStarted, setTestStarted] = useState(false);
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [isRestoringState, setIsRestoringState] = useState(false);

  // Modal states
  const [showExitModal, setShowExitModal] = useState(false);
  const [fullscreenWarning, setFullscreenWarning] = useState(false);
  const [showAutoSubmitModal, setShowAutoSubmitModal] = useState(false);
  const [autoSubmitMessage, setAutoSubmitMessage] = useState('');
  const [fullscreenExitCount, setFullscreenExitCount] = useState(0);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showResumeExitConfirm, setShowResumeExitConfirm] = useState(false);

  const [showTabSwitchModal, setShowTabSwitchModal] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);

  const [serverEndTime, setServerEndTime] = useState<Date | null>(null);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  // Generate storage key for this specific test session
  const getTestStateKey = useCallback((studentId: string, courseId: string) => {
    return `test_state_${studentId}_${courseId}`;
  }, []);

  const handleResumeTest = () => {
  setShowResumeModal(false);
  
  // Now we have a user gesture, so fullscreen will work
  const el = document.documentElement;
  if (el.requestFullscreen && !document.fullscreenElement) {
    el.requestFullscreen().catch((err) => {
      console.error('Fullscreen failed:', err);
    });
  }
};


  // Load test state from localStorage
  const loadTestState = useCallback((): SavedTestState | null => {
    if (!studentInfo || !courseId) return null;

    const stateKey = getTestStateKey(studentInfo.id, courseId);
    try {
      const savedState = localStorage.getItem(stateKey);
      if (savedState) {
        return JSON.parse(savedState) as SavedTestState;
      }
    } catch (error) {
      // console.error('Failed to load test state:', error);
    }
    return null;
  }, [studentInfo, courseId, getTestStateKey]);

  // Clear test state from localStorage
  const clearTestState = useCallback(() => {
    if (!studentInfo || !courseId) return;

    const stateKey = getTestStateKey(studentInfo.id, courseId);
    try {
      localStorage.removeItem(stateKey);
      localStorage.removeItem('testTimerState');
    } catch (error) {
      // console.error('Failed to clear test state:', error);
    }
  }, [studentInfo, courseId, getTestStateKey]);

  // Save test state to localStorage - FIXED with proper dependencies
  const saveTestState = useCallback((partial?: Partial<SavedTestState>) => {
    if (!studentInfo || !courseId || !course) return;

    const stateKey = getTestStateKey(studentInfo.id, courseId);
    const currentState: SavedTestState = {
      courseId,
      studentId: studentInfo.id,
      courseTitle: course.title,
      courseDescription: course.description,
      durationMinutes: course.durationMinutes,
      totalMarks: course.totalMarks,
      questionsPerTest: course.questionsPerTest,
      instructions: course.instructions,
      questions: course.questions,
      answers,
      currentQuestionIndex,
      highestReachedIndex,
      questionTimeSpent,
      testAttemptId: testTakingState.testAttemptId || '',
      sessionToken: testTakingState.sessionToken || '',
      endTime: serverEndTime?.toISOString() || '',
      lastUpdate: new Date().toISOString(),
      ...partial
    };

    try {
      localStorage.setItem(stateKey, JSON.stringify(currentState));
    } catch (error) {
      // console.error('Failed to save test state:', error);
    }
  }, [studentInfo, courseId, course, answers, currentQuestionIndex, highestReachedIndex, 
      questionTimeSpent, testTakingState.testAttemptId, testTakingState.sessionToken, 
      serverEndTime, getTestStateKey]);

  // Get courseId and student info from sessionStorage
  useEffect(() => {
    const storedCourseId = sessionStorage.getItem('currentTestCourseId');
    const storedStudentInfo = sessionStorage.getItem('currentStudentInfo');
    
    if (!storedCourseId || !storedStudentInfo) {
      router.push('/test/setup');
      return;
    }
    
    setCourseId(storedCourseId);
    const student = JSON.parse(storedStudentInfo) as StudentInfo;
    setStudentInfo(student);
  }, [router]);

  

  // Restore test state on component mount (handles page reload) - FIXED
  useEffect(() => {
    if (!courseId || !studentInfo || isRestoringState) return;

    const savedState = loadTestState();
    
    if (savedState) {
      if (savedState.courseId === courseId && savedState.studentId === studentInfo.id) {
        // console.log('🔄 Restoring test state from localStorage');
        setIsRestoringState(true);
        
        const restoredCourse: Course = {
          id: savedState.courseId,
          title: savedState.courseTitle,
          description: savedState.courseDescription,
          durationMinutes: savedState.durationMinutes,
          totalMarks: savedState.totalMarks,
          totalQuestions: savedState.questions.length,
          questionsPerTest: savedState.questionsPerTest,
          instructions: savedState.instructions as [string],
          questions: savedState.questions,
        };
        
        setCourse(restoredCourse);
        setAnswers(savedState.answers);
        setCurrentQuestionIndex(savedState.currentQuestionIndex);
        setHighestReachedIndex(savedState.highestReachedIndex);
        setQuestionTimeSpent(savedState.questionTimeSpent);
        
        // ✅ Restore Redux state
        if (savedState.testAttemptId && savedState.sessionToken) {
          dispatch(updateSessionInfo({
            sessionToken: savedState.sessionToken,
            testAttemptId: savedState.testAttemptId
          }));
          
          // console.log('✅ Restored session to Redux:', {
          //   testAttemptId: savedState.testAttemptId,
          //   hasToken: !!savedState.sessionToken
          // });
        }
        
        // Restore test session
        if (savedState.endTime) {
          const endTime = new Date(savedState.endTime);
          const now = new Date();
          
          if (now < endTime) {
            setServerEndTime(endTime);
            setTestStarted(true);
            setLoading(false);
            
            // console.log('⏰ Test still active, time remaining:', Math.floor((endTime.getTime() - now.getTime()) / 1000), 'seconds');
            setShowResumeModal(true);

          } else {
            // console.log('⏱️ Test expired during absence');
            clearTestState();
            setTestSubmitted(true);
            setLoading(false);
          }
        }
        
        setIsRestoringState(false);
        return;
      }
    }
    
    setIsRestoringState(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, studentInfo, isRestoringState, dispatch]);

  // Fetch course data only if not restoring from saved state - FIXED
  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId || isRestoringState) return;
      
      const savedState = loadTestState();
      if (savedState && savedState.questions.length > 0) {
        return;
      }
      
      try {
        setLoading(true);
        const response = await fetch('/api/test/course/test-questions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ courseId }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch course data');
        }

        const data: ApiResponse = await response.json();
        
        if (data.success) {
          setCourse(data.course);
          setTimeLeft(data.course.durationMinutes * 60);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load test');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, isRestoringState]);

  // Auto-save test state whenever critical state changes - FIXED
  useEffect(() => {
    if (testStarted && !testSubmitted && course && studentInfo) {
      saveTestState();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testStarted, testSubmitted, answers, currentQuestionIndex, 
      highestReachedIndex, questionTimeSpent, saveTestState]);

  const handleExitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleSubmitTest = useCallback(async () => {
    if (testSubmitted) return;

    // Get session info from saved state if Redux doesn't have it
    const savedState = loadTestState();
    const sessionToken = testTakingState.sessionToken || savedState?.sessionToken;
    const testAttemptId = testTakingState.testAttemptId || savedState?.testAttemptId;

    // console.log('🚀 Submitting test with session:', {
    //   hasToken: !!sessionToken,
    //   hasAttemptId: !!testAttemptId,
    //   fromRedux: !!testTakingState.sessionToken,
    //   fromLocalStorage: !!savedState?.sessionToken
    // });

    // Record final question time before submitting
    if (questionStartTime && questionTimeSpent.length > 0) {
      const finalTimeSpent = Math.round((new Date().getTime() - questionStartTime.getTime()) / 1000);
      const currentQuestionId = course?.questions[currentQuestionIndex]?.id;
      
      if (currentQuestionId && sessionToken) {
        try {
          await dispatch(trackQuestionTime({
            questionId: currentQuestionId,
            timeSpent: finalTimeSpent
          })).unwrap();
        } catch (error) {
          // console.error('Failed to track final question time:', error);
        }
      }
    }

    handleExitFullscreen();
    
    // If we don't have session info in Redux but have it in localStorage,
    // we need to submit directly via API
    if (!testTakingState.sessionToken && savedState?.sessionToken && savedState?.testAttemptId) {
      // console.log('📡 Submitting via direct API call (restored session)');
      
      try {
        const response = await fetch('/api/test-taking/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${savedState.sessionToken}`,
          },
          body: JSON.stringify({
            testAttemptId: savedState.testAttemptId,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to submit test');
        }

        const result = await response.json();
        // console.log('✅ Test submitted successfully:', result);
        
        setTestSubmitted(true);
        clearTestState();
        sessionStorage.removeItem('currentTestCourseId');
        sessionStorage.removeItem('currentStudentInfo');
      } catch (error) {
        // console.error('❌ Failed to submit test:', error);
        setError(error instanceof Error ? error.message : 'Failed to submit test');
        
        // Don't clear state on error so user can retry
        alert('Failed to submit test. Please check your connection and try again.');
      }
    } else {
      // Normal Redux submission
      try {
        await dispatch(submitTest()).unwrap();
        setTestSubmitted(true);
        
        clearTestState();
        sessionStorage.removeItem('currentTestCourseId');
        sessionStorage.removeItem('currentStudentInfo');
        
      } catch (error) {
        // console.error('❌ Submit test error:', error);
        setError(error instanceof Error ? error.message : 'Failed to submit test');
        
        // Don't clear state on error
        alert('Failed to submit test. Please check your connection and try again.');
      }
    }
  }, [testSubmitted, dispatch, course, questionStartTime, questionTimeSpent, 
      currentQuestionIndex, clearTestState, testTakingState.sessionToken, 
      testTakingState.testAttemptId, loadTestState]);

  // Enhanced timer countdown with server sync
  useEffect(() => {
    if (!testStarted || testSubmitted || !serverEndTime) return;

    const updateTimer = () => {
      const now = new Date();
      const timeRemainingMs = serverEndTime.getTime() - now.getTime();
      const timeRemainingSeconds = Math.max(0, Math.floor(timeRemainingMs / 1000));
      
      setTimeLeft(timeRemainingSeconds);
      
      // Store current state in localStorage
      localStorage.setItem('testTimerState', JSON.stringify({
        endTime: serverEndTime.toISOString(),
        courseId: course?.id,
        studentId: studentInfo?.id,
        lastUpdate: now.toISOString()
      }));

      // Auto-submit when time expires
      if (timeRemainingSeconds <= 0) {
        handleSubmitTest();
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [testStarted, testSubmitted, serverEndTime, handleSubmitTest, course?.id, studentInfo?.id]);

  // Restore timer state on page load/refresh
  useEffect(() => {
    if (!course || !studentInfo) return;

    const storedTimerState = localStorage.getItem('testTimerState');
    if (storedTimerState) {
      try {
        const timerState = JSON.parse(storedTimerState);
        
        if (timerState.courseId === course.id && timerState.studentId === studentInfo.id) {
          const endTime = new Date(timerState.endTime);
          const now = new Date();
          
          if (now < endTime) {
            setServerEndTime(endTime);
            setTestStarted(true);
          } else {
            localStorage.removeItem('testTimerState');
            setTestSubmitted(true);
          }
        }
      } catch (error) {
        localStorage.removeItem('testTimerState');
      }
    }
  }, [course, studentInfo]);

  // Periodic server sync
  useEffect(() => {
    const savedState = loadTestState();
    const sessionToken = testTakingState.sessionToken || savedState?.sessionToken;
    const testAttemptId = testTakingState.testAttemptId || savedState?.testAttemptId;
    
    if (!testStarted || testSubmitted || !testAttemptId || !sessionToken) return;

    const syncWithServer = async () => {
      try {
        const response = await fetch('/api/test-taking/sync-time', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionToken}`,
          },
          body: JSON.stringify({
            testAttemptId: testAttemptId,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.endTime) {
            const newEndTime = new Date(data.endTime);
            setServerEndTime(newEndTime);
            setLastSyncTime(new Date());
            // console.log('🔄 Synced with server, time remaining:', Math.floor((newEndTime.getTime() - new Date().getTime()) / 1000), 'seconds');
          }
        }
      } catch (error) {
        // console.error('Sync error:', error);
      }
    };

    syncWithServer();
    const syncInterval = setInterval(syncWithServer, 30000);
    return () => clearInterval(syncInterval);
  }, [testStarted, testSubmitted, testTakingState.testAttemptId, testTakingState.sessionToken, loadTestState]);

  // Fallback timer
  useEffect(() => {
    if (!testStarted || testSubmitted || timeLeft <= 0 || serverEndTime) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testStarted, testSubmitted, timeLeft, handleSubmitTest, serverEndTime]);

// Back navigation + tab close handling
useEffect(() => {
  // Only handle back button when test is actively running (not during resume modal)
  if (!testStarted || testSubmitted || showResumeModal) return;

  window.history.pushState(null, '', window.location.href);

  const handlePopState = (e: PopStateEvent) => {
    e.preventDefault();
    window.history.pushState(null, '', window.location.href);
    setShowExitModal(true);
  };

  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = '';
  };

  window.addEventListener('popstate', handlePopState);
  window.addEventListener('beforeunload', handleBeforeUnload);

  return () => {
    window.removeEventListener('popstate', handlePopState);
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
}, [testStarted, testSubmitted, showResumeModal]); // Added showResumeModal
  // Fullscreen exit detection
  useEffect(() => {
    if (!testStarted || testSubmitted) return;

    const handleFullscreenChange = () => {
      const isFullscreen = !!document.fullscreenElement;
      if (!isFullscreen) {
        setFullscreenExitCount(prev => {
          const newCount = prev + 1;
          if (newCount === 1) {
            setFullscreenWarning(true);
          } else if (newCount >= 2) {
            setAutoSubmitMessage("You exited fullscreen again. The test will now be submitted.");
            setShowAutoSubmitModal(true);
            setTimeout(() => {
              handleSubmitTest();
            }, 2000);
          }
          return newCount;
        });
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [testStarted, testSubmitted, handleSubmitTest]);

  const handleStartTest = async () => {
    if (!studentInfo || !course) return;

    try {
      const result = await dispatch(createTestAttempt({
        studentId: studentInfo.id,
        testCourseId: course.id,
        durationMinutes: course.durationMinutes
      })).unwrap();

      const endTime = new Date(result.endTime);
      setServerEndTime(endTime);
      setTestStarted(true);
      
      // Save initial test state with the correct session info
      saveTestState({
        testAttemptId: result.testAttemptId || '',  // Ensure it's not undefined
        sessionToken: result.sessionToken || '',      // Ensure it's not undefined
        endTime: endTime.toISOString(),
        lastUpdate: new Date().toISOString()
      });

      // Also update Redux store directly
      dispatch(updateSessionInfo({
        sessionToken: result.sessionToken,
        testAttemptId: result.testAttemptId
      }));
      
      // Enter fullscreen
      const el = document.documentElement;
      if (el.requestFullscreen) {
        el.requestFullscreen().catch(() => {});
      }
    } catch (error) {
      setError('Failed to start test. Please try again.');
    }
  };

  // Add this effect right after the state restoration effect
  // useEffect(() => {
  //   if (!isRestoringState || testTakingState.status !== 'idle') return;

  //   const savedState = loadTestState();
  //   if (savedState?.sessionToken && savedState?.testAttemptId) {
  //     dispatch(updateSessionInfo({
  //       sessionToken: savedState.sessionToken,
  //       testAttemptId: savedState.testAttemptId
  //     }));
  //     console.log('Restored session info:', {
  //       token: savedState.sessionToken.slice(0, 10) + '...',
  //       attemptId: savedState.testAttemptId
  //     });
  //   }
  // }, [isRestoringState, testTakingState.status, dispatch, loadTestState]);

  const handleAnswerSelect = async (optionIndex: number) => {
    if (!course || testSubmitted) return;
    
    const questionId = course.questions[currentQuestionIndex].id;
    
    // Get session info from saved state if Redux doesn't have it
    const savedState = loadTestState();
    const sessionToken = testTakingState.sessionToken || savedState?.sessionToken;
    const testAttemptId = testTakingState.testAttemptId || savedState?.testAttemptId;
    
    // Update local state immediately
    dispatch(updateLocalAnswer({ questionId, optionSelected: optionIndex }));
    setAnswers(prev => {
      const updated = {
        ...prev,
        [questionId]: optionIndex
      };
      
      // Save state after answer update
      saveTestState({ answers: updated });
      return updated;
    });

    // Send to server in background only if we have valid session
    if (sessionToken && testAttemptId) {
      try {
        await dispatch(submitAnswerAttempt({
          questionId,
          optionSelected: optionIndex
        })).unwrap();
        
        // console.log('✅ Answer submitted to server');
      } catch (error) {
        // console.error('❌ Failed to submit answer:', error);
        // Store failed submission for retry
        // console.log('💾 Answer saved locally, will retry on reconnect');
      }
    } else {
      // console.warn('⚠️ No session token, answer saved locally only');
    }
  };

  useEffect(() => {
    return () => {
      if (testSubmitted) {
        clearTestState();
        dispatch(clearTestSession());
      }
    };
  }, [testSubmitted, dispatch, clearTestState]);

  // Page Visibility API - Detect tab switching
useEffect(() => {
  if (!testStarted || testSubmitted) return;

  const handleVisibilityChange = () => {
    if (document.hidden) {
      // User switched away from the tab
      console.log('⚠️ User switched away from test window');
      
      setTabSwitchCount(prev => {
        const newCount = prev + 1;
        
        if (newCount >= 3) {
          // Auto-submit after 3 violations
          setAutoSubmitMessage("You switched tabs/windows 3 times. The test is being submitted automatically.");
          setShowAutoSubmitModal(true);
          setTimeout(() => {
            handleSubmitTest();
          }, 3000);
        } else {
          // Show warning modal
          setShowTabSwitchModal(true);
        }
        
        return newCount;
      });
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);

  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
}, [testStarted, testSubmitted, handleSubmitTest]);

  // Initialize question time tracking
  useEffect(() => {
    if (testStarted && course && questionTimeSpent.length === 0) {
      setQuestionTimeSpent(new Array(course.questions.length).fill(0));
      setQuestionStartTime(new Date());
    }
  }, [testStarted, course, questionTimeSpent.length]);

  const handleNextQuestion = () => {
    if (!course) return;
    
    if (questionStartTime) {
      const timeSpent = Math.round((new Date().getTime() - questionStartTime.getTime()) / 1000);
      const currentQuestionId = course.questions[currentQuestionIndex].id;
      
      setQuestionTimeSpent(prev => {
        const updated = [...prev];
        updated[currentQuestionIndex] = timeSpent;
        return updated;
      });
      
      // Get session info from saved state if Redux doesn't have it
      const savedState = loadTestState();
      const sessionToken = testTakingState.sessionToken || savedState?.sessionToken;
      
      if (sessionToken) {
        dispatch(trackQuestionTime({
          questionId: currentQuestionId,
          timeSpent: timeSpent
        })).catch((error) => {
          // console.error('Failed to track time:', error);
        });
      }
    }
    
    if (currentQuestionIndex < course.questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setHighestReachedIndex(Math.max(highestReachedIndex, nextIndex));
      setQuestionStartTime(new Date());
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getAnsweredQuestionsCount = () => {
    return Object.keys(answers).length;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-slate-600">
            {isRestoringState ? 'Restoring your test session...' : 'Loading test...'}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-red-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Test Not Found</h1>
          <p className="text-slate-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/test/setup')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back to Tests
          </button>
        </div>
      </div>
    );
  }

  if (!course) {
    return null;
  }

// Show resume modal when restoring test
if (showResumeModal && serverEndTime) {
  const now = new Date();
  const timeRemainingMs = serverEndTime.getTime() - now.getTime();
  const timeRemainingSeconds = Math.max(0, Math.floor(timeRemainingMs / 1000));
  
  return (
    <ResumeTestModal
      timeRemaining={timeRemainingSeconds}
      onResume={handleResumeTest}
      onSubmitAndLeave={async () => {
        setShowResumeModal(false);
        setShowResumeExitConfirm(false);
        await handleSubmitTest();
        router.push('/test/setup');
      }}
      showExitConfirm={showResumeExitConfirm}
      onHideExitConfirm={() => setShowResumeExitConfirm(false)}
      onBackPressed={() => setShowResumeExitConfirm(true)}
    />
  );
}



  // Test completed screen
  if (testSubmitted) {
    return (
      <div className="min-h-screen bg-linear-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full text-center">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Test Completed!</h1>
          <p className="text-slate-600 mb-6">
            You have successfully submitted your test. Your answers have been recorded.
          </p>
          <div className="bg-slate-50 rounded-xl p-4 mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-500">Questions Answered:</span>
                <p className="font-semibold text-slate-900">{getAnsweredQuestionsCount()} / {course.questionsPerTest}</p>
              </div>
              <div>
                <span className="text-slate-500">Total Marks:</span>
                <p className="font-semibold text-slate-900">{course.totalMarks}</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => router.push('/test/setup')}
            className="px-8 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium"
          >
            Back to Tests
          </button>
        </div>
      </div>
    );
  }

  // Pre-test instructions
  if (!testStarted) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-100 via-white to-slate-50 flex items-center justify-center px-6 py-12">
        <div className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] max-w-3xl w-full p-10">
          
          {studentInfo && (
            <div className="border border-slate-200 rounded-xl p-6 mb-8 bg-linear-to-r from-slate-50 to-indigo-50">
              <h2 className="text-xl font-semibold text-slate-900 mb-4 border-b border-slate-200 pb-2">
                Test Taker Information
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-slate-500">Name</p>
                  <p className="text-base font-medium text-slate-900">{studentInfo.name}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="text-base font-medium text-slate-900">{studentInfo.email}</p>
                </div>
              </div>
            </div>
          )}

          <div className="mb-10">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{course?.title}</h1>
            <p className="text-slate-600 mt-2">{course?.description}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            <div className="border border-indigo-100 bg-linear-to-br from-indigo-50 to-white rounded-xl p-6 hover:shadow-md transition-all">
              <Clock className="w-7 h-7 text-indigo-600 mb-3" />
              <h3 className="font-semibold text-slate-900 mb-1">Duration</h3>
              <p className="text-slate-600">{course.durationMinutes} minutes</p>
            </div>
            <div className="border border-emerald-100 bg-linear-to-br from-emerald-50 to-white rounded-xl p-6 hover:shadow-md transition-all">
              <CheckCircle className="w-7 h-7 text-emerald-600 mb-3" />
              <h3 className="font-semibold text-slate-900 mb-1">Questions</h3>
              <p className="text-slate-600">
                {course.questionsPerTest} questions ({course.totalMarks} marks)
              </p>
            </div>
          </div>

          <div className="border border-amber-200 bg-linear-to-br from-amber-50 to-white rounded-xl p-6 mb-10">
            <h4 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              Important Instructions
            </h4>
            <ul className="text-sm text-amber-800 space-y-1 leading-relaxed">
              {course.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ul>
          </div>

          {testTakingState.status === 'error' && testTakingState.error && (
            <div className="border border-red-200 bg-red-50 rounded-xl p-4 mb-8">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <p className="text-red-700 font-medium">{testTakingState.error}</p>
              </div>
            </div>
          )}

          <button
            onClick={handleStartTest}
            disabled={testTakingState.status === 'loading'}
            className="w-full py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {testTakingState.status === 'loading' ? 'Starting Test...' : 'Start Test'}
          </button>
        </div>
      </div>
    );
  }

  // Test interface
  if (testStarted && course) {
    const currentQuestion = course.questions[currentQuestionIndex];
    const selectedAnswer = answers[currentQuestion.id];

    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-indigo-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            {studentInfo && (
              <div className="bg-linear-to-r from-indigo-50 to-purple-50 rounded-lg p-3 mb-4 border border-indigo-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-indigo-600" />
                      <span className="font-semibold text-slate-900">{studentInfo.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-purple-600" />
                      <span className="text-slate-600">{studentInfo.email}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-slate-500">ID: {studentInfo.id}</div>
                    {testTakingState.status === 'in_progress' && (
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-600 font-medium">LIVE</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-slate-900">{course?.title}</h1>
                <p className="text-sm text-slate-500">Question {currentQuestionIndex + 1} of {course?.questionsPerTest}</p>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-slate-500">Time Remaining</p>
                    {lastSyncTime && (
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" title="Synced with server"></div>
                    )}
                  </div>
                  <p className={`text-lg font-bold ${timeLeft < 300 ? 'text-red-600' : 'text-slate-900'}`}>
                    {formatTime(timeLeft)}
                  </p>
                  {timeLeft < 300 && (
                    <p className="text-xs text-red-500">Time running out!</p>
                  )}
                </div>
                
                <div className="text-right">
                  <p className="text-sm text-slate-500">Answered</p>
                  <p className="text-lg font-bold text-slate-900">
                    {getAnsweredQuestionsCount()} / {course?.questionsPerTest}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-6">
          {/* Reload indicator */}
          {isRestoringState && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-blue-700 font-medium">Restoring your test session...</p>
              </div>
            </div>
          )}

          {/* Question Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                  Q{currentQuestionIndex + 1}
                </span>
                {selectedAnswer !== undefined && (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    Answered
                  </span>
                )}
                {testTakingState.status === 'submitting' && (
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                    Submitting...
                  </span>
                )}
              </div>
              <h2 className="text-xl font-semibold text-slate-900 leading-relaxed">
                {currentQuestion.questionText}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option: { text: string }, index: number) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={testTakingState.status === 'submitting'}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                    selectedAnswer === index
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-900'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === index
                        ? 'border-indigo-500 bg-indigo-500'
                        : 'border-slate-300'
                    }`}>
                      {selectedAnswer === index && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className={`font-medium ${
                      selectedAnswer === index ? 'text-indigo-900' : 'text-slate-700'
                    }`}>
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <span className={selectedAnswer === index ? 'text-indigo-900' : 'text-slate-700'}>
                      {option.text}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <div></div>

            <div className="flex items-center gap-4">
              {currentQuestionIndex === course.questions.length - 1 ? (
                <button
                  onClick={handleSubmitTest}
                  disabled={testTakingState.status === 'submitting'}
                  className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {testTakingState.status === 'submitting' ? 'Submitting...' : 'Submit Test'}
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  disabled={testTakingState.status === 'submitting'}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Question Navigator */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Question Status</h3>
            <div className="mb-4 flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-indigo-600 rounded"></div>
                <span className="text-slate-600">Current</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-slate-600">Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-slate-600">Visited (Not Answered)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-slate-200 border border-slate-300 rounded"></div>
                <span className="text-slate-600">Not Visited</span>
              </div>
            </div>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {course.questions.map((_, index) => {
                const isAnswered = answers[course.questions[index].id] !== undefined;
                const isCurrent = index === currentQuestionIndex;
                const isVisited = index <= highestReachedIndex;
                
                let className = 'w-10 h-10 rounded-lg font-medium text-sm cursor-default ';
                
                if (isCurrent) {
                  className += 'bg-indigo-600 text-white';
                } else if (isAnswered) {
                  className += 'bg-green-500 text-white';
                } else if (isVisited) {
                  className += 'bg-red-500 text-white';
                } else {
                  className += 'bg-slate-200 text-slate-600 border border-slate-300';
                }

                return (
                  <div
                    key={index}
                    className={className}
                    title={
                      isCurrent ? 'Current Question' :
                      isAnswered ? 'Answered' :
                      isVisited ? 'Visited (Not Answered)' :
                      'Not Visited'
                    }
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      {index + 1}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modals */}
        {showExitModal && (
          <ExitModal
            onSubmitAndLeave={() => {
              setShowExitModal(false);
              handleSubmitTest();
              router.push('/test/setup');
            }}
            onStay={() => setShowExitModal(false)}
          />
        )}

        {fullscreenWarning && (
  <FullscreenWarningModal
    onReenterFullscreen={() => {
      setFullscreenWarning(false);
      document.documentElement.requestFullscreen().catch(() => {});
    }}
    onSubmitAndLeave={async () => {
      setFullscreenWarning(false);
      await handleSubmitTest();
      router.push('/test/setup');
    }}
  />
)}

        {showAutoSubmitModal && (
          <AutoSubmitModal message={autoSubmitMessage} />
        )}

        {showTabSwitchModal && (
  <TabSwitchWarningModal
    warningCount={tabSwitchCount}
    onReturn={() => setShowTabSwitchModal(false)}
    onSubmitAndLeave={async () => {
      setShowTabSwitchModal(false);
      await handleSubmitTest();
      router.push('/test/setup');
    }}
  />
)}
      </div>
    );
  }

  return null;
}