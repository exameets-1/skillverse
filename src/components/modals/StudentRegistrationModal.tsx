// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import type { AppDispatch } from '@/store/store';
// import { 
//   X, 
//   Mail, 
//   User, 
//   MapPin, 
//   CheckCircle, 
//   AlertCircle,
//   Loader2,
//   Gift,
//   Check,
//   Sparkles
// } from 'lucide-react';
// import {
//   sendOTP,
//   verifyOTP,
//   fetchActiveTests,
//   checkReferralCode,
//   registerStudent,
//   updateFormField,
//   updateOTPValue,
//   toggleCourseSelection,
//   updateReferralCode,
//   resetOTPState,
//   resetForm,
//   selectFormData,
//   selectOTPState,
//   selectActiveTests,
//   selectReferralState,
//   selectRegistrationState,
//   selectValidation,
//   selectCanSubmit,
//   clearRegistrationError
// } from '@/store/slices/studentRegistrationSlice';
// import { useStateDistricts } from '@/hooks/useStateDistricts';

// interface StudentRegistrationModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// interface Test {
//   id: string;
//   name: string;
//   description: string;
// }

// // Simple confetti component
// const Confetti = () => {
//   const confettiItems = useState(() => 
//     Array.from({ length: 50 }).map((_, i) => ({
//       id: i,
//       left: Math.random() * 100,
//       top: Math.random() * 100,
//       color: ['#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#8b5cf6'][Math.floor(Math.random() * 5)],
//       delay: Math.random() * 2,
//       duration: 1 + Math.random() * 2
//     }))
//   )[0];

//   return (
//     <div className="absolute inset-0 pointer-events-none overflow-hidden">
//       {confettiItems.map((item) => (
//         <div
//           key={item.id}
//           className="absolute w-2 h-2 opacity-70 animate-bounce"
//           style={{
//             left: `${item.left}%`,
//             top: `${item.top}%`,
//             backgroundColor: item.color,
//             animationDelay: `${item.delay}s`,
//             animationDuration: `${item.duration}s`
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// export default function StudentRegistrationModal({ isOpen, onClose }: StudentRegistrationModalProps) {
//   const dispatch = useDispatch<AppDispatch>();
//   const { states, getDistrictsForState, loading: stateDistrictsLoading } = useStateDistricts();
  
//   const formData = useSelector(selectFormData);
//   const otpState = useSelector(selectOTPState);
//   const activeTests = useSelector(selectActiveTests);
//   const referralState = useSelector(selectReferralState);
//   const registrationState = useSelector(selectRegistrationState);
//   const validation = useSelector(selectValidation);
//   const canSubmit = useSelector(selectCanSubmit);

//   const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
//   const [copied, setCopied] = useState(false);

//   // Fetch active tests when modal opens
//   useEffect(() => {
//     if (isOpen && !activeTests.fetched) {
//       dispatch(fetchActiveTests());
//     }
//   }, [isOpen, activeTests.fetched, dispatch]);

//   // Handle successful registration
//   useEffect(() => {
//     if (registrationState.success) {
//       // Show success animation for 3 seconds then close
//       // setTimeout(() => {
//       //   dispatch(resetForm());
//       //   onClose();
//       // }, 3000);
//     }
//   }, [registrationState.success, dispatch, onClose]);

//   if (!isOpen) return null;

//   const handleInputChange = (field: string, value: string) => {
//     dispatch(updateFormField({ field, value }));
    
//     // Reset OTP if email changes
//     if (field === 'studentEmail' && otpState.sent) {
//       dispatch(resetOTPState());
//       setOtpDigits(['', '', '', '', '', '']);
//     }
//   };

//   const handleSendOTP = async () => {
//     if (!formData.studentEmail) return;
//     await dispatch(sendOTP(formData.studentEmail));
//   };

//   const handleOTPChange = (index: number, value: string) => {
//     if (value.length > 1) value = value[0];
//     if (!/^\d*$/.test(value)) return;

//     const newDigits = [...otpDigits];
//     newDigits[index] = value;
//     setOtpDigits(newDigits);

//     // Auto-focus next input
//     if (value && index < 5) {
//       const nextInput = document.getElementById(`otp-${index + 1}`);
//       nextInput?.focus();
//     }

//     // Update OTP in store
//     dispatch(updateOTPValue(newDigits.join('')));
//   };

//   const handleOTPKeyDown = (index: number, e: React.KeyboardEvent) => {
//     if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
//       const prevInput = document.getElementById(`otp-${index - 1}`);
//       prevInput?.focus();
//     }
//   };

