import React, { ReactNode, ReactElement } from "react";


interface LizardTechStackLogosProps {
  skills?: string[];
  className?: string;
  stack?: { label: string; icon: ReactNode; url?: string }[];
}

export function LizardTechStackLogos({
  skills,
  className,
  stack = [],
}: LizardTechStackLogosProps) {
  const filteredStack = skills?.length
    ? stack.filter((tech) => skills.includes(tech.label))
    : stack;

  return (
    <div className="flex justify-center items-center gap-4">
      {filteredStack.map((tech) => (
        <a
          key={tech.label}
          href={tech.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={tech.label}
          title={tech.label}
          className="flex-shrink-0 flex items-center justify-center"
        >
          {React.isValidElement<{ className?: string }>(tech.icon)
            ? React.cloneElement(
                tech.icon as ReactElement<{ className?: string }>,
                {
                  className: `${
                    (tech.icon as ReactElement<{ className?: string }>).props
                      .className ?? ""
                  } ${className ?? ""}`,
                }
              )
            : tech.icon}
        </a>
      ))}
    </div>
  );
}
