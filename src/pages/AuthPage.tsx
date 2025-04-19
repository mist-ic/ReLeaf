import { AuthForm } from "@/components/auth/AuthForm";
import { useLocation, Link } from "react-router-dom";

export default function AuthPage() {
  const location = useLocation();
  const mode = location.pathname === '/login' ? 'signIn' : 'signUp';

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