//   const handleVerifyOTP = async () => {
//     const otp = otpDigits.join('');
//     if (otp.length === 6) {
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       await dispatch(verifyOTP({ email: formData.studentEmail, otp } as any));
//     }
//   };

//   const handleReferralCheck = async () => {
//     if (referralState.code.length === 5) {
//       await dispatch(checkReferralCode(referralState.code));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!canSubmit) return;

//     try {
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//       const result = await dispatch(registerStudent(formData));
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (error) {
//     }
//   };

//   const handleClose = () => {
//     dispatch(resetForm());
//     setOtpDigits(['', '', '', '', '', '']);
//     onClose();
//   };

//   const handleCopyReferralCode = async () => {
//     const referralCode = registrationState.data?.student?.referralCode;
//     if (referralCode) {
//       try {
//         await navigator.clipboard.writeText(referralCode);
//         setCopied(true);
//         setTimeout(() => setCopied(false), 2000);
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//       } catch (err) {
//         // Fallback for browsers that don't support clipboard API
//         const textArea = document.createElement('textarea');
//         textArea.value = referralCode;
//         document.body.appendChild(textArea);
//         textArea.select();
//         document.execCommand('copy');
//         document.body.removeChild(textArea);
//         setCopied(true);
//         setTimeout(() => setCopied(false), 2000);
//       }
//     }
//   };

//   const handleSuccessClose = () => {
//     dispatch(resetForm());
//     setCopied(false);
//     onClose();
//   };

//   const availableDistricts = formData.location.state ? getDistrictsForState(formData.location.state) : [];

//   return (
//     <div className="fixed inset-0 bg-linear-to-br from-black/60 via-indigo-900/30 to-purple-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
//       <div className="bg-white w-full max-w-3xl max-h-[95vh] overflow-y-auto rounded-3xl shadow-2xl border border-slate-200 relative">
//         {/* Loading Overlay */}
//         {registrationState.loading && (
//           <div className="fixed inset-0 bg-linear-to-br from-indigo-600/95 to-purple-600/95 backdrop-blur-sm z-100 flex items-center justify-center rounded-3xl">
//             <div className="flex flex-col items-center gap-6 text-center">
//               <div className="relative">
//                 <Loader2 className="w-20 h-20 animate-spin text-white" />
//                 <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse" />
//               </div>
//               <div>
//                 <p className="text-2xl font-bold text-white mb-2">Creating Your Account</p>
//                 <p className="text-indigo-100">Please wait while we set everything up...</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Success Overlay */}
//         {registrationState.success && (
//           <div className="fixed inset-0 bg-linear-to-br from-green-500/95 via-emerald-600/95 to-teal-600/95 backdrop-blur-sm z-100 flex items-center justify-center rounded-3xl">
//             <Confetti />
//             <div className="flex flex-col items-center gap-8 text-center px-8 max-w-lg">
//               <div className="relative">
//                 <div className="w-28 h-28 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
//                   <Check className="w-16 h-16 text-white animate-pulse" />
//                 </div>
//                 <div className="absolute -inset-4 bg-white/10 rounded-full animate-ping" />
//                 <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-300 animate-bounce" />
//               </div>
              
//               <div>
//                 <h3 className="text-4xl font-bold text-white mb-4">Registration Successful! 🎉</h3>
//                 <p className="text-xl text-green-100 mb-8 leading-relaxed">
//                   Welcome aboard! Your account has been created successfully.
//                 </p>
                
//                 <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-8">
//                   <p className="text-lg text-green-100 mb-4 font-medium">
//                     Your referral code:
//                   </p>
//                   <div className="flex items-center gap-4 mb-4">
//                     <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-xl p-4">
//                       <p className="font-mono font-bold text-3xl text-white tracking-wider">
//                         {registrationState.data?.student?.referralCode}
//                       </p>
//                     </div>
//                     <button
//                       onClick={handleCopyReferralCode}
//                       className="px-6 py-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-xl transition-all duration-300 font-medium flex items-center gap-3 border border-white/20"
//                     >
//                       {copied ? (
//                         <>
//                           <Check className="w-5 h-5" />
//                           Copied!
//                         </>
//                       ) : (
//                         <>
//                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                           </svg>
//                           Copy
//                         </>
//                       )}
//                     </button>
//                   </div>
//                   <p className="text-green-200 text-sm">Share this code with friends and earn rewards!</p>
//                 </div>
                
//                 <button
//                   onClick={handleSuccessClose}
//                   className="px-10 py-4 bg-white text-green-600 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
//                 >
//                   Continue to Tests
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Error Overlay */}
//         {registrationState.error && !registrationState.loading && (
//           <div className="fixed inset-0 bg-linear-to-br from-red-500/95 to-pink-600/95 backdrop-blur-sm z-100 flex items-center justify-center rounded-3xl">
//             <div className="flex flex-col items-center gap-8 text-center px-8 max-w-md">
//               <div className="relative">
//                 <div className="w-28 h-28 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
//                   <AlertCircle className="w-16 h-16 text-white" />
//                 </div>
//               </div>
//               <div>
//                 <h3 className="text-4xl font-bold text-white mb-4">Registration Failed</h3>
//                 <p className="text-xl text-red-100 mb-8 leading-relaxed">
//                   {registrationState.error}
//                 </p>
//                 <button
//                   onClick={() => dispatch(clearRegistrationError())}
//                   className="px-10 py-4 bg-white text-red-600 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
//                 >
//                   Try Again
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Header */}
//         <div className="sticky top-0 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 px-8 py-6 flex items-center justify-between z-10 rounded-t-3xl">
//           <div>
//             <h2 className="text-2xl font-bold text-white flex items-center gap-3">
//               <Sparkles className="w-6 h-6" />
//               Student Registration
//             </h2>
//             <p className="text-indigo-100 mt-1">Complete all steps to join the test</p>
//           </div>
//           <button
//             type="button"
//             onClick={handleClose}
//             className="p-3 hover:bg-white/20 rounded-full transition-all duration-300 group"
//             aria-label="Close registration modal"
//             disabled={registrationState.loading}
//           >
//             <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform" />
//           </button>
//         </div>

