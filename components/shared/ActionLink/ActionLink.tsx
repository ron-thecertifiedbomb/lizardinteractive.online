import React from 'react';
import Link from 'next/link';

interface ActionLinkProps {
    href: string;
    label: React.ReactNode; // Allows passing strings or variables like {utilities.length}
    showArrow?: boolean;
    className?: string; // Allows you to add custom margins per page
}

export default function ActionLink({
    href,
    label,
    showArrow = true,
    className = ""
}: ActionLinkProps) {
    return (
        <div className={`text-center ${className}`}>
            <Link
                href={href}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-emerald-400 hover:border-emerald-500/50 transition-all duration-300 text-xs md:text-sm font-bold uppercase tracking-widest shadow-lg hover:shadow-emerald-500/10"
            >
                {label}
                {showArrow && (
                    <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                )}
            </Link>
        </div>
    );
}