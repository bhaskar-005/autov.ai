import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

export default function TooltipComponent({triggerElement, tooltipContent}:{triggerElement:ReactNode, tooltipContent:ReactNode}) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          {triggerElement}
        </TooltipTrigger>
        <TooltipContent className="py-3 w-80">
          {tooltipContent}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
