import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabaseClient'; // Import supabase client
import { useToast } from "@/components/ui/use-toast";

// Define Zod schema for validation
const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

type FormData = z.infer<typeof formSchema>;

interface AuthFormProps {
  mode: 'signIn' | 'signUp';
}

export const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
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
      if (mode === 'signUp') {
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
        });
        if (error) throw error;
        // TODO: Add profile creation step after sign up
        toast({
          title: "Sign Up Successful!",
          description: "Please check your email to verify your account.",
        });
        // TODO: Redirect or update UI
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
        if (error) throw error;
        toast({
          title: "Sign In Successful!",
          description: "Welcome back!",
        });
        // TODO: Redirect or update UI
      }
    } catch (error: any) {
      console.error(`${mode} error:`, error.message);
      toast({
        title: `Error during ${mode}`,
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{mode === 'signIn' ? 'Sign In' : 'Sign Up'}</CardTitle>
        <CardDescription>
          {mode === 'signIn'
            ? 'Enter your credentials to access your account.'
            : 'Create an account to get started.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register('email')}
              disabled={loading}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register('password')}
              disabled={loading}
            />
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Processing...' : mode === 'signIn' ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>
      </CardContent>
       {/* Optional: Add link to switch between Sign In/Sign Up */}
       <CardFooter className="text-sm text-center justify-center">
         {/* TODO: Add navigation link */}
       </CardFooter>
    </Card>
  );
}; 