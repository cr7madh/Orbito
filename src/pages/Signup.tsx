import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/components/AuthLayout";
import { toast } from "sonner";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Sign up successful! Please check your email to confirm your account.");
      navigate("/login"); // Redirect to login after successful signup
    }
    setLoading(false);
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSignup} className="space-y-6">
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
        {/* Primary Sign Up Button */}
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-orbitoGradientStart to-orbitoGradientEnd text-white font-bold py-2 px-4 rounded-md hover:opacity-90 transition-opacity"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>

        <div className="relative flex justify-center items-center my-4">
          <div className="absolute w-full border-t border-gray-700"></div>
          <span className="relative z-10 bg-orbitoCardBg px-2 text-gray-400 text-xs uppercase">
            Or
          </span>
        </div>

        {/* Secondary Login Button */}
        <Button
          type="button"
          onClick={() => navigate("/login")}
          className="w-full bg-gradient-to-r from-orbitoGradientStart to-orbitoGradientEnd text-white font-bold py-2 px-4 rounded-md hover:opacity-90 transition-opacity"
          disabled={loading}
        >
          Log In
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Signup;