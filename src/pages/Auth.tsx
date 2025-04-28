import React from 'react';
import { Link } from 'react-router-dom';

const Auth: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome to PinBoard
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to access your account
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <button
            type="button"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-gray-500 group-hover:text-gray-400" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.545,12.151L12.545,12.151c0,1.054,0.855,1.909,1.909,1.909h3.536c-0.586,1.582-1.566,3.012-2.856,4.181c-2.428,2.428-5.66,3.769-9.091,3.769c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.431,0,6.663,1.341,9.091,3.769c1.29,1.169,2.27,2.599,2.856,4.181h-3.536C13.4,10.242,12.545,11.097,12.545,12.151z M12,4.242c-4.418,0-8,3.582-8,8s3.582,8,8,8s8-3.582,8-8S16.418,4.242,12,4.242z"
                />
              </svg>
            </span>
            Sign in with Google
          </button>
          <div className="text-center">
            <Link
              to="/"
              className="font-medium text-gray-600 hover:text-gray-500"
            >
              Continue as guest
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth; 