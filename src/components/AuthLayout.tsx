import React from "react";
import { cn } from "@/lib/utils";

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  tagline?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title = "Orbito",
  tagline = "Connect and Share with the people you know by Orbito",
}) => {
  // Split the tagline into two parts for a more balanced look
  const taglineParts = tagline.split(" ");
  const midPoint = Math.ceil(taglineParts.length / 2);
  const firstParagraph = taglineParts.slice(0, midPoint).join(" ");
  const secondParagraph = taglineParts.slice(midPoint).join(" ");

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black text-white">
      {/* Left side: Brand */}
      <div className="relative md:w-1/2 flex flex-col items-center justify-center p-8 text-center bg-black">
        <h1
          className={cn(
            "text-6xl md:text-8xl font-black mb-4 font-roboto", // Increased font size and changed to font-black
            "bg-orbito-gradient bg-clip-text text-transparent",
            "animate-gradient-shift bg-[length:200%_auto]"
          )}
        >
          {title}
        </h1>
        <div className="max-w-md"> {/* Container for the two paragraphs */}
          <p className="text-xl md:text-2xl mb-2">{firstParagraph}</p> {/* Added mb-2 for spacing */}
          <p className="text-xl md:text-2xl">{secondParagraph}</p>
        </div>
      </div>

      {/* Right side: Form Card */}
      <div className="md:w-1/2 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md bg-orbitoCardBg rounded-lg shadow-orbito-card p-6 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;