//         {/* Form */}
//         <div className={`p-8 space-y-8 ${registrationState.loading ? 'opacity-50 pointer-events-none' : ''}`}>
//           {/* Personal Information */}
//           <div className="space-y-6">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
//                 <User className="w-5 h-5 text-white" />
//               </div>
//               <h3 className="text-xl font-bold text-slate-900">Personal Information</h3>
//             </div>

//             <div>
//               <label htmlFor="full-name" className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
//               <input
//                 id="full-name"
//                 type="text"
//                 value={formData.name}
//                 onChange={(e) => handleInputChange('name', e.target.value)}
//                 className="w-full px-5 py-4 border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none text-slate-900 rounded-xl transition-all text-lg"
//                 placeholder="Enter your full name"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="dob" className="block text-sm font-semibold text-slate-700 mb-2">Date of Birth</label>
//               <input
//                 id="dob"
//                 type="date"
//                 value={formData.studentDOB}
//                 onChange={(e) => handleInputChange('studentDOB', e.target.value)}
//                 className="w-full px-5 py-4 border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none text-slate-900 rounded-xl transition-all text-lg"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
//               <input
//                 id="phone"
//                 type="tel"
//                 value={formData.studentNumber}
//                 onChange={(e) => handleInputChange('studentNumber', e.target.value)}
//                 className="w-full px-5 py-4 border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none text-slate-900 rounded-xl transition-all text-lg"
//                 placeholder="Enter your phone number"
//                 pattern="[0-9]{10}"
//                 required
//               />
//             </div>
//           </div>

//           {/* Email Verification */}
//           <div className="space-y-6 pt-6 border-t border-slate-200">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-10 h-10 bg-linear-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
//                 <Mail className="w-5 h-5 text-white" />
//               </div>
//               <h3 className="text-xl font-bold text-slate-900">Email Verification</h3>
//             </div>

//             <div>
//               <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <input
//                   id="email"
//                   type="email"
//                   value={formData.studentEmail}
//                   onChange={(e) => handleInputChange('studentEmail', e.target.value)}
//                   className="flex-1 px-5 py-4 border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none text-slate-900 rounded-xl transition-all text-lg"
//                   placeholder="Enter your email"
//                   required
//                   disabled={otpState.verified}
//                 />
//                 {!otpState.verified && (
//                   <button
//                     type="button"
//                     onClick={handleSendOTP}
//                     disabled={!formData.studentEmail || otpState.loading || otpState.sent}
//                     className="w-full sm:w-auto px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
//                   >
//                     {otpState.loading ? (
//                       <Loader2 className="w-5 h-5 animate-spin" />
//                     ) : otpState.sent ? (
//                       'OTP Sent'
//                     ) : (
//                       'Send OTP'
//                     )}
//                   </button>
//                 )}
//                 {otpState.verified && (
//                   <div className="px-6 py-4 bg-green-50 border-2 border-green-200 flex items-center gap-3 rounded-xl">
//                     <CheckCircle className="w-5 h-5 text-green-600" />
//                     <span className="font-semibold text-green-700">Verified</span>
//                   </div>
//                 )}
//               </div>
//               {otpState.error && (
//                 <p className="text-sm text-red-600 mt-2 flex items-center gap-2 bg-red-50 p-3 rounded-lg">
//                   <AlertCircle className="w-4 h-4" />
//                   {otpState.error}
//                 </p>
//               )}
//             </div>

