import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-white text-sm text-gray-600 dark:bg-gray-900 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex flex-wrap justify-center space-x-1 md:space-x-4">
            <Link 
              href="/read" 
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 px-2 py-1"
            >
              Blog
            </Link>
            <span className="text-gray-400">|</span>
            <Link 
              href="/#about" 
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 px-2 py-1"
            >
              About Us
            </Link>
            <span className="text-gray-400">|</span>
            <Link 
              href="/#visit-us" 
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 px-2 py-1"
            >
              Contact Us
            </Link>
            <span className="text-gray-400">|</span>
            <Link 
              href="/privacy-policy" 
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 px-2 py-1"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-400">|</span>
            <Link 
              href="/terms-and-conditions" 
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 px-2 py-1"
            >
              Terms & Conditions
            </Link>
            <span className="text-gray-400">|</span>
            <Link 
              href="/refund-policy" 
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 px-2 py-1"
            >
              Refund Policy
            </Link>
          </div>
          
          {/* Copyright - Bottom Row */}
          <p className="text-center">
            &copy; {new Date().getFullYear()} Exameets Skillverse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}