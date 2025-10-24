'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store/store';
import {
  sendTestOTP,
  verifyTestOTP,
  setEmail,
  resetOTPState,
  resetBeforeTest,
  decrementRetryTimer,
} from '@/store/slices/beforeTestSlice';
import { useRouter } from 'next/navigation';
import { Mail, Lock, CheckCircle, Clock, BookOpen, Award, Sparkles, ChevronRight, AlertCircle } from 'lucide-react';

// Define interfaces for better type safety
interface Course {
  testCourseId: string;
  title: string;
  description: string;
  durationMinutes: number;
  totalMarks: number;
  status: 'not_started' | 'in_progress' | 'submitted' | 'auto_submitted';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Student {
  id: string;
  name: string;
  email: string;
  registeredCourses: Course[];
}

export default function BeforeTestPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const {
    email,
    sendingOTP,
    sendOTPError,
    canRetryAfter,
    verifyingOTP,
    verifyOTPError,
    remainingAttempts,
    student,
    registeredCourses,
    currentStep,
  } = useSelector((state: RootState) => state.beforeTest);

  const [otpInput, setOtpInput] = useState('');

  // Mouse tracking for gradient effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Timer for retry countdown
  useEffect(() => {
    if (canRetryAfter > 0) {
      const timer = setInterval(() => {
        dispatch(decrementRetryTimer());
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [canRetryAfter, dispatch]);

  // Reset on component mount
  useEffect(() => {
    dispatch(resetBeforeTest());
  }, [dispatch]);

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      dispatch(sendTestOTP(email));
    }
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpInput.length === 6) {
      dispatch(verifyTestOTP({ email, otp: otpInput }));
    }
  };

  const handleResendOTP = () => {
    setOtpInput('');
    dispatch(resetOTPState());
    dispatch(sendTestOTP(email));
  };

  const handleStartTest = (courseId: string) => {
    // Store both course and student info for the test page
    sessionStorage.setItem('currentTestCourseId', courseId);
    
    if (student) {
      sessionStorage.setItem('currentStudentInfo', JSON.stringify({
        id: student.id,
        name: student.name,
        email: student.email
      }));
      
      // Log test initiation
      // console.log('=== TEST INITIATION ===');
      // console.log('Student:', student.name);
      // console.log('Email:', student.email);
      // console.log('Course ID:', courseId);
      // console.log('Timestamp:', new Date().toISOString());
      // console.log('=====================');
    }
    
    router.push('/test');
  };

  const getStatusBadgeColor = (status: Course['status']) => {
    switch (status) {
      case 'not_started':
        return 'bg-gradient-to-r from-green-500 to-emerald-600';
      case 'in_progress':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500';
      case 'submitted':
      case 'auto_submitted':
        return 'bg-gradient-to-r from-slate-400 to-slate-500';
      default:
        return 'bg-gradient-to-r from-slate-400 to-slate-500';
    }
  };

  const getStatusText = (status: Course['status']) => {
    switch (status) {
      case 'not_started':
        return 'Not Attempted';
      case 'in_progress':
        return 'In Progress';
      case 'submitted':
        return 'Submitted';
      case 'auto_submitted':
        return 'Auto Submitted';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section with Dynamic Gradient */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Animated Background Elements */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(79, 70, 229, 0.15) 0%, transparent 50%)`
          }}
        />
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-full blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-8 shadow-lg shadow-indigo-500/30">
            <Sparkles className="w-4 h-4 text-white animate-pulse" />
            <span className="text-sm text-white font-medium tracking-wide">EXAMEETS SKILLVERSE</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 mb-6 tracking-tight leading-tight">
            {currentStep === 'courses' ? `Welcome, ${student?.name}!` : 'Test Portal'}
          </h1>
          <p className="text-xl lg:text-2xl text-slate-600 mb-12 leading-relaxed max-w-3xl mx-auto font-light">
            {currentStep === 'email' && 'Verify your identity to access your tests'}
            {currentStep === 'otp' && 'Enter the verification code sent to your email'}
            {currentStep === 'courses' && 'Your registered test courses are ready'}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Email Step */}
          {currentStep === 'email' && (
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold">Email Verification</h2>
                </div>
                <p className="text-purple-100 leading-relaxed">
                  We&apos;ll send you a verification code to proceed with your tests
                </p>
              </div>

              <form onSubmit={handleSendOTP} className="p-8 space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-3">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => dispatch(setEmail(e.target.value))}
                      className="w-full px-6 py-4 pl-12 border-2 border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-lg transition-all"
                      placeholder="Enter your registered email"
                      required
                      disabled={sendingOTP}
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  </div>
                </div>

                {sendOTPError && (
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 border-l-4 border-red-500 rounded-2xl p-6">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-red-700 font-medium">{sendOTPError}</p>
                        {canRetryAfter > 0 && (
                          <p className="text-sm text-red-600 mt-1">
                            Retry in {canRetryAfter} seconds
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={sendingOTP || canRetryAfter > 0}
                  className="group relative w-full px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl text-lg font-semibold shadow-2xl shadow-indigo-500/40 hover:shadow-indigo-500/60 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {sendingOTP ? 'Sending Code...' : 'Send Code'}
                    {!sendingOTP && <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                  </span>
                </button>
              </form>
            </div>
          )}

          {/* OTP Verification Step */}
          {currentStep === 'otp' && (
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold">Verify OTP</h2>
                </div>
                <p className="text-purple-100 leading-relaxed">
                  Enter the 6-digit code sent to <strong className="text-white">{email}</strong>
                </p>
              </div>

              <form onSubmit={handleVerifyOTP} className="p-8 space-y-6">
                <div>
                  <label htmlFor="otp" className="block text-sm font-semibold text-slate-700 mb-3">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    id="otp"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="w-full px-6 py-6 border-2 border-slate-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-center text-4xl tracking-widest font-mono font-bold transition-all"
                    placeholder="000000"
                    maxLength={6}
                    required
                    disabled={verifyingOTP}
                  />
                </div>

                {verifyOTPError && (
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 border-l-4 border-red-500 rounded-2xl p-6">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-red-700 font-medium">{verifyOTPError}</p>
                        {remainingAttempts > 0 && (
                          <p className="text-sm text-red-600 mt-1">
                            {remainingAttempts} attempts remaining
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-2xl p-6">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-amber-800 font-medium">
                      This code will expire in 5 minutes
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={verifyingOTP || otpInput.length !== 6}
                  className="group relative w-full px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl text-lg font-semibold shadow-2xl shadow-purple-500/40 hover:shadow-purple-500/60 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {verifyingOTP ? 'Verifying...' : 'Verify & Continue'}
                    {!verifyingOTP && <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={canRetryAfter > 0}
                  className="w-full text-purple-600 font-semibold py-3 hover:text-purple-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {canRetryAfter > 0
                    ? `Resend code in ${canRetryAfter}s`
                    : 'Resend Verification Code'}
                </button>
              </form>
            </div>
          )}

          {/* Test Courses List */}
          {currentStep === 'courses' && (
            <div className="space-y-6">
              {registeredCourses.length === 0 ? (
                <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-12 text-center">
                  <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-xl text-slate-600 font-medium">
                    You haven&apos;t registered for any tests yet.
                  </p>
                </div>
              ) : (
                <div className="grid gap-6">
                  {registeredCourses.map((course: Course) => (
                    <div
                      key={course.testCourseId}
                      className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 overflow-hidden hover:-translate-y-1"
                    >
                      <div className="p-8">
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">
                              {course.title}
                            </h3>
                            <p className="text-slate-600 mb-4 leading-relaxed text-lg">
                              {course.description}
                            </p>
                            <div className="flex flex-wrap gap-4 text-slate-600">
                              <span className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl">
                                <Clock className="w-5 h-5 text-indigo-600" />
                                <span className="font-semibold">{course.durationMinutes} minutes</span>
                              </span>
                              <span className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl">
                                <Award className="w-5 h-5 text-purple-600" />
                                <span className="font-semibold">{course.totalMarks} marks</span>
                              </span>
                            </div>
                          </div>
                          <span
                            className={`px-4 py-2 rounded-xl text-sm font-bold text-white ${getStatusBadgeColor(
                              course.status
                            )} shadow-lg`}
                          >
                            {getStatusText(course.status)}
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-6">
                          {course.status === 'not_started' && (
                            <button
                              onClick={() => handleStartTest(course.testCourseId)}
                              className="group/btn relative w-full px-8 py-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl text-lg font-bold shadow-xl shadow-green-500/40 hover:shadow-green-500/60 transition-all duration-300 hover:scale-105"
                            >
                              <span className="relative z-10 flex items-center justify-center gap-3">
                                🚀 Start Test
                                <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                              </span>
                            </button>
                          )}

                          {course.status === 'in_progress' && (
                            <button
                              onClick={() => handleStartTest(course.testCourseId)}
                              className="group/btn relative w-full px-8 py-5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-2xl text-lg font-bold shadow-xl shadow-yellow-500/40 hover:shadow-yellow-500/60 transition-all duration-300 hover:scale-105"
                            >
                              <span className="relative z-10 flex items-center justify-center gap-3">
                                ▶️ Resume Test
                                <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                              </span>
                            </button>
                          )}

                          {(course.status === 'submitted' || course.status === 'auto_submitted') && (
                            <button
                              disabled
                              className="w-full px-8 py-5 bg-gradient-to-r from-slate-300 to-slate-400 text-slate-600 rounded-2xl text-lg font-bold cursor-not-allowed"
                            >
                              ✅ Submitted
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}