//             {/* OTP Input */}
//             {otpState.sent && !otpState.verified && (
//               <div className="space-y-4 bg-linear-to-br from-indigo-50 to-purple-50 p-4 sm:p-6 rounded-2xl border border-indigo-200">
//                 <label className="block text-sm font-semibold text-slate-700">Enter OTP</label>
//                 <div className="flex gap-2 sm:gap-3 justify-center">
//                   {otpDigits.map((digit, index) => (
//                     <input
//                       key={`otp-input-${index}`}
//                       id={`otp-${index}`}
//                       type="text"
//                       inputMode="numeric"
//                       maxLength={1}
//                       value={digit}
//                       onChange={(e) => handleOTPChange(index, e.target.value)}
//                       onKeyDown={(e) => handleOTPKeyDown(index, e)}
//                       className="w-10 h-10 sm:w-14 sm:h-14 text-center text-lg sm:text-2xl font-bold border-2 border-indigo-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none rounded-lg sm:rounded-xl bg-white transition-all"
//                       aria-label={`OTP digit ${index + 1}`}
//                     />
//                   ))}
//                 </div>
//                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
//                   <p className="text-sm text-slate-600">
//                     {otpState.remainingAttempts < 5 && (
//                       <span className="text-orange-600 font-medium">Remaining attempts: {otpState.remainingAttempts}</span>
//                     )}
//                   </p>
//                   <button
//                     type="button"
//                     onClick={handleVerifyOTP}
//                     disabled={otpDigits.join('').length !== 6 || otpState.loading}
//                     className="w-full sm:w-auto px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
//                   >
//                     {otpState.loading ? (
//                       <Loader2 className="w-4 h-4 animate-spin" />
//                     ) : (
//                       'Verify OTP'
//                     )}
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Guardian Information */}
//           <div className="space-y-6 pt-6 border-t border-slate-200">
//             <h3 className="text-xl font-bold text-slate-900">Parent Information</h3>

//             <div>
//               <label htmlFor="guardian-name" className="block text-sm font-semibold text-slate-700 mb-2">Parent Name</label>
//               <input
//                 id="guardian-name"
//                 type="text"
//                 value={formData.studentGuardianName}
//                 onChange={(e) => handleInputChange('studentGuardianName', e.target.value)}
//                 className="w-full px-5 py-4 border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none text-slate-900 rounded-xl transition-all text-lg"
//                 placeholder="Enter parent's name"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="guardian-phone" className="block text-sm font-semibold text-slate-700 mb-2">Parent Phone Number</label>
//               <input
//                 id="guardian-phone"
//                 type="tel"
//                 value={formData.studentGuardianNumber}
//                 onChange={(e) => handleInputChange('studentGuardianNumber', e.target.value)}
//                 className="w-full px-5 py-4 border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none text-slate-900 rounded-xl transition-all text-lg"
//                 placeholder="Enter parent's phone number"
//                 pattern="[0-9]{10}"
//                 required
//               />
//             </div>
//           </div>

//           {/* Location */}
//           <div className="space-y-6 pt-6 border-t border-slate-200">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
//                 <MapPin className="w-5 h-5 text-white" />
//               </div>
//               <h3 className="text-xl font-bold text-slate-900">Location</h3>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="state" className="block text-sm font-semibold text-slate-700 mb-2">State</label>
//                 <select
//                   id="state"
//                   value={formData.location.state}
//                   onChange={(e) => handleInputChange('location.state', e.target.value)}
//                   className="w-full px-5 py-4 border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none text-slate-900 rounded-xl transition-all text-lg bg-white"
//                   required
//                   disabled={stateDistrictsLoading}
//                 >
//                   <option value="">Select State</option>
//                   {states.map((state) => (
//                     <option key={state} value={state}>
//                       {state}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label htmlFor="district" className="block text-sm font-semibold text-slate-700 mb-2">District</label>
//                 <select
//                   id="district"
//                   value={formData.location.district}
//                   onChange={(e) => handleInputChange('location.district', e.target.value)}
//                   className="w-full px-5 py-4 border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none text-slate-900 rounded-xl transition-all text-lg bg-white"
//                   required
//                   disabled={!formData.location.state || stateDistrictsLoading}
//                 >
//                   <option value="">Select District</option>
//                   {availableDistricts.map((district) => (
//                     <option key={district} value={district}>
//                       {district.replace(/_/g, ' ')}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {stateDistrictsLoading && (
//               <p className="text-sm text-slate-600 flex items-center gap-2 bg-slate-50 p-3 rounded-lg">
//                 <Loader2 className="w-4 h-4 animate-spin" />
//                 Loading location data...
//               </p>
//             )}
//           </div>

