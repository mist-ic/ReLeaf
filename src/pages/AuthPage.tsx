import { AuthForm } from "@/components/auth/AuthForm";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from 'react';

export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { session, loading } = useAuth();
  const mode = location.pathname === '/login' ? 'signIn' : 'signUp';

  useEffect(() => {
    if (!loading && session) {
      navigate('/');
    }
  }, [session, loading, navigate]);

  if (loading || session) {
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <div className="w-full max-w-md px-4">
        <AuthForm mode={mode} />
        <div className="mt-4 text-center text-sm">
          {mode === 'signIn' ? (
            <>
              Don't have an account?{' '}
              <Link to="/register" className="underline">
                Sign up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Link to="/login" className="underline">
                Sign in
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 