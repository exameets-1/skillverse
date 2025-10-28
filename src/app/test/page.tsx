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
  trackQuestionTime
} from '@/store/slices/testTakingSlice';
import { Clock, ChevronRight, AlertTriangle, CheckCircle, User, Mail } from 'lucide-react';
import ExitModal from '@/components/modals/ExitModal';
import FullscreenWarningModal from '@/components/modals/FullScreenWarningModal';
import AutoSubmitModal from '@/components/modals/AutoSubmitModal';

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
  // Add state to track highest reached question
  const [highestReachedIndex, setHighestReachedIndex] = useState(0);
  // Add time tracking for each question
  const [questionTimeSpent, setQuestionTimeSpent] = useState<number[]>([]);
  const [questionStartTime, setQuestionStartTime] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [testStarted, setTestStarted] = useState(false);
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);

  // Modal states
  const [showExitModal, setShowExitModal] = useState(false);
  const [fullscreenWarning, setFullscreenWarning] = useState(false);
  const [showAutoSubmitModal, setShowAutoSubmitModal] = useState(false);
  const [autoSubmitMessage, setAutoSubmitMessage] = useState('');
  const [fullscreenExitCount, setFullscreenExitCount] = useState(0);

  // Add new state for server sync
  const [serverEndTime, setServerEndTime] = useState<Date | null>(null);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  // Get courseId and student info from sessionStorage
  useEffect(() => {
    const storedCourseId = sessionStorage.getItem('currentTestCourseId');
    const storedStudentInfo = sessionStorage.getItem('currentStudentInfo');
    
    if (!storedCourseId || !storedStudentInfo) {
      router.push('/test-setup');
      return;
    }
    
    setCourseId(storedCourseId);
    const student = JSON.parse(storedStudentInfo) as StudentInfo;
    setStudentInfo(student);
    
    // Log who is accessing the test
    // console.log('=== TEST ACCESS ===');
    // console.log('Student ID:', student.id);
    // console.log('Student Name:', student.name);
    // console.log('Student Email:', student.email);
    // console.log('Course ID:', storedCourseId);
    // console.log('Timestamp:', new Date().toISOString());
    // console.log('==================');
  }, [router]);

  // Fetch course data
  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) return;
      
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
  }, [courseId]);

  const handleExitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Move handleSubmitTest BEFORE the useEffects that use it
  const handleSubmitTest = useCallback(async () => {
    if (testSubmitted) return;

    // Record final question time before submitting
    if (questionStartTime && questionTimeSpent.length > 0) {
      const finalTimeSpent = Math.round((new Date().getTime() - questionStartTime.getTime()) / 1000);
      const currentQuestionId = course?.questions[currentQuestionIndex]?.id;
      
      // Log the final question time immediately
      if (currentQuestionId) {
        // console.log('=== FINAL QUESTION COMPLETED ===');
        // console.log('Question ID:', currentQuestionId);
        // console.log('Question Number:', currentQuestionIndex + 1);
        // console.log('Time Spent:', finalTimeSpent, 'seconds');
        // console.log('Time in Minutes:', Math.round(finalTimeSpent/60*100)/100, 'minutes');
        // console.log('Student:', studentInfo?.name);
        // console.log('Timestamp:', new Date().toISOString());
        // console.log('==============================');

        // Send final question time tracking to server
        try {
          await dispatch(trackQuestionTime({
            questionId: currentQuestionId,
            timeSpent: finalTimeSpent
          })).unwrap();
        } catch (error) {
          //console.error('Failed to track final question time:', error);
          // Don't block submission if time tracking fails
        }
      }
      
      const finalTimeArray = [...questionTimeSpent];
      finalTimeArray[currentQuestionIndex] = finalTimeSpent;
      
      // console.log('=== FINAL TIME TRACKING SUMMARY ===');
      // console.log('Student:', studentInfo?.name);
      // console.log('Course:', course?.title);
      
      // Only show summary for visited questions
      finalTimeArray.forEach((time, index) => {
        if (index <= highestReachedIndex || index === currentQuestionIndex) {
          const questionId = course?.questions[index]?.id;
          //console.log(`Q${index + 1} (ID: ${questionId}): ${time}s (${Math.round(time/60*100)/100}m)`);
        }
      });
      
      // Calculate total time only for visited questions
      const visitedQuestionsTimes = finalTimeArray.slice(0, Math.max(highestReachedIndex + 1, currentQuestionIndex + 1));
      const totalTimeOnVisitedQuestions = visitedQuestionsTimes.reduce((a, b) => a + b, 0);
      
      // console.log('Total Time on Visited Questions:', totalTimeOnVisitedQuestions, 'seconds');
      // console.log('Questions Visited:', Math.max(highestReachedIndex + 1, currentQuestionIndex + 1));
      // console.log('Average Time per Visited Question:', Math.round(totalTimeOnVisitedQuestions / Math.max(highestReachedIndex + 1, currentQuestionIndex + 1)), 'seconds');
      // console.log('Questions Answered:', Object.keys(answers).length, '/', course?.totalQuestions);
      // console.log('================================');
    }

    handleExitFullscreen();
    
    try {
      await dispatch(submitTest()).unwrap();
      setTestSubmitted(true);
      
      // Clear timer state from localStorage
      localStorage.removeItem('testTimerState');
      sessionStorage.removeItem('currentTestCourseId');
      sessionStorage.removeItem('currentStudentInfo');
      
      if (studentInfo && course) {
        // console.log('=== TEST SUBMITTED SUCCESSFULLY ===');
        // console.log('Student ID:', studentInfo.id);
        // console.log('Student Name:', studentInfo.name);
        // console.log('Student Email:', studentInfo.email);
        // console.log('Course:', course.title);
        // console.log('Total Answers:', Object.keys(answers).length);
        // console.log('Submit Time:', new Date().toISOString());
        // console.log('Final Answers:', answers);
        // console.log('==================');
      }
    } catch (error) {
      //console.error('Failed to submit test:', error);
      //alert('Failed to submit test. Please try again.');
    }
  }, [testSubmitted, dispatch, studentInfo, course, questionStartTime, questionTimeSpent, currentQuestionIndex, highestReachedIndex]);

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

    // Update immediately
    updateTimer();

    // Set up interval for continuous updates
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
        
        // Verify this is the same test session
        if (timerState.courseId === course.id && timerState.studentId === studentInfo.id) {
          const endTime = new Date(timerState.endTime);
          const now = new Date();
          
          // Check if test should still be running
          if (now < endTime) {
            setServerEndTime(endTime);
            setTestStarted(true);
            
            // console.log('=== TIMER RESTORED ===');
            // console.log('End Time:', endTime.toISOString());
            // console.log('Current Time:', now.toISOString());
            // console.log('Remaining:', Math.floor((endTime.getTime() - now.getTime()) / 1000), 'seconds');
            // console.log('====================');
          } else {
            // Test time has expired, should auto-submit
            localStorage.removeItem('testTimerState');
            setTestSubmitted(true);
            // console.log('Test time expired during absence');
          }
        }
      } catch (error) {
        //console.error('Error restoring timer state:', error);
        localStorage.removeItem('testTimerState');
      }
    }
  }, [course, studentInfo]);

  // Periodic server sync to account for clock drift
  useEffect(() => {
    if (!testStarted || testSubmitted || !testTakingState.testAttemptId) return;

    const syncWithServer = async () => {
      try {
        // Call a server endpoint to get current test status and remaining time
        const response = await fetch('/api/test-taking/sync-time', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${testTakingState.sessionToken}`,
          },
          body: JSON.stringify({
            testAttemptId: testTakingState.testAttemptId,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.endTime) {
            const newEndTime = new Date(data.endTime);
            setServerEndTime(newEndTime);
            setLastSyncTime(new Date());
            
            // console.log('=== TIMER SYNCED ===');
            // console.log('Server End Time:', newEndTime.toISOString());
            // console.log('Server Remaining:', data.timeRemaining, 'seconds');
            // console.log('==================');
          }
        }
      } catch (error) {
        //console.error('Failed to sync with server:', error);
      }
    };

    // Sync immediately when test starts
    syncWithServer();

    // Set up periodic sync every 30 seconds
    const syncInterval = setInterval(syncWithServer, 30000);

    return () => clearInterval(syncInterval);
  }, [testStarted, testSubmitted, testTakingState.testAttemptId, testTakingState.sessionToken]);

  // Timer countdown (fallback for when server sync is not available)
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

  // Back navigation + tab close handling (APP ROUTER VERSION)
  useEffect(() => {
    if (!testStarted || testSubmitted) return;

    // Push a dummy state to history when test starts
    window.history.pushState(null, '', window.location.href);

    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault();
      // Push state again to prevent actual navigation
      window.history.pushState(null, '', window.location.href);
      // Show exit modal
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
  }, [testStarted, testSubmitted]);

  // Detect fullscreen exit (anti-cheating)
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

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [testStarted, testSubmitted, handleSubmitTest]);

  const handleStartTest = async () => {
    if (!studentInfo || !course) return;

    try {
      // Create test attempt and get session token
      const result = await dispatch(createTestAttempt({
        studentId: studentInfo.id,
        testCourseId: course.id,
        durationMinutes: course.durationMinutes
      })).unwrap();

      // Set server end time from the response
      const endTime = new Date(result.endTime);
      setServerEndTime(endTime);
      setTestStarted(true);
      
      // Store initial timer state
      localStorage.setItem('testTimerState', JSON.stringify({
        endTime: endTime.toISOString(),
        courseId: course.id,
        studentId: studentInfo.id,
        lastUpdate: new Date().toISOString()
      }));
      
      // console.log('=== TEST STARTED ===');
      // console.log('Student:', studentInfo.name);
      // console.log('Email:', studentInfo.email);
      // console.log('Course:', course.title);
      // console.log('Session Token Created');
      // console.log('Test Attempt ID:', result.testAttemptId);
      // console.log('Start Time:', result.startTime);
      // console.log('End Time:', result.endTime);
      // console.log('==================');
      
      // Enter fullscreen
      const el = document.documentElement;
      if (el.requestFullscreen) {
        el.requestFullscreen().catch(() => {});
      }
    } catch (error) {
      //console.error('Failed to start test:', error);
      setError('Failed to start test. Please try again.');
    }
  };

  const handleAnswerSelect = async (optionIndex: number) => {
    if (!course || testSubmitted) return;
    
    const questionId = course.questions[currentQuestionIndex].id;
    
    // Update local state immediately for UI responsiveness
    dispatch(updateLocalAnswer({ questionId, optionSelected: optionIndex }));
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));

    // Send to server in background
    try {
      await dispatch(submitAnswerAttempt({
        questionId,
        optionSelected: optionIndex
      })).unwrap();

      if (studentInfo) {
        // console.log('=== ANSWER SAVED ===');
        // console.log('Student:', studentInfo.name);
        // console.log('Question ID:', questionId);
        // console.log('Question Number:', currentQuestionIndex + 1);
        // console.log('Selected Option:', optionIndex);
        // console.log('Timestamp:', new Date().toISOString());
        // console.log('==================');
      }
    } catch (error) {
      //console.error('Failed to save answer:', error);
      // Answer is still saved locally, user can continue
    }
  };

  // Add cleanup on unmount - clear timer state if test is submitted
  useEffect(() => {
    return () => {
      if (testSubmitted) {
        localStorage.removeItem('testTimerState');
        dispatch(clearTestSession());
      }
    };
  }, [testSubmitted, dispatch]);

  // Initialize question time tracking when test starts
  useEffect(() => {
    if (testStarted && course && questionTimeSpent.length === 0) {
      // Initialize array with zeros for each question
      setQuestionTimeSpent(new Array(course.questions.length).fill(0));
      setQuestionStartTime(new Date());
      
      // console.log('=== TIME TRACKING INITIALIZED ===');
      // console.log('Total Questions:', course.questions.length);
      // console.log('Starting Question 1');
      // console.log('================================');
    }
  }, [testStarted, course, questionTimeSpent.length]);

  const handleNextQuestion = () => {
    if (!course) return;
    
    // Record time spent on current question before moving
    if (questionStartTime) {
      const timeSpent = Math.round((new Date().getTime() - questionStartTime.getTime()) / 1000);
      const currentQuestionId = course.questions[currentQuestionIndex].id;
      
      setQuestionTimeSpent(prev => {
        const updated = [...prev];
        updated[currentQuestionIndex] = timeSpent;
        
        // Log individual question time immediately
        // console.log('=== QUESTION COMPLETED ===');
        // console.log('Question ID:', currentQuestionId);
        // console.log('Question Number:', currentQuestionIndex + 1);
        // console.log('Time Spent:', timeSpent, 'seconds');
        // console.log('Time in Minutes:', Math.round(timeSpent/60*100)/100, 'minutes');
        // console.log('Student:', studentInfo?.name);
        // console.log('Timestamp:', new Date().toISOString());
        // console.log('========================');
        
        return updated;
      });

      // Send time tracking data to server
      dispatch(trackQuestionTime({
        questionId: currentQuestionId,
        timeSpent: timeSpent
      })).catch((error) => {
        //console.error('Failed to track question time:', error);
        // Don't block navigation if time tracking fails
      });
    }
    
    if (currentQuestionIndex < course.questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      // Update highest reached index
      setHighestReachedIndex(Math.max(highestReachedIndex, nextIndex));
      // Reset start time for next question
      setQuestionStartTime(new Date());
      
      //console.log(`=== MOVED TO QUESTION ${nextIndex + 1} ===`);
    }
  };

  // Remove this functionality - no backward navigation allowed
  const handlePreviousQuestion = () => {
    // Remove this functionality - no backward navigation allowed
    return;
  };

  // Enhanced time formatting with better precision
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
          <p className="text-lg text-slate-600">Loading test...</p>
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
            onClick={() => router.push('/test-setup')}
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
                <p className="font-semibold text-slate-900">{getAnsweredQuestionsCount()} / {course.totalQuestions}</p>
              </div>
              <div>
                <span className="text-slate-500">Total Marks:</span>
                <p className="font-semibold text-slate-900">{course.totalMarks}</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => router.push('/test-setup')}
            className="px-8 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium"
          >
            Back to Tests
          </button>
        </div>
      </div>
    );
  }

  // Pre-test screen
  if (!testStarted) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
          {/* Student Information Header */}
          {studentInfo && (
            <div className="bg-linear-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 mb-8 border border-indigo-200">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-indigo-600" />
                Test Taker Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Name</p>
                    <p className="font-semibold text-slate-900">{studentInfo.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <p className="font-semibold text-slate-900">{studentInfo.email}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <h1 className="text-3xl font-bold text-slate-900 mb-2">{course?.title}</h1>
          <p className="text-slate-600 mb-8">{course?.description}</p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-linear-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
              <Clock className="w-8 h-8 text-indigo-600 mb-3" />
              <h3 className="font-semibold text-slate-900 mb-1">Duration</h3>
              <p className="text-slate-600">{course.durationMinutes} minutes</p>
            </div>

            <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-xl p-6">
              <CheckCircle className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-semibold text-slate-900 mb-1">Questions</h3>
              <p className="text-slate-600">{course.totalQuestions} questions ({course.totalMarks} marks)</p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
            <AlertTriangle className="w-6 h-6 text-amber-600 mb-2" />
            <h4 className="font-semibold text-amber-900 mb-2">Important Instructions:</h4>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>• Once started, the timer cannot be paused</li>
              <li>• You can navigate between questions freely</li>
              <li>• Test will auto-submit when time expires</li>
              <li>• Timer syncs with server to prevent manipulation</li>
              <li>• Make sure you have a stable internet connection</li>
              <li>• Do not exit fullscreen mode during the test</li>
            </ul>
          </div>

          {/* Show timer restoration notice if applicable */}
          {localStorage.getItem('testTimerState') && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <p className="text-blue-700 font-medium">Previous test session detected. Timer will be restored automatically.</p>
              </div>
            </div>
          )}

          {/* Show test taking status if there's an error */}
          {testTakingState.status === 'error' && testTakingState.error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <p className="text-red-700 font-medium">{testTakingState.error}</p>
              </div>
            </div>
          )}

          <button
            onClick={handleStartTest}
            disabled={testTakingState.status === 'loading'}
            className="w-full py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {testTakingState.status === 'loading' ? 'Starting Test...' : 'Start Test'}
          </button>
        </div>
      </div>
    );
  }

  // Test interface with enhanced timer display
  if (testStarted && course) {
    const currentQuestion = course.questions[currentQuestionIndex];
    const selectedAnswer = answers[currentQuestion.id];

    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-indigo-50">
        {/* Header with enhanced timer */}
        <div className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            {/* Student Info Bar */}
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
                <p className="text-sm text-slate-500">Question {currentQuestionIndex + 1} of {course?.totalQuestions}</p>
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
                    {getAnsweredQuestionsCount()} / {course?.totalQuestions}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-6">
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

          {/* Question Navigator - Visual Only */}
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
              router.push('/test-setup');
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
          />
        )}

        {showAutoSubmitModal && (
          <AutoSubmitModal message={autoSubmitMessage} />
        )}
      </div>
    );
  }

  return null;
}
