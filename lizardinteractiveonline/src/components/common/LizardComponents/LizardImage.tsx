

interface LizardImageProps {
  src?: string;
  alt?: string;
  className?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

export function LizardImage({
  src,
  alt = "image",
  className = "",
  objectFit = "contain",
}: LizardImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={`h-auto ${className}`}
      style={{ objectFit }}
    />
  );
}