import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/lib/supabaseClient";
import AuthLayout from "@/components/AuthLayout";
import { AuthInput } from "@/components/ui/auth-input";
import { AuthLabel } from "@/components/ui/auth-label";
import { AuthButton } from "@/components/ui/auth-button";
import AuthMessage from "@/components/AuthMessage";

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupFormInputs = z.infer<typeof signupSchema>;

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignup = async (data: SignupFormInputs) => {
    setMessage(null);
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: window.location.origin + "/home", // Redirect to home after email confirmation
      },
    });

    if (error) {
      setMessage({ text: error.message, type: "error" });
    } else {
      setMessage({
        text: "Account created! Check your email for a confirmation link.",
        type: "success",
      });
      // Optionally redirect to a "check email" page or login after signup
      // navigate("/login");
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold text-center mb-6 text-white">
        Create Your Orbito Account
      </h2>

      {message && <AuthMessage message={message.text} type={message.type} />}

      <form onSubmit={handleSubmit(handleSignup)} className="space-y-4">
        <div>
          <AuthLabel htmlFor="email">Email</AuthLabel>
          <AuthInput
            id="email"
            type="email"
            placeholder="your@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-orbitoError text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <AuthLabel htmlFor="password">Password</AuthLabel>
          <AuthInput
            id="password"
            type="password"
            placeholder="••••••••"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-orbitoError text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="space-y-3 mt-6"> {/* Added space-y-3 for button spacing */}
          <AuthButton type="submit" className="w-full">
            Sign Up
          </AuthButton>
          <AuthButton type="button" onClick={() => navigate("/login")} className="w-full">
            Log In
          </AuthButton>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Signup;