//           {/* Test Selection */}
//           <div className="space-y-6 pt-6 border-t border-slate-200">
//             <div className="flex items-center justify-between">
//               <h3 className="text-xl font-bold text-slate-900">Select Tests</h3>
//               {validation.isCoursesSelected && (
//                 <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
//                   <CheckCircle className="w-4 h-4 text-green-600" />
//                   <span className="text-sm font-semibold text-green-700">{formData.registeredCourses.length} selected</span>
//                 </div>
//               )}
//             </div>

//             {activeTests.loading && (
//               <div className="flex items-center justify-center py-12">
//                 <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
//               </div>
//             )}

//             {activeTests.error && (
//               <div className="p-6 bg-red-50 border-2 border-red-200 text-red-700 rounded-2xl">
//                 {activeTests.error}
//               </div>
//             )}

//             {!activeTests.loading && !activeTests.error && (
//               <div className="grid gap-4" role="group" aria-label="Test selection">
//                 {(activeTests.data as Test[]).map((test, index) => {
//                   const isSelected = formData.registeredCourses.includes(test.id);
                  
//                   return (
//                     <div
//                       key={test.id || `test-${index}`}
//                       onClick={() => {
//                         dispatch(toggleCourseSelection(test.id));
//                       }}
//                       className={`group p-6 border-2 cursor-pointer transition-all duration-300 rounded-2xl ${
//                         isSelected
//                           ? 'border-indigo-500 bg-linear-to-br from-indigo-50 to-purple-50 shadow-lg'
//                           : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
//                       }`}
//                       role="button"
//                       tabIndex={0}
//                       onKeyDown={(e) => {
//                         if (e.key === 'Enter' || e.key === ' ') {
//                           e.preventDefault();
//                           dispatch(toggleCourseSelection(test.id));
//                         }
//                       }}
//                       aria-pressed={isSelected.toString()}
//                     >
//                       <div className="flex items-start justify-between">
//                         <div className="flex-1">
//                           <h4 className="font-bold text-slate-900 mb-2 text-lg">{test.name || 'No Title'}</h4>
//                           <p className="text-slate-600">{test.description || 'No Description'}</p>
//                         </div>
//                         {isSelected && (
//                           <div className="w-8 h-8 bg-linear-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center ml-4">
//                             <CheckCircle className="w-5 h-5 text-white" />
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>

//           {/* Referral Code */}
//           <div className="space-y-6 pt-6 border-t border-slate-200">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-10 h-10 bg-linear-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
//                 <Gift className="w-5 h-5 text-white" />
//               </div>
//               <h3 className="text-xl font-bold text-slate-900">
//                 Referral Code <span className="text-sm font-normal text-slate-500 ml-2">(Optional)</span>
//               </h3>
//             </div>

//             <div>
//               <label htmlFor="referral-code" className="block text-sm font-semibold text-slate-700 mb-2">Enter Referral Code</label>
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <input
//                   id="referral-code"
//                   type="text"
//                   value={referralState.code}
//                   onChange={(e) => dispatch(updateReferralCode(e.target.value.toUpperCase()))}
//                   className="flex-1 px-5 py-4 border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none text-slate-900 rounded-xl transition-all text-lg uppercase font-mono tracking-widest"
//                   placeholder="XXXXX"
//                   maxLength={5}
//                 />
//                 <button
//                   type="button"
//                   onClick={handleReferralCheck}
//                   disabled={referralState.code.length !== 5 || referralState.loading}
//                   className="w-full sm:w-auto px-8 py-4 bg-linear-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-700 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed transition-all duration-300"
//                 >
//                   {referralState.loading ? (
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                   ) : (
//                     'Check'
//                   )}
//                 </button>
//               </div>
              
//               {referralState.checked && referralState.isValid && (
//                 <div className="mt-3 flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
//                   <CheckCircle className="w-5 h-5 text-green-600" />
//                   <span className="text-green-700 font-medium">Referred by: <span className="font-bold">{referralState.referrerName}</span></span>
//                 </div>
//               )}
              
//               {referralState.checked && !referralState.isValid && (
//                 <div className="mt-3 flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
//                   <AlertCircle className="w-5 h-5 text-red-600" />
//                   <span className="text-red-700 font-medium">{referralState.error}</span>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="pt-6 border-t border-slate-200">
//             {!canSubmit && (
//               <div className="mb-6 p-6 bg-linear-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl">
//                 <div className="flex items-start gap-4">
//                   <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
//                   <div>
//                     <p className="font-bold text-amber-900 mb-3 text-lg">Complete these steps to register:</p>
//                     <ul className="space-y-2 text-amber-800">
//                       {!validation.isEmailVerified && (
//                         <li className="flex items-center gap-2">
//                           <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
//                           Verify your email address
//                         </li>
//                       )}
//                       {!validation.isCoursesSelected && (
//                         <li className="flex items-center gap-2">
//                           <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
//                           Select at least one test
//                         </li>
//                       )}
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             )}

