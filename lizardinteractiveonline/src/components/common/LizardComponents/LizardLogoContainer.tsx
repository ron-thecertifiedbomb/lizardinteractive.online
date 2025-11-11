import React, { useEffect, useRef } from "react";

interface LizardLogoContainerProps {
  logoFill?: string;
  logoStroke?: string;
  logoHeight?: string | number;
  logoWidth?: string | number;
  svg?: React.FC<React.SVGProps<SVGSVGElement>>;
  className?: string;
  onClick?: () => void;
  rotateIds?: string[];   // IDs to rotate
  rotateSpeed?: number;   // seconds per full rotation
}

export function LizardLogoContainer({
  svg: SvgIcon,
  logoFill,
  logoStroke,
  logoWidth,
  logoHeight,
  className,
  onClick,
  rotateIds,
  rotateSpeed = 0, // one full rotation in 4s
}: LizardLogoContainerProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!svgRef.current) return;

    // Apply fill and stroke to all SVG elements
    svgRef.current.querySelectorAll("*").forEach((el) => {
      const svgEl = el as SVGElement;
      if (logoFill) {
        svgEl.setAttribute("fill", logoFill);
        (svgEl.style as any).fill = logoFill;
      }
      if (logoStroke) {
        svgEl.setAttribute("stroke", logoStroke);
        (svgEl.style as any).stroke = logoStroke;
      }
    });

    if (!rotateIds || rotateIds.length === 0) return;

    // Query elements to rotate
    const elements: SVGGraphicsElement[] = rotateIds
      .map((id) => svgRef.current!.querySelector(`#${id}`) as SVGGraphicsElement | null)
      .filter((el): el is SVGGraphicsElement => el !== null);

    if (elements.length === 0) return;

    // Get SVG center for rotation
    const svgBox = svgRef.current.getBBox();
    const cx = svgBox.x + svgBox.width / 2;
    const cy = svgBox.y + svgBox.height / 2;

    let start: number | null = null;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const deg = ((elapsed / (rotateSpeed * 1000)) * 360) % 360;

      elements.forEach((el) => {
        el.setAttribute("transform", `rotate(${deg}, ${cx}, ${cy})`);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [logoFill, logoStroke, rotateIds, rotateSpeed]);

  if (!SvgIcon) return null;

  return (
    <SvgIcon
      ref={svgRef}
      onClick={onClick}
      className={className}
      style={{
        width: logoWidth ?? "100%",
        height: logoHeight ?? "100%",
        display: "block",
        cursor: "pointer",
      }}
    />
  );
}
