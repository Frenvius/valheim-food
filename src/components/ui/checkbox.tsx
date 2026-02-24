"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/usecase/util";

export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          ref={ref}
          className={cn(
            "peer h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 checked:bg-primary checked:text-primary-foreground",
            className
          )}
          {...props}
        />
        <Check className="pointer-events-none absolute left-0.5 top-0.5 h-3 w-3 text-primary-foreground opacity-0 peer-checked:opacity-100" />
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
