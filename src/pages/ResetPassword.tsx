import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/components/AuthLayout";
import { toast } from "sonner";

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      if (!session) {
        toast.error("Invalid or expired password reset link. Please request a new one.");
        navigate("/login");
      }
    };
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (!session) {
          toast.error("Invalid or expired password reset link. Please request a new one.");
          navigate("/login");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Your password has been updated successfully!");
      navigate("/login");
    }
    setLoading(false);
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Checking reset link...</p>
      </div>
    );
  }

  return (
    <AuthLayout>
      <form onSubmit={handlePasswordReset} className="space-y-6">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Set New Password</h2>
        <div>
          <Label htmlFor="password" className="text-white">New Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 bg-orbitoInputBg text-white border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword" className="text-white">Confirm New Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="mt-1 bg-orbitoInputBg text-white border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-orbitoGradientStart to-orbitoGradientEnd text-white font-bold py-2 px-4 rounded-md hover:opacity-90 transition-opacity"
          disabled={loading}
        >
          {loading ? "Updating Password..." : "Reset Password"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;