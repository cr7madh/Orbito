import * as React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const AuthLabel = React.forwardRef<
  HTMLLabelElement,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  return (
    <Label
      className={cn("text-white font-semibold mb-2", className)}
      ref={ref}
      {...props}
    />
  );
});
AuthLabel.displayName = "AuthLabel";

export { AuthLabel };