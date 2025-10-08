"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

interface EnrollButtonProps {
  amount: number;
  courseName: string;
  userId?: string;
  mobileNumber?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function EnrollButton({ 
  amount, 
  courseName, 
  userId = "USER123", 
  mobileNumber = "9999999999",
  className = "bg-black text-white px-8 py-4 text-sm font-medium tracking-wide hover:bg-gray-900 transition-all duration-300 group",
  children
}: EnrollButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleEnroll = async () => {
    try {
      setLoading(true);
      console.log("Initiating payment with:", { amount, courseName, userId, mobileNumber });
      
      const res = await fetch("/api/payment/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amount,
          userId: userId,
          mobileNumber: mobileNumber,
          courseName: courseName,
        }),
      });

      console.log("Response status:", res.status);
      
      if (!res.ok) {
        const errorData = await res.json();
        console.error("API Error:", errorData);
        alert(`Payment initiation failed: ${errorData.message || 'Unknown error'}`);
        return;
      }

      const data = await res.json();
      console.log("Payment response:", data);
      
      // Check for success and redirect URL
      if (data.success && data.data?.instrumentResponse?.redirectInfo?.url) {
        const url = data.data.instrumentResponse.redirectInfo.url;
        console.log("Redirecting to:", url);
        window.location.href = url;
      } else {
        console.error("Payment initiation failed - no redirect URL:", data);
        alert(`Payment initiation failed: ${data.message || 'No redirect URL received'}`);
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleEnroll}
      disabled={loading}
      className={className}
    >
      {loading ? "Redirecting..." : children || "Enroll Now"}
      {!loading && (
        <ArrowRight className="inline-block w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      )}
    </button>
  );
}
