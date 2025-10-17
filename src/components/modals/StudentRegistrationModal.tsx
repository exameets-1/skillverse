import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/store/store';
import { 
  X, 
  Mail, 
  User, 
  MapPin, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  Gift,
  Check
} from 'lucide-react';
import {
  sendOTP,
  verifyOTP,
  fetchActiveTests,
  checkReferralCode,
  registerStudent,
  updateFormField,
  updateOTPValue,
  toggleCourseSelection,
  updateReferralCode,
  resetOTPState,
  resetForm,
  selectFormData,
  selectOTPState,
  selectActiveTests,
  selectReferralState,
  selectRegistrationState,
  selectValidation,
  selectCanSubmit,
  clearRegistrationError
} from '@/store/slices/studentRegistrationSlice';
import { useStateDistricts } from '@/hooks/useStateDistricts';

interface StudentRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Test {
  id: string;
  name: string;
  description: string;
}

// Simple confetti component
const Confetti = () => {
  const confettiItems = useState(() => 
    Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      color: ['#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#8b5cf6'][Math.floor(Math.random() * 5)],
      delay: Math.random() * 2,
      duration: 1 + Math.random() * 2
    }))
  )[0];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {confettiItems.map((item) => (
        <div
          key={item.id}
          className="absolute w-2 h-2 opacity-70 animate-bounce"
          style={{
            left: `${item.left}%`,
            top: `${item.top}%`,
            backgroundColor: item.color,
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`
          }}
        />
      ))}
    </div>
  );
};

export default function StudentRegistrationModal({ isOpen, onClose }: StudentRegistrationModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { states, getDistrictsForState, loading: stateDistrictsLoading } = useStateDistricts();
  
  const formData = useSelector(selectFormData);
  const otpState = useSelector(selectOTPState);
  const activeTests = useSelector(selectActiveTests);
  const referralState = useSelector(selectReferralState);
  const registrationState = useSelector(selectRegistrationState);
  const validation = useSelector(selectValidation);
  const canSubmit = useSelector(selectCanSubmit);

  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [copied, setCopied] = useState(false);

  // Fetch active tests when modal opens
  useEffect(() => {
    if (isOpen && !activeTests.fetched) {
      dispatch(fetchActiveTests());
    }
  }, [isOpen, activeTests.fetched, dispatch]);

  // Handle successful registration
  useEffect(() => {
    if (registrationState.success) {
      // Show success animation for 3 seconds then close
      // setTimeout(() => {
      //   dispatch(resetForm());
      //   onClose();
      // }, 3000);
    }
  }, [registrationState.success, dispatch, onClose]);

  if (!isOpen) return null;

  const handleInputChange = (field: string, value: string) => {
    dispatch(updateFormField({ field, value }));
    
    // Reset OTP if email changes
    if (field === 'studentEmail' && otpState.sent) {
      dispatch(resetOTPState());
      setOtpDigits(['', '', '', '', '', '']);
    }
  };

  const handleSendOTP = async () => {
    if (!formData.studentEmail) return;
    await dispatch(sendOTP(formData.studentEmail));
  };

  const handleOTPChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0];
    if (!/^\d*$/.test(value)) return;

    const newDigits = [...otpDigits];
    newDigits[index] = value;
    setOtpDigits(newDigits);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }

    // Update OTP in store
    dispatch(updateOTPValue(newDigits.join('')));
  };

  const handleOTPKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otp = otpDigits.join('');
    if (otp.length === 6) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await dispatch(verifyOTP({ email: formData.studentEmail, otp } as any));
    }
  };

  const handleReferralCheck = async () => {
    if (referralState.code.length === 5) {
      await dispatch(checkReferralCode(referralState.code));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const result = await dispatch(registerStudent(formData));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
    }
  };

  const handleClose = () => {
    dispatch(resetForm());
    setOtpDigits(['', '', '', '', '', '']);
    onClose();
  };

  const handleCopyReferralCode = async () => {
    const referralCode = registrationState.data?.student?.referralCode;
    if (referralCode) {
      try {
        await navigator.clipboard.writeText(referralCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        // Fallback for browsers that don't support clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = referralCode;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const handleSuccessClose = () => {
    dispatch(resetForm());
    setCopied(false);
    onClose();
  };

  const availableDistricts = formData.location.state ? getDistrictsForState(formData.location.state) : [];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-sm relative">
        {/* Loading Overlay - Higher z-index to ensure visibility */}
        {registrationState.loading && (
          <div className="fixed inset-0 bg-white/98 backdrop-blur-sm z-[100] flex items-center justify-center rounded-sm">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-16 h-16 animate-spin text-blue-600" />
              <p className="text-xl font-medium text-gray-900">Registering...</p>
              <p className="text-sm text-gray-600">Please wait while we create your account</p>
            </div>
          </div>
        )}

        {/* Success Overlay - Higher z-index */}
        {registrationState.success && (
          <div className="fixed inset-0 bg-white z-[100] flex items-center justify-center rounded-sm">
            <Confetti />
            <div className="flex flex-col items-center gap-6 text-center px-8 max-w-md">
              <div className="relative">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-12 h-12 text-green-600 animate-pulse" />
                </div>
                <div className="absolute -inset-3 bg-green-200 rounded-full animate-ping opacity-30"></div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-green-900 mb-3">Registration Successful! 🎉</h3>
                <p className="text-gray-700 mb-6 text-lg">
                  Welcome aboard! Your account has been created successfully.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                  <p className="text-base text-green-800 mb-3">
                    Your referral code:
                  </p>
                  <div className="flex items-center gap-3 mb-3">
                    <p className="font-mono font-bold text-2xl text-green-900 flex-1">
                      {registrationState.data?.student?.referralCode}
                    </p>
                    <button
                      onClick={handleCopyReferralCode}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-2"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-sm text-green-600">Share this code with friends and earn rewards!</p>
                </div>
                <button
                  onClick={handleSuccessClose}
                  className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-lg font-medium"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error Overlay - Higher z-index */}
        {registrationState.error && !registrationState.loading && (
          <div className="fixed inset-0 bg-white z-[100] flex items-center justify-center rounded-sm">
            <div className="flex flex-col items-center gap-6 text-center px-8">
              <div className="relative">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-12 h-12 text-red-600" />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-red-900 mb-3">Registration Failed</h3>
                <p className="text-gray-700 mb-6 text-lg">
                  {registrationState.error}
                </p>
                <button
                  onClick={() => dispatch(clearRegistrationError())}
                  className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-lg font-medium"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-medium text-black">Student Registration</h2>
            <p className="text-sm text-gray-500 mt-0.5">Complete all steps to register for the test</p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close registration modal"
            disabled={registrationState.loading}
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form - Add opacity when loading */}
        <div className={`p-6 space-y-6 ${registrationState.loading ? 'opacity-50 pointer-events-none' : ''}`}>
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="font-medium text-black flex items-center gap-2">
              <User className="w-4 h-4" />
              Personal Information
            </h3>

            <div>
              <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <input
                id="full-name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="text-black w-full px-4 py-2.5 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none text-sm"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1.5">Date of Birth</label>
              <input
                id="dob"
                type="date"
                value={formData.studentDOB}
                onChange={(e) => handleInputChange('studentDOB', e.target.value)}
                className="text-black w-full px-4 py-2.5 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
              <input
                id="phone"
                type="tel"
                value={formData.studentNumber}
                onChange={(e) => handleInputChange('studentNumber', e.target.value)}
                className="text-black w-full px-4 py-2.5 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none text-sm"
                placeholder="Enter your phone number"
                pattern="[0-9]{10}"
                required
              />
            </div>
          </div>

          {/* Email Verification */}
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <h3 className="font-medium text-black flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Verification
            </h3>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <div className="flex gap-2">
                <input
                  id="email"
                  type="email"
                  value={formData.studentEmail}
                  onChange={(e) => handleInputChange('studentEmail', e.target.value)}
                  className="text-black flex-1 px-4 py-2.5 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none text-sm"
                  placeholder="Enter your email"
                  required
                  disabled={otpState.verified}
                />
                {!otpState.verified && (
                  <button
                    type="button"
                    onClick={handleSendOTP}
                    disabled={!formData.studentEmail || otpState.loading || otpState.sent}
                    className="px-6 py-2.5 bg-black text-white text-sm font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                  >
                    {otpState.loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : otpState.sent ? (
                      'OTP Sent'
                    ) : (
                      'Send OTP'
                    )}
                  </button>
                )}
                {otpState.verified && (
                  <div className="px-4 py-2.5 bg-green-50 border border-green-200 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-700 font-medium">Verified</span>
                  </div>
                )}
              </div>
              {otpState.error && (
                <p className="text-sm text-red-600 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {otpState.error}
                </p>
              )}
            </div>

            {/* OTP Input */}
            {otpState.sent && !otpState.verified && (
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
                <div className="flex gap-2 justify-center">
                  {otpDigits.map((digit, index) => (
                    <input
                      key={`otp-input-${index}`}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOTPChange(index, e.target.value)}
                      onKeyDown={(e) => handleOTPKeyDown(index, e)}
                      className="text-black w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 focus:border-black focus:ring-0 outline-none"
                      aria-label={`OTP digit ${index + 1}`}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    {otpState.remainingAttempts < 5 && (
                      <span>Remaining attempts: {otpState.remainingAttempts}</span>
                    )}
                  </p>
                  <button
                    type="button"
                    onClick={handleVerifyOTP}
                    disabled={otpDigits.join('').length !== 6 || otpState.loading}
                    className="px-6 py-2 bg-black text-white text-sm font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    {otpState.loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      'Verify OTP'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Guardian Information */}
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <h3 className="font-medium text-black">Guardian Information</h3>

            <div>
              <label htmlFor="guardian-name" className="block text-sm font-medium text-gray-700 mb-1.5">Guardian Name</label>
              <input
                id="guardian-name"
                type="text"
                value={formData.studentGuardianName}
                onChange={(e) => handleInputChange('studentGuardianName', e.target.value)}
                className="text-black w-full px-4 py-2.5 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none text-sm"
                placeholder="Enter guardian's name"
                required
              />
            </div>

            <div>
              <label htmlFor="guardian-phone" className="block text-sm font-medium text-gray-700 mb-1.5">Guardian Phone Number</label>
              <input
                id="guardian-phone"
                type="tel"
                value={formData.studentGuardianNumber}
                onChange={(e) => handleInputChange('studentGuardianNumber', e.target.value)}
                className="text-black w-full px-4 py-2.5 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none text-sm"
                placeholder="Enter guardian's phone number"
                pattern="[0-9]{10}"
                required
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <h3 className="font-medium text-black flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Location
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1.5">State</label>
                <select
                  id="state"
                  value={formData.location.state}
                  onChange={(e) => handleInputChange('location.state', e.target.value)}
                  className="text-black w-full px-4 py-2.5 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none text-sm bg-white"
                  required
                  disabled={stateDistrictsLoading}
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1.5">District</label>
                <select
                  id="district"
                  value={formData.location.district}
                  onChange={(e) => handleInputChange('location.district', e.target.value)}
                  className="text-black w-full px-4 py-2.5 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none text-sm bg-white"
                  required
                  disabled={!formData.location.state || stateDistrictsLoading}
                >
                  <option value="">Select District</option>
                  {availableDistricts.map((district) => (
                    <option key={district} value={district}>
                      {district.replace(/_/g, ' ')}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {stateDistrictsLoading && (
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Loader2 className="w-3 h-3 animate-spin" />
                Loading location data...
              </p>
            )}
          </div>

          {/* Test Selection */}
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-black">Select Tests</h3>
              {validation.isCoursesSelected && (
                <div className="flex items-center gap-1.5 text-sm text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>{formData.registeredCourses.length} selected</span>
                </div>
              )}
            </div>

            {activeTests.loading && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
              </div>
            )}

            {activeTests.error && (
              <div className="p-4 bg-red-50 border border-red-200 text-sm text-red-700">
                {activeTests.error}
              </div>
            )}

            {!activeTests.loading && !activeTests.error && (
              <div className="grid gap-3" role="group" aria-label="Test selection">
                {(activeTests.data as Test[]).map((test, index) => {
                  const isSelected = formData.registeredCourses.includes(test.id);
                  
                  return (
                    <div
                      key={test.id || `test-${index}`}
                      onClick={() => {
                        dispatch(toggleCourseSelection(test.id));
                      }}
                      className={`p-4 border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-black bg-gray-50'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          dispatch(toggleCourseSelection(test.id));
                        }
                      }}
                      aria-pressed={isSelected}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-black mb-1">{test.name || 'No Title'}</h4>
                          <p className="text-sm text-gray-600">{test.description || 'No Description'}</p>
                        </div>
                        {isSelected && (
                          <CheckCircle className="w-5 h-5 text-black flex-shrink-0 ml-3" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Referral Code */}
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <h3 className="font-medium text-black flex items-center gap-2">
              <Gift className="w-4 h-4" />
              Referral Code <span className="text-sm font-normal text-gray-500">(Optional)</span>
            </h3>

            <div>
              <label htmlFor="referral-code" className="block text-sm font-medium text-gray-700 mb-1.5">Enter Referral Code</label>
              <div className="flex gap-2">
                <input
                  id="referral-code"
                  type="text"
                  value={referralState.code}
                  onChange={(e) => dispatch(updateReferralCode(e.target.value.toUpperCase()))}
                  className="text-black flex-1 px-4 py-2.5 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none text-sm uppercase font-mono"
                  placeholder="XXXXX"
                  maxLength={5}
                />
                <button
                  type="button"
                  onClick={handleReferralCheck}
                  disabled={referralState.code.length !== 5 || referralState.loading}
                  className="px-6 py-2.5 bg-black text-white text-sm font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {referralState.loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    'Check'
                  )}
                </button>
              </div>
              
              {referralState.checked && referralState.isValid && (
                <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>Referred by: <span className="font-medium">{referralState.referrerName}</span></span>
                </div>
              )}
              
              {referralState.checked && !referralState.isValid && (
                <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  <span>{referralState.error}</span>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-gray-200">
            {!canSubmit && (
              <div className="mb-4 p-3 bg-amber-50 border border-amber-200 text-sm text-amber-800">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium mb-1">Complete these steps to register:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      {!validation.isEmailVerified && <li>Verify your email address</li>}
                      {!validation.isCoursesSelected && <li>Select at least one test</li>}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit || registrationState.loading}
              className="w-full py-3.5 bg-black text-white font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              <span>Complete Registration</span>
              <CheckCircle className="w-4 h-4" />
            </button>

            {registrationState.error && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 text-sm text-red-700 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{registrationState.error}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}