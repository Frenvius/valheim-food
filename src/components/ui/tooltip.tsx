"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/usecase/util";

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
  triggerClassName?: string;
}

const Tooltip = ({ children, content, side = "top", className, triggerClassName }: TooltipProps) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [position, setPosition] = React.useState({ top: 0, left: 0 });
  const [mounted, setMounted] = React.useState(false);
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const tooltipRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useLayoutEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      let top = 0;
      let left = 0;

      switch (side) {
        case "top":
          top = rect.top - tooltipRect.height - 8;
          left = rect.left + rect.width / 2 - tooltipRect.width / 2;
          break;
        case "bottom":
          top = rect.bottom + 8;
          left = rect.left + rect.width / 2 - tooltipRect.width / 2;
          break;
        case "left":
          top = rect.top + rect.height / 2 - tooltipRect.height / 2;
          left = rect.left - tooltipRect.width - 8;
          break;
        case "right":
          top = rect.top + rect.height / 2 - tooltipRect.height / 2;
          left = rect.right + 8;
          break;
      }

      setPosition({ top, left });
    }
  }, [isVisible, side]);

  return (
    <div
      ref={triggerRef}
      className={cn("relative inline-block", triggerClassName)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {mounted &&
        isVisible &&
        createPortal(
          <div
            ref={tooltipRef}
            style={{ top: position.top, left: position.left }}
            className={cn(
              "fixed z-50 rounded-md border bg-popover p-2 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
              className
            )}
          >
            {content}
          </div>,
          document.body
        )}
    </div>
  );
};

export { Tooltip };
