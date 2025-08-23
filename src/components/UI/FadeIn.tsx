import { Box, type SxProps } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

type FadeInProps = {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  transitionDelay?: string;
  sx?: SxProps;
  className?: string;
};
export default function FadeIn({
  children,
  threshold = 0.05,
  rootMargin = "0px 0px 0px 0px",
  transitionDelay = "0",
  sx,
  className,
}: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  // function observerCallback(entries, options) {}

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, isVisible]);

  return (
    <Box
      ref={ref}
      sx={{
        willChange: "opacity, transform",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : "translateY(20px)",
        transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
        transitionDelay: `${transitionDelay}s`,
        ...sx,
      }}
      className={className}
    >
      {children}
    </Box>
  );
}
