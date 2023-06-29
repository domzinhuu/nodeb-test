import React, { ReactNode } from "react";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

interface NodeTooltipProps {
  content: ReactNode;
  children: any;
}
const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    width: "100%",
    maxWidth: 450,
    fontSize: "0.75rem",
    border: "1px solid #dadde9",
    padding: "1rem",
  },
  [`& .${tooltipClasses.tooltip} p`]: {
    paddingBottom: "0.5rem",
  },
  [`& .${tooltipClasses.tooltip} ul li:first-child`]: {
    paddingTop: "1rem",
  },
  [`& .${tooltipClasses.tooltip} ul li`]: {
    paddingBottom: "1rem",
  },
}));

export function NodebTooltip({ children, content }: NodeTooltipProps) {
  return <HtmlTooltip title={<>{content}</>}>{children}</HtmlTooltip>;
}
