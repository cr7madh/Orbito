import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const AuthInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <Input
      className={cn(
        "bg-orbitoInputBg text-white rounded-md border-none focus:ring-2 focus:ring-orbitoError placeholder:text-gray-400 text-center",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
AuthInput.displayName = "AuthInput";

export { AuthInput };