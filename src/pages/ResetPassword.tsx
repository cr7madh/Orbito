import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/lib/supabaseClient";
import { AuthInput } from "@/components/ui/auth-input";
import { AuthLabel } from "@/components/ui/auth-label";
import { AuthButton } from "@/components/ui/auth-button";
import AuthMessage from "@/components/AuthMessage";

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormInputs = z.infer<typeof resetPasswordSchema>;

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormInputs>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    // Supabase automatically handles session from URL hash for password reset
    // We just need to ensure the user is logged in to update their password
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setMessage({ text: "Invalid or expired reset link. Please try again.", type: "error" });
        navigate("/login"); // Redirect if no session is found
      }
      setLoading(false);
    };
    checkSession();
  }, [navigate]);

  const handlePasswordReset = async (data: ResetPasswordFormInputs) => {
    setMessage(null);
    const { error } = await supabase.auth.updateUser({
      password: data.password,
    });

    if (error) {
      setMessage({ text: error.message, type: "error" });
    } else {
      setMessage({ text: "Your password has been updated successfully!", type: "success" });
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-orbito-reset-gradient text-white p-4">
      <div className="w-full max-w-md bg-orbitoCardBg rounded-lg shadow-orbito-card p-6 md:p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          Set New Password
        </h2>

        {message && <AuthMessage message={message.text} type={message.type} />}

        <form onSubmit={handleSubmit(handlePasswordReset)} className="space-y-4">
          <div>
            <AuthLabel htmlFor="password">New Password</AuthLabel>
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
          <div>
            <AuthLabel htmlFor="confirmPassword">Confirm New Password</AuthLabel>
            <AuthInput
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-orbitoError text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <AuthButton type="submit" className="w-full">
            Update Password
          </AuthButton>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;