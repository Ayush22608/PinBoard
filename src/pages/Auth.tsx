import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, User } from 'firebase/auth';
import { auth } from '../config/firebase';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      if (user) {
        // Check if user is admin (in a real app, this would check a database)
        if (user.email === 'admin@pinboard.com') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error: any) {
      setError(error.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      
      navigate('/');
    } catch (error: any) {
      let errorMessage = 'Failed to authenticate';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password';
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email already in use';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters';
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Mock login for demo purposes
  const handleMockLogin = (type: string) => {
    if (type === 'admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 shadow-sm">
        <div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-12 h-12 bg-secondary-500 rounded-sm transform -rotate-12"></div>
              <div className="absolute top-2 left-1.5 w-2 h-2 bg-white rounded-full z-10"></div>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extralight text-neutral-900">
            {isLogin ? 'Sign in to PinBoard' : 'Create an account'}
          </h2>
          <p className="mt-2 text-center text-sm text-neutral-600">
            {isLogin ? 'Access your account' : 'Join our community'}
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-3 text-sm rounded">
            {error}
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleEmailAuth}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-3 py-3 border border-neutral-200 placeholder-neutral-400 text-neutral-900 focus:outline-none focus:ring-secondary-500 focus:border-secondary-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isLogin ? "current-password" : "new-password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-3 py-3 border border-neutral-200 placeholder-neutral-400 text-neutral-900 focus:outline-none focus:ring-secondary-500 focus:border-secondary-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 disabled:bg-neutral-400"
            >
              {loading ? 'Processing...' : isLogin ? 'Sign in' : 'Sign up'}
            </button>
          </div>
        </form>
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-neutral-500">Or continue with</span>
          </div>
        </div>
        
        <div>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="group relative w-full flex justify-center py-3 px-4 border border-neutral-200 text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 disabled:bg-neutral-100"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-neutral-500" viewBox="0 0 24 24" fill="none">
                <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107"/>
                <path d="M3.15295 7.3455L6.43845 9.755C7.32745 7.554 9.48045 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15895 2 4.82795 4.1685 3.15295 7.3455Z" fill="#FF3D00"/>
                <path d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5718 17.5742 13.3038 18.001 12 18C9.39903 18 7.19053 16.3415 6.35853 14.027L3.09753 16.5395C4.75253 19.778 8.11353 22 12 22Z" fill="#4CAF50"/>
                <path d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1976D2"/>
              </svg>
            </span>
            {loading ? 'Processing...' : 'Sign in with Google'}
          </button>
          
          {/* For demo purposes only - remove in production */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleMockLogin('user')}
              className="py-2 px-4 text-xs border border-neutral-200 text-neutral-700 bg-white hover:bg-neutral-50"
            >
              Demo User Login
            </button>
            <button
              type="button"
              onClick={() => handleMockLogin('admin')}
              className="py-2 px-4 text-xs border border-secondary-200 text-secondary-700 bg-white hover:bg-secondary-50"
            >
              Demo Admin Login
            </button>
          </div>
        </div>
        
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="font-medium text-secondary-600 hover:text-secondary-500 text-sm"
          >
            {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth; 