//             <button
//               type="button"
//               onClick={handleSubmit}
//               disabled={!canSubmit || registrationState.loading}
//               className="w-full py-5 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105"
//             >
//               <span>Complete Registration</span>
//               <CheckCircle className="w-6 h-6" />
//             </button>

//             {registrationState.error && (
//               <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3">
//                 <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
//                 <span className="text-red-700 font-medium">{registrationState.error}</span>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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
  Check,
  Sparkles
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
    <div className="fixed inset-0 bg-linear-to-br from-black/60 via-indigo-900/30 to-purple-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl max-h-[95vh] overflow-y-auto rounded-3xl shadow-2xl border border-slate-200 relative">
        {/* Loading Overlay */}
        {registrationState.loading && (
          <div className="fixed inset-0 bg-linear-to-br from-indigo-600/95 to-purple-600/95 backdrop-blur-sm z-100 flex items-center justify-center rounded-3xl">
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="relative">
                <Loader2 className="w-20 h-20 animate-spin text-white" />
                <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white mb-2">Creating Your Account</p>
                <p className="text-indigo-100">Please wait while we set everything up...</p>
              </div>
            </div>
          </div>
        )}

        {/* Success Overlay */}
        {registrationState.success && (
          <div className="fixed inset-0 bg-linear-to-br from-green-500/95 via-emerald-600/95 to-teal-600/95 backdrop-blur-sm z-100 flex items-center justify-center rounded-3xl">
            <Confetti />
            <div className="flex flex-col items-center gap-8 text-center px-8 max-w-lg">
              <div className="relative">
                <div className="w-28 h-28 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Check className="w-16 h-16 text-white animate-pulse" />
                </div>
                <div className="absolute -inset-4 bg-white/10 rounded-full animate-ping" />
                <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-300 animate-bounce" />
              </div>
              
              <div>
                <h3 className="text-4xl font-bold text-white mb-4">Registration Successful! 🎉</h3>
                <p className="text-xl text-green-100 mb-8 leading-relaxed">
                  Welcome aboard! Your account has been created successfully.
                </p>
                
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-8">
                  <p className="text-lg text-green-100 mb-4 font-medium">
                    Your referral code:
                  </p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-xl p-4">
                      <p className="font-mono font-bold text-3xl text-white tracking-wider">
                        {registrationState.data?.student?.referralCode}
                      </p>
                    </div>
                    <button
                      onClick={handleCopyReferralCode}
                      className="px-6 py-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-xl transition-all duration-300 font-medium flex items-center gap-3 border border-white/20"
                    >
                      {copied ? (
                        <>
                          <Check className="w-5 h-5" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-green-200 text-sm">Share this code with friends and earn rewards!</p>
                </div>
                
                <button
                  onClick={handleSuccessClose}
                  className="px-10 py-4 bg-white text-green-600 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  Continue to Tests
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error Overlay */}
        {registrationState.error && !registrationState.loading && (
          <div className="fixed inset-0 bg-linear-to-br from-red-500/95 to-pink-600/95 backdrop-blur-sm z-100 flex items-center justify-center rounded-3xl">
            <div className="flex flex-col items-center gap-8 text-center px-8 max-w-md">
              <div className="relative">
                <div className="w-28 h-28 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <AlertCircle className="w-16 h-16 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-white mb-4">Registration Failed</h3>
                <p className="text-xl text-red-100 mb-8 leading-relaxed">
                  {registrationState.error}
                </p>
                <button
                  onClick={() => dispatch(clearRegistrationError())}
                  className="px-10 py-4 bg-white text-red-600 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="sticky top-0 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 px-8 py-6 flex items-center justify-between z-10 rounded-t-3xl">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Sparkles className="w-6 h-6" />
              Student Registration
            </h2>
            <p className="text-indigo-100 mt-1">Complete all steps to join the test</p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-3 hover:bg-white/20 rounded-full transition-all duration-300 group"
            aria-label="Close registration modal"
            disabled={registrationState.loading}
          >
            <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        {/* Form */}
        <div className={`p-8 space-y-8 ${registrationState.loading ? 'opacity-50 pointer-events-none' : ''}`}>
          {/* Personal Information */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Personal Information</h3>
            </div>

            <div>
              <label htmlFor="full-name" className="block text-sm font-semibold text-slate-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="full-name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-5 py-4 border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none text-slate-900 rounded-xl transition-all text-lg"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label htmlFor="dob" className="block text-sm font-semibold text-slate-700 mb-2">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                id="dob"
                type="date"
                value={formData.studentDOB}
                onChange={(e) => handleInputChange('studentDOB', e.target.value)}
                className="w-full px-5 py-4 border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none text-slate-900 rounded-xl transition-all text-lg"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.studentNumber}
                onChange={(e) => handleInputChange('studentNumber', e.target.value)}
                className="w-full px-5 py-4 border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none text-slate-900 rounded-xl transition-all text-lg"
                placeholder="Enter your phone number"
                pattern="[0-9]{10}"
                required
              />
            </div>
          </div>

          {/* Email Verification */}
          <div className="space-y-6 pt-6 border-t border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-linear-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Email Verification</h3>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  id="email"
                  type="email"
                  value={formData.studentEmail}
                  onChange={(e) => handleInputChange('studentEmail', e.target.value)}
                  className="flex-1 px-5 py-4 border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none text-slate-900 rounded-xl transition-all text-lg"
                  placeholder="Enter your email"
                  required
                  disabled={otpState.verified}
                />
                {!otpState.verified && (
                  <button
                    type="button"
                    onClick={handleSendOTP}
                    disabled={!formData.studentEmail || otpState.loading || otpState.sent}
                    className="w-full sm:w-auto px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                  >
                    {otpState.loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : otpState.sent ? (
                      'OTP Sent'
                    ) : (
                      'Send OTP'
                    )}
                  </button>
                )}
                {otpState.verified && (
                  <div className="px-6 py-4 bg-green-50 border-2 border-green-200 flex items-center gap-3 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-700">Verified</span>
                  </div>
                )}
              </div>
              {otpState.error && (
                <p className="text-sm text-red-600 mt-2 flex items-center gap-2 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4" />
                  {otpState.error}
                </p>
              )}
            </div>

            {/* OTP Input */}
            {otpState.sent && !otpState.verified && (
              <div className="space-y-4 bg-linear-to-br from-indigo-50 to-purple-50 p-4 sm:p-6 rounded-2xl border border-indigo-200">
                <label className="block text-sm font-semibold text-slate-700">Enter OTP</label>
                <div className="flex gap-2 sm:gap-3 justify-center">
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
                      className="w-10 h-10 sm:w-14 sm:h-14 text-center text-lg sm:text-2xl font-bold border-2 border-indigo-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none rounded-lg sm:rounded-xl bg-white transition-all"
                      aria-label={`OTP digit ${index + 1}`}
                    />
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <p className="text-sm text-slate-600">
                    {otpState.remainingAttempts < 5 && (
                      <span className="text-orange-600 font-medium">Remaining attempts: {otpState.remainingAttempts}</span>
                    )}
                  </p>
                  <button
                    type="button"
                    onClick={handleVerifyOTP}
                    disabled={otpDigits.join('').length !== 6 || otpState.loading}
                    className="w-full sm:w-auto px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
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
          <div className="space-y-6 pt-6 border-t border-slate-200">
            <h3 className="text-xl font-bold text-slate-900">Parent Information</h3>

            <div>
              <label htmlFor="guardian-name" className="block text-sm font-semibold text-slate-700 mb-2">
                Parent Name <span className="text-red-500">*</span>
              </label>
              <input
                id="guardian-name"
                type="text"
                value={formData.studentGuardianName}
                onChange={(e) => handleInputChange('studentGuardianName', e.target.value)}
                className="w-full px-5 py-4 border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none text-slate-900 rounded-xl transition-all text-lg"
                placeholder="Enter parent's name"
                required
              />
            </div>

            <div>
              <label htmlFor="guardian-phone" className="block text-sm font-semibold text-slate-700 mb-2">
                Parent Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                id="guardian-phone"
                type="tel"
                value={formData.studentGuardianNumber}
                onChange={(e) => handleInputChange('studentGuardianNumber', e.target.value)}
                className="w-full px-5 py-4 border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none text-slate-900 rounded-xl transition-all text-lg"
                placeholder="Enter parent's phone number"
                pattern="[0-9]{10}"
                required
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-6 pt-6 border-t border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Location</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="state" className="block text-sm font-semibold text-slate-700 mb-2">
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  id="state"
                  value={formData.location.state}
                  onChange={(e) => handleInputChange('location.state', e.target.value)}
                  className="w-full px-5 py-4 border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none text-slate-900 rounded-xl transition-all text-lg bg-white"
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
                <label htmlFor="district" className="block text-sm font-semibold text-slate-700 mb-2">
                  District <span className="text-red-500">*</span>
                </label>
                <select
                  id="district"
                  value={formData.location.district}
                  onChange={(e) => handleInputChange('location.district', e.target.value)}
                  className="w-full px-5 py-4 border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none text-slate-900 rounded-xl transition-all text-lg bg-white"
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
              <p className="text-sm text-slate-600 flex items-center gap-2 bg-slate-50 p-3 rounded-lg">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading location data...
              </p>
            )}
          </div>

          {/* Test Selection */}
          <div className="space-y-6 pt-6 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Select Tests <span className="text-red-500">*</span>
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  You can select multiple tests. This is your only chance to register - you cannot add tests later if you miss them now.
                </p>
              </div>
              {validation.isCoursesSelected && (
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-700">{formData.registeredCourses.length} selected</span>
                </div>
              )}
            </div>

            {activeTests.loading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
              </div>
            )}

            {activeTests.error && (
              <div className="p-6 bg-red-50 border-2 border-red-200 text-red-700 rounded-2xl">
                {activeTests.error}
              </div>
            )}

            {!activeTests.loading && !activeTests.error && (
              <div className="grid gap-4" role="group" aria-label="Test selection">
                {(activeTests.data as Test[]).map((test, index) => {
                  const isSelected = formData.registeredCourses.includes(test.id);
                  
                  return (
                    <div
                      key={test.id || `test-${index}`}
                      onClick={() => {
                        dispatch(toggleCourseSelection(test.id));
                      }}
                      className={`group p-6 border-2 cursor-pointer transition-all duration-300 rounded-2xl ${
                        isSelected
                          ? 'border-indigo-500 bg-linear-to-br from-indigo-50 to-purple-50 shadow-lg'
                          : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                      }`}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          dispatch(toggleCourseSelection(test.id));
                        }
                      }}
                      aria-pressed={isSelected.toString()}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-900 mb-2 text-lg">{test.name || 'No Title'}</h4>
                          <p className="text-slate-600">{test.description || 'No Description'}</p>
                        </div>
                        {isSelected && (
                          <div className="w-8 h-8 bg-linear-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center ml-4">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Referral Code */}
          <div className="space-y-6 pt-6 border-t border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-linear-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Gift className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Referral Code <span className="text-sm font-normal text-slate-500 ml-2">(Optional)</span>
              </h3>
            </div>

            <div>
              <label htmlFor="referral-code" className="block text-sm font-semibold text-slate-700 mb-2">Enter Referral Code</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  id="referral-code"
                  type="text"
                  value={referralState.code}
                  onChange={(e) => dispatch(updateReferralCode(e.target.value.toUpperCase()))}
                  className="flex-1 px-5 py-4 border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none text-slate-900 rounded-xl transition-all text-lg uppercase font-mono tracking-widest"
                  placeholder="XXXXX"
                  maxLength={5}
                />
                <button
                  type="button"
                  onClick={handleReferralCheck}
                  disabled={referralState.code.length !== 5 || referralState.loading}
                  className="w-full sm:w-auto px-8 py-4 bg-linear-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-700 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {referralState.loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    'Check'
                  )}
                </button>
              </div>
              
              {referralState.checked && referralState.isValid && (
                <div className="mt-3 flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-700 font-medium">Referred by: <span className="font-bold">{referralState.referrerName}</span></span>
                </div>
              )}
              
              {referralState.checked && !referralState.isValid && (
                <div className="mt-3 flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <span className="text-red-700 font-medium">{referralState.error}</span>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-slate-200">
            {!canSubmit && (
              <div className="mb-6 p-6 bg-linear-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-amber-900 mb-3 text-lg">Complete these steps to register:</p>
                    <ul className="space-y-2 text-amber-800">
                      {!validation.isEmailVerified && (
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                          Verify your email address
                        </li>
                      )}
                      {!validation.isCoursesSelected && (
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                          Select at least one test
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit || registrationState.loading}
              className="w-full py-5 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              <span>Complete Registration</span>
              <CheckCircle className="w-6 h-6" />
            </button>

            {registrationState.error && (
              <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <span className="text-red-700 font-medium">{registrationState.error}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}