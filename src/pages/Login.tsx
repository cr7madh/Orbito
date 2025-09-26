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

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;
type ResetPasswordFormInputs = z.infer<typeof resetPasswordSchema>;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const loginForm = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const resetForm = useForm<ResetPasswordFormInputs>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleLogin = async (data: LoginFormInputs) => {
    setMessage(null);
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setMessage({ text: error.message, type: "error" });
    } else {
      setMessage({ text: "Logged in successfully!", type: "success" });
      navigate("/home");
    }
  };

  const handleResetPassword = async (data: ResetPasswordFormInputs) => {
    setMessage(null);
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: window.location.origin + "/reset-password",
    });

    if (error) {
      setMessage({ text: error.message, type: "error" });
    } else {
      setMessage({
        text: "Password reset email sent! Check your inbox.",
        type: "success",
      });
      setIsResettingPassword(false); // Go back to login form after sending email
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold text-center mb-6 text-white">
        {isResettingPassword ? "Reset Password" : "Login to Orbito"}
      </h2>

      {message && <AuthMessage message={message.text} type={message.type} />}

      {isResettingPassword ? (
        <form onSubmit={resetForm.handleSubmit(handleResetPassword)} className="space-y-4">
          <div>
            <AuthLabel htmlFor="resetEmail">Email</AuthLabel>
            <AuthInput
              id="resetEmail"
              type="email"
              placeholder="your@example.com"
              {...resetForm.register("email")}
            />
            {resetForm.formState.errors.email && (
              <p className="text-orbitoError text-sm mt-1">
                {resetForm.formState.errors.email.message}
              </p>
            )}
          </div>
          <AuthButton type="submit" className="w-full">
            Send Reset Email
          </AuthButton>
          <p className="text-center text-sm text-gray-400 mt-4">
            <button
              type="button"
              onClick={() => {
                setIsResettingPassword(false);
                setMessage(null);
                resetForm.reset();
              }}
              className="text-orbitoError hover:underline"
            >
              Back to Login
            </button>
          </p>
        </form>
      ) : (
        <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
          <div>
            <AuthLabel htmlFor="email">Email</AuthLabel>
            <AuthInput
              id="email"
              type="email"
              placeholder="your@example.com"
              {...loginForm.register("email")}
            />
            {loginForm.formState.errors.email && (
              <p className="text-orbitoError text-sm mt-1">
                {loginForm.formState.errors.email.message}
              </p>
            )}
          </div>
          <div>
            <AuthLabel htmlFor="password">Password</AuthLabel>
            <AuthInput
              id="password"
              type="password"
              placeholder="••••••••"
              {...loginForm.register("password")}
            />
            {loginForm.formState.errors.password && (
              <p className="text-orbitoError text-sm mt-1">
                {loginForm.formState.errors.password.message}
              </p>
            )}
          </div>
          <div className="space-y-3 mt-6"> {/* Added space-y-3 for button spacing */}
            <AuthButton type="button" onClick={() => navigate("/signup")} className="w-full">
              Sign Up
            </AuthButton>
            <AuthButton type="submit" className="w-full">
              Log In
            </AuthButton>
          </div>
          <p className="text-center text-sm text-gray-400 mt-4">
            <button
              type="button"
              onClick={() => {
                setIsResettingPassword(true);
                setMessage(null);
                loginForm.reset();
              }}
              className="text-orbitoError hover:underline"
            >
              Forgotten password?
            </button>
          </p>
        </form>
      )}
    </AuthLayout>
  );
};

export default Login;