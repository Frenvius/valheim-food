"use client";

import * as React from "react";
import { Copy, Check } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface PrefabCellProps {
  prefab: string;
}

export const PrefabCell = ({ prefab }: PrefabCellProps) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(prefab);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="group flex items-center gap-1 w-[120px]">
      <Tooltip content={prefab} side="top" triggerClassName="flex-1 min-w-0 overflow-hidden">
        <span className="block truncate text-sm text-muted-foreground cursor-default">
          {prefab}
        </span>
      </Tooltip>
      <Tooltip content={copied ? "Copied!" : "Copy"} side="top">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
          onClick={handleCopy}
        >
          {copied ? (
            <Check className="h-3 w-3 text-green-500" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </Button>
      </Tooltip>
    </div>
  );
};
