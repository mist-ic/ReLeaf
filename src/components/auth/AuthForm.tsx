import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, Link } from 'react-router-dom'; // Add Link
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from "@/components/ui/use-toast";
import { LogIn } from 'lucide-react'; // Icon

// Define Zod schema for validation (only email/password)
const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }), // Min 1, as length check is done by Supabase
});

type FormData = z.infer<typeof formSchema>;

// Remove mode prop
// interface AuthFormProps {
//   mode: 'signIn' | 'signUp';
// }
// export const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
export const AuthForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      // Sign In logic only
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (signInError) throw signInError;

      toast({
        title: "Sign In Successful!",
        description: "Welcome back!",
      });
      // Redirect to challenges on successful sign-in
      navigate('/challenges'); 

    } catch (error: any) {
      console.error(`Sign In error:`, error.message);
      toast({
        title: `Error during Sign In`,
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg border-leafy-100">
      <CardHeader className="text-center">
         <div className="mx-auto bg-leafy-100 rounded-full h-16 w-16 flex items-center justify-center mb-4">
           <LogIn className="h-8 w-8 text-leafy-600" />
        </div>
        <CardTitle className="text-3xl font-bold text-leafy-800">Welcome Back!</CardTitle>
        <CardDescription className="text-leafy-600">
           Sign in to continue your eco-journey.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-leafy-700">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register('email')}
              disabled={loading}
              className="mt-1 focus:ring-leafy-500 focus:border-leafy-500"
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="password" className="text-leafy-700">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="******"
              {...register('password')}
              disabled={loading}
              className="mt-1 focus:ring-leafy-500 focus:border-leafy-500"
            />
             {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
             {/* Link to forgot password */}
             <div className="text-right mt-1">
                <Link 
                  to="/request-password-reset" 
                  className="text-xs font-medium text-leafy-600 hover:text-leafy-800 underline"
                >
                   Forgot password?
                 </Link>
             </div>
          </div>
          <Button type="submit" className="w-full eco-button text-lg py-3 mt-4" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>
      </CardContent>
       <CardFooter className="text-sm text-center justify-center">
          Don't have an account?{' '}
          <Link to="/register" className="underline font-medium text-leafy-700 hover:text-leafy-800">
             Sign up
           </Link>
       </CardFooter>
    </Card>
  );
}; 