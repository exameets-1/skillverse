'use client';

import { XCircle, Home, RefreshCw, HelpCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function PaymentFailedContent() {
  const searchParams = useSearchParams();
  const txnId = searchParams.get('txnId');

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-10 h-10 text-red-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Failed
        </h1>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          Unfortunately, your payment could not be processed. This could be due to insufficient funds, network issues, or other technical problems.
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
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Link>
          
          <Link 
            href="/"
            className="flex items-center justify-center gap-2 w-full border border-gray-300 text-gray-700 px-6 py-3 text-sm font-medium tracking-wide hover:bg-gray-50 transition-all duration-300"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          
          <a 
            href="mailto:support@exameets.com"
            className="flex items-center justify-center gap-2 w-full text-gray-500 px-6 py-3 text-sm font-medium tracking-wide hover:text-gray-700 transition-all duration-300"
          >
            <HelpCircle className="w-4 h-4" />
            Contact Support
          </a>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="text-xs text-gray-500 space-y-1">
            <p>Common reasons for payment failure:</p>
            <ul className="text-left space-y-1 mt-2">
              <li>• Insufficient balance in account</li>
              <li>• Network connectivity issues</li>
              <li>• Card/UPI transaction limits exceeded</li>
              <li>• Bank server temporarily unavailable</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentFailedPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <PaymentFailedContent />
    </Suspense>
  );
}
