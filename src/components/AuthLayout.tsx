import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black text-white">
      {/* Left Section: Logo and Tagline */}
      <div className="md:w-1/2 flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-orbitoLogoGradientStart to-orbitoLogoGradientEnd text-transparent bg-clip-text">
          Orbito
        </h1>
        <p className="text-2xl text-white max-w-lg">
          Connect and Share with the people you know <br /> by <span className="font-bold">Orbito</span>
        </p>
      </div>

      {/* Right Section: Auth Form */}
      <div className="md:w-1/2 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md bg-orbitoCardBg rounded-lg shadow-orbito-card p-6 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;