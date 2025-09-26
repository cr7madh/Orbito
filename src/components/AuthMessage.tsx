import React from "react";
import { cn } from "@/lib/utils";

interface AuthMessageProps {
  message: string;
  type: "success" | "error";
  className?: string;
}

const AuthMessage: React.FC<AuthMessageProps> = ({
  message,
  type,
  className,
}) => {
  if (!message) return null;

  const baseClasses = "p-3 rounded-md text-center text-sm font-medium mb-4";
  const typeClasses = {
    success: "bg-green-600 text-white", // Using a standard green for success
    error: "bg-orbitoError text-white",
  };

  return (
    <div className={cn(baseClasses, typeClasses[type], className)}>
      {message}
    </div>
  );
};

export default AuthMessage;