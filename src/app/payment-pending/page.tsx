'use client';

import { Clock, Home, RefreshCw } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense, useState } from 'react';

function PaymentPendingContent() {
  const searchParams = useSearchParams();
  const txnId = searchParams.get('txnId');
  const [checking, setChecking] = useState(false);

  const checkStatus = async () => {
    if (!txnId) return;
    
    setChecking(true);
    try {
      const response = await fetch('/api/payment/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactionId: txnId })
      });
      
      const result = await response.json();
      
      if (result.success && result.data?.state === "COMPLETED") {
        window.location.href = `/payment-success?txnId=${txnId}&amount=${result.data.amount}`;
      } else if (result.data?.state === "FAILED") {
        window.location.href = `/payment-failed?txnId=${txnId}&reason=payment_failed`;
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      //console.error("Status check error:", error);
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock className="w-10 h-10 text-yellow-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Pending
        </h1>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          Your payment is being processed. This may take a few minutes. Please do not close this window.
        </p>
        
        {txnId && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-xs text-gray-500 mb-1">Transaction ID</p>
            <p className="text-sm font-mono text-gray-800 break-all">{txnId}</p>
          </div>
        )}
        
        <div className="space-y-3">
          <button 
            onClick={checkStatus}
            disabled={checking}
            className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 text-sm font-medium tracking-wide hover:bg-gray-900 transition-all duration-300 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${checking ? 'animate-spin' : ''}`} />
            {checking ? 'Checking...' : 'Check Status'}
          </button>
          
          <Link 
            href="/"
            className="flex items-center justify-center gap-2 w-full border border-gray-300 text-gray-700 px-6 py-3 text-sm font-medium tracking-wide hover:bg-gray-50 transition-all duration-300"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Payment taking too long?{' '}
            <a href="mailto:support@exameets.com" className="text-black hover:underline">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPendingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <PaymentPendingContent />
    </Suspense>
  );
}
