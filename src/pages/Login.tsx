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
    const redirectUrl = `${window.location.origin}/reset-password`;
    console.log("Attempting to send password reset email with redirect to:", redirectUrl); // Added console log
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
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
          <div className="text-center mt-2">
            <a
              onClick={handleForgotPassword}
              className="inline-block text-sm text-gray-400 transition-all duration-300 cursor-pointer group"
            >
              <span className="inline-block group-hover:scale-105 group-hover:bg-gradient-to-r group-hover:from-orbitoGradientStart group-hover:to-orbitoGradientEnd group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300">
                Forgot password?
              </span>
            </a>
          </div>
        </div>
        {/* Primary Login Button */}
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-orbitoGradientStart to-orbitoGradientEnd text-white font-bold py-2 px-4 rounded-md
                     bg-[size:200%_auto] bg-[position:0%_50%] hover:bg-[position:100%_50%]
                     hover:scale-105 transition-all duration-500 ease-in-out"
          disabled={loading}
        >
          {loading ? "Logging In..." : "Log In"}
        </Button>

        <div className="relative flex justify-center items-center my-4">
          <div className="absolute w-full border-t border-gray-700"></div>
          <span className="relative z-10 bg-orbitoCardBg px-2 text-gray-400 text-xs uppercase">
            Or
          </span>
        </div>

        {/* Secondary Sign Up Button */}
        <Button
          type="button"
          onClick={() => navigate("/signup")}
          className="w-full bg-gradient-to-r from-orbitoGradientStart to-orbitoGradientEnd text-white font-bold py-2 px-4 rounded-md
                     bg-[size:200%_auto] bg-[position:0%_50%] hover:bg-[position:100%_50%]
                     hover:scale-105 transition-all duration-500 ease-in-out"
          disabled={loading}
        >
          Sign Up
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Login;