import React, { useEffect, useRef, useState } from "react";

interface LizardMarqueeProps {
  children: React.ReactNode[];
  speed?: number;
  className?: string;
  direction?: "left" | "right";
  gap?: number;
}

export function LizardMarquee({
  children,
  speed = 50,
  className,
  direction = "left",
  gap = 16,
}: LizardMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);

  // Measure first set width
  useEffect(() => {
    const measureWidth = () => {
      if (containerRef.current) {
        const firstSet =
          containerRef.current.querySelector<HTMLDivElement>(".marquee-set");
        if (firstSet) {
          const width = firstSet.getBoundingClientRect().width;
          setContentWidth(width);
          setOffset(direction === "left" ? 0 : width);
        }
      }
    };

    measureWidth();
    window.addEventListener("resize", measureWidth);
    return () => window.removeEventListener("resize", measureWidth);
  }, [children, direction]);

  // Animate
  useEffect(() => {
    let animationFrame: number;
    let lastTime: number;

    const step = (time: number) => {
      if (!lastTime) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;

      setOffset((prev) => {
        const deltaOffset = (speed * delta) / 1000;
        if (direction === "left") {
          const next = prev + deltaOffset;
          return next >= contentWidth ? next - contentWidth : next;
        } else {
          const next = prev - deltaOffset;
          return next <= 0 ? next + contentWidth : next;
        }
      });

      animationFrame = requestAnimationFrame(step);
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [contentWidth, speed, direction]);

  if (!children || children.length === 0) return null;

  const renderChildren = () =>
    React.Children.map(children, (child, i) => (
      <div key={i} className="flex-shrink-0">
        {child}
      </div>
    ));

return (
  <div className={`overflow-hidden ${className ?? ""}`}>
  <div
    ref={containerRef}
    className="flex transform" 
    style={{ transform: `translateX(-${offset}px)` }} // Only dynamic part remains inline
  >
    <div className="flex marquee-set gap-[16px]">{renderChildren()}</div>

    {/* Spacer between the two sets */}
    <div className={`flex-shrink-0`} style={{ width: `${gap}px` }} />

    <div className="flex marquee-set gap-[16px]">{renderChildren()}</div>
  </div>
</div>
);
}
