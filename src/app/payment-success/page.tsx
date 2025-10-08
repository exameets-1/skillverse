'use client';

import { CheckCircle, Home, Download } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const txnId = searchParams.get('txnId');

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Successful!
        </h1>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          Thank you for your enrollment. You will receive a confirmation email with course details and access instructions shortly.
        </p>
        
        {txnId && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-xs text-gray-500 mb-1">Transaction ID</p>
            <p className="text-sm font-mono text-gray-800 break-all">{txnId}</p>
          </div>
        )}
        
        <div className="space-y-3">
          <Link 
            href="/"
            className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 text-sm font-medium tracking-wide hover:bg-gray-900 transition-all duration-300"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          
          <button className="flex items-center justify-center gap-2 w-full border border-gray-300 text-gray-700 px-6 py-3 text-sm font-medium tracking-wide hover:bg-gray-50 transition-all duration-300">
            <Download className="w-4 h-4" />
            Download Receipt
          </button>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Need help? Contact us at{' '}
            <a href="mailto:support@exameets.com" className="text-black hover:underline">
              support@exameets.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
