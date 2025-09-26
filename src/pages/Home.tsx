import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { AuthButton } from "@/components/ui/auth-button";
import AuthMessage from "@/components/AuthMessage";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email);
      } else {
        navigate("/login");
      }
    };
    getUser();
  }, [navigate]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setMessage({ text: error.message, type: "error" });
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Orbito!</h1>
        {userEmail && <p className="text-xl text-gray-300 mb-6">Logged in as: {userEmail}</p>}
        <AuthButton onClick={handleLogout}>
          Logout
        </AuthButton>
        {message && <AuthMessage message={message.text} type={message.type} className="mt-4" />}
      </div>
    </div>
  );
};

export default Home;