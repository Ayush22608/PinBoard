import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  }, [user, navigate]);

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
        console.log('Attempting login with:', { email });
        await login(email, password);
      } else {
        if (!name) {
          setError('Please enter your name');
          return;
        }
        console.log('Attempting registration with:', { name, email });
        await register(name, email, password);
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      setError(error.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
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
        
        <form onSubmit={handleEmailAuth} className="space-y-6">
          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-3 border border-neutral-200 placeholder-neutral-400 text-neutral-900 focus:outline-none focus:ring-secondary-500 focus:border-secondary-500 focus:z-10 sm:text-sm"
                  placeholder="Your name"
                />
              </div>
            )}
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