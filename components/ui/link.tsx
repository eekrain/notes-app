import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import React from "react";

type Props = { children: React.ReactNode; className?: string };

export const LinkSimple = (props: Props & LinkProps) => {
  const { children, className, ...outerProps } = props;
  return (
    <Link
      {...outerProps}
      className={cn(
        "text-muted-foreground hover:text-primary hover:underline hover:underline-offset-2",
        className
      )}
    >
      {children}
    </Link>
  );
};
