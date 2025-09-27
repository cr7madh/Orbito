import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/components/AuthLayout";
import { toast } from "sonner";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged in successfully!");
      navigate("/home");
    }
    setLoading(false);
  };

  const handleForgotPassword = async () => {
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password reset email sent. Check your inbox!");
    }
    setLoading(false);
  };

  return (
    <AuthLayout>
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <Label htmlFor="email" className="text-white">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 bg-orbitoInputBg text-white border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <div>
          <Label htmlFor="password" className="text-white">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 bg-orbitoInputBg text-white border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        {/* Primary Login Button */}
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-orbitoGradientStart to-orbitoGradientEnd text-white font-bold py-2 px-4 rounded-md hover:opacity-90 transition-opacity"
          disabled={loading}
        >
          {loading ? "Logging In..." : "Log In"}
        </Button>

        <div className="text-center text-gray-400 text-sm">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-gray-400 hover:text-white transition-colors"
            disabled={loading}
          >
            Forgot password?
          </button>
        </div>

        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-orbitoCardBg px-2 text-gray-400">
            Or
          </span>
        </div>

        {/* Secondary Sign Up Button */}
        <Button
          type="button"
          onClick={() => navigate("/signup")}
          className="w-full bg-gradient-to-r from-orbitoGradientStart to-orbitoGradientEnd text-white font-bold py-2 px-4 rounded-md hover:opacity-90 transition-opacity"
          disabled={loading}
        >
          Sign Up
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Login;