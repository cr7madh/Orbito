import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const AuthButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ className, ...props }, ref) => {
  return (
    <Button
      className={cn(
        "bg-orbito-gradient bg-[length:200%_auto] text-white font-bold py-2 px-4 rounded-md transition-all duration-300 ease-in-out",
        "hover:scale-105 hover:animate-gradient-shift",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
AuthButton.displayName = "AuthButton";

export { AuthButton };