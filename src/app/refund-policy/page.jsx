export default function RefundPolicy() {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white">
            <h1 className="text-3xl font-bold mb-6 text-center text-black">Refund & Cancellation Policy</h1>
            
            <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed">
                    Please read our refund and cancellation policy carefully before making any purchases. This policy outlines the specific conditions under which refunds may be processed.
                </p>

                <h2 className="text-2xl font-semibold mt-8 text-black mb-4">Refund Eligibility</h2>
                <p className="text-gray-700 mb-3">You are entitled to a refund only under the following specific circumstances:</p>
                <ul className="list-disc pl-6 space-y-3 text-gray-700">
                    <li><strong>Course Not Assigned:</strong> If the purchased course is not assigned to you within the expiration date from your date of purchase</li>
                    <li><strong>Duplicate Payment:</strong> If you have paid twice for the same course</li>
                </ul>

                <h2 className="text-2xl font-semibold text-black mt-8 mb-4">No Refund Policy</h2>
                <ul className="list-disc pl-6 space-y-3 text-gray-700">
                    <li>Under any other circumstance, we will not consider any requests for refund</li>
                    <li>This is a digital course purchase and all sales are final except for the conditions mentioned above</li>
                    <li>Once the course content is accessed or downloaded, no refunds will be processed unless it falls under the eligible circumstances</li>
                </ul>

                <h2 className="text-2xl font-semibold text-black mt-8 mb-4">Important Notes</h2>
                <ul className="list-disc pl-6 space-y-3 text-gray-700">
                    <li>All refund requests must be accompanied by proper documentation and proof of the eligible circumstances</li>
                    <li>Refund processing may take 7-14 business days once approved</li>
                    <li>Refunds will be processed through the original payment method used for the purchase</li>
                    <li>For any refund-related queries, please contact our support team with your order details</li>
                </ul>

                <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                    <p className="text-gray-800 font-medium text-center">
                        By purchasing our courses, you acknowledge and agree to this refund and cancellation policy.
                    </p>
                </div>
            </div>
        </div>
    );
}