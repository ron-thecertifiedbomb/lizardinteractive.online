"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ScreenContainer from "../../components/shared/ScreenContainer/ScreenContainer";

const services = [
    { id: 1, name: "Full-Stack Architecture", desc: "Next.js, TypeScript, and Scalable Vercel Deployments for high-traffic environments." },
    { id: 2, name: "Database Migration", desc: "Specializing in Supabase integration, data integrity, and complex cluster transitions." },
    { id: 3, name: "Performance Optimization", desc: "Hard-coded efficiency to achieve 100/100 Lighthouse scores and sub-second load times." },
    { id: 4, name: "Void Engine Solutions", desc: "Custom-built internal automation tools designed for niche industrial and technical workflows." }
];

// Pricing Packages with CORRECT Cal.com links
const packages = [
    {
        id: 1,
        name: "Quick Audit",
        price: "$150",
        duration: "30 min",
        features: [
            "Lighthouse score analysis",
            "Top 3 performance fixes",
            "Written summary report",
            "30-min live review"
        ],
        popular: false,
        calLink: "https://cal.com/lizard-interactive-online-m3zawr/quick-performance-audit"
    },
    {
        id: 2,
        name: "Deep Audit",
        price: "$450",
        duration: "90 min",
        features: [
            "Full Core Web Vitals breakdown",
            "Implementation roadmap",
            "1-week email support",
            "Before/after performance report",
            "Priority scheduling"
        ],
        popular: true,
        calLink: "https://cal.com/lizard-interactive-online-m3zawr/deep-performance-audit"
    },
    {
        id: 3,
        name: "Full Build",
        price: "$2,500+",
        duration: "2-4 weeks",
        features: [
            "Complete Next.js rebuild",
            "100/100 Lighthouse guaranteed",
            "30-day performance monitoring",
            "CI/CD pipeline setup",
            "Technical documentation"
        ],
        popular: false,
        calLink: "https://cal.com/lizard-interactive-online-m3zawr/discovery-call-free"
    }
];

export default function RonDevSolutions() {
    const [isHovered, setIsHovered] = useState<number | null>(null);
    const [email, setEmail] = useState("");
    const [emailStatus, setEmailStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleEmailRedirect = () => {
        window.location.href = "mailto:contact@lizardinteractive.online";
    };

    const handleNewsletterSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setEmailStatus("loading");

        // Store email in localStorage for now (upgrade to ConvertKit/Mailchimp later)
        const subscribers = JSON.parse(localStorage.getItem("newsletter_subscribers") || "[]");
        if (!subscribers.includes(email)) {
            subscribers.push(email);
            localStorage.setItem("newsletter_subscribers", JSON.stringify(subscribers));
        }

        setTimeout(() => {
            setEmailStatus("success");
            setEmail("");
            setTimeout(() => setEmailStatus("idle"), 3000);
        }, 500);
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-emerald-500 selection:text-black relative">
            <ScreenContainer variant="dark" maxWidth="xl">
                <main className="max-w-5xl mx-auto px-6 sm:px-10 pt-24 md:pt-40 pb-32">

                    {/* --- HEADER --- */}
                    <motion.header
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-20 md:mb-32 text-left"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-2 h-2 bg-emerald-500 rounded-none animate-pulse" />
                            <h1 className="text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.6em] uppercase text-zinc-500 font-black">
                                Vertical Integration & Software
                            </h1>
                        </div>
                        <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9] md:leading-none">
                            RonDev<span className="text-emerald-500">Solutions</span>
                        </h2>
                        <p className="mt-6 md:mt-8 text-zinc-500 text-xs md:text-base uppercase tracking-[0.15em] md:tracking-widest max-w-2xl leading-relaxed font-medium">
                            Engineering high-fidelity digital systems.
                            From database clusters to pixel-perfect frontends.
                        </p>
                    </motion.header>

                    {/* --- SOLUTIONS GRID --- */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 md:gap-y-20">
                        {services.map((service) => (
                            <motion.div
                                key={service.id}
                                onPointerDown={() => setIsHovered(service.id)}
                                onMouseEnter={() => setIsHovered(service.id)}
                                onMouseLeave={() => setIsHovered(null)}
                                className="group relative border-t border-zinc-900 pt-8 md:pt-10 cursor-pointer md:cursor-default touch-manipulation"
                            >
                                <motion.div
                                    className="absolute top-0 left-0 h-[2px] bg-emerald-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: isHovered === service.id ? "100%" : "0%" }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                />
                                <div className="flex items-start justify-between mb-6 pointer-events-none">
                                    <span className="text-zinc-800 font-mono text-[10px] md:text-xs font-bold">0{service.id} //</span>
                                    <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${isHovered === service.id ? 'bg-emerald-500' : 'bg-zinc-900'}`} />
                                </div>
                                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-3 md:mb-4 group-hover:text-emerald-400 transition-colors duration-300 pointer-events-none">
                                    {service.name}
                                </h3>
                                <p className="text-zinc-500 leading-relaxed text-sm md:text-base font-light pointer-events-none">
                                    {service.desc}
                                </p>
                                {/* Added CTA button for each service */}
                                <a
                                    href={service.id === 3 ? "https://cal.com/ronan-sibunga-m3zawr/quick-performance-audit" : "https://cal.com/ronan-sibunga-m3zawr/discovery-call"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block mt-6 text-emerald-500 font-mono text-xs uppercase tracking-wider hover:text-emerald-400 transition-colors"
                                >
                                    Learn More →
                                </a>
                            </motion.div>
                        ))}
                    </section>

                    {/* --- WHY CHOOSE ME SECTION (NEW) --- */}
                    <section className="mt-32 md:mt-48">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-12 md:mb-16"
                        >
                            <div className="text-emerald-500 font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase mb-4">
                                credibility_verified
                            </div>
                            <h2 className="text-2xl md:text-5xl font-black uppercase tracking-tighter">
                                Why work with me?
                            </h2>
                            <p className="text-zinc-500 text-sm md:text-base mt-4 max-w-2xl mx-auto">
                                Results speak louder than promises.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="text-center p-6 border border-zinc-900 hover:border-emerald-500/30 transition-all">
                                <div className="text-3xl font-black text-emerald-500 mb-3">100/100</div>
                                <p className="text-xs uppercase tracking-wider text-zinc-400">Lighthouse Score</p>
                                <p className="text-zinc-600 text-xs mt-2">Verified performance</p>
                            </div>
                            <div className="text-center p-6 border border-zinc-900 hover:border-emerald-500/30 transition-all">
                                <div className="text-3xl font-black text-emerald-500 mb-3">&lt;1s</div>
                                <p className="text-xs uppercase tracking-wider text-zinc-400">LCP Time</p>
                                <p className="text-zinc-600 text-xs mt-2">Sub-second loading</p>
                            </div>
                            <div className="text-center p-6 border border-zinc-900 hover:border-emerald-500/30 transition-all">
                                <div className="text-3xl font-black text-emerald-500 mb-3">0</div>
                                <p className="text-xs uppercase tracking-wider text-zinc-400">CLS</p>
                                <p className="text-zinc-600 text-xs mt-2">Zero layout shift</p>
                            </div>
                            <div className="text-center p-6 border border-zinc-900 hover:border-emerald-500/30 transition-all">
                                <div className="text-3xl font-black text-emerald-500 mb-3">24h</div>
                                <p className="text-xs uppercase tracking-wider text-zinc-400">Turnaround</p>
                                <p className="text-zinc-600 text-xs mt-2">Audit results fast</p>
                            </div>
                        </div>
                    </section>

                    {/* --- PRICING SECTION --- */}
                    <section className="mt-32 md:mt-48">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-12 md:mb-16"
                        >
                            <div className="text-emerald-500 font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase mb-4">
                                investment_matrix
                            </div>
                            <h2 className="text-2xl md:text-5xl font-black uppercase tracking-tighter">
                                Choose your engagement
                            </h2>
                            <p className="text-zinc-500 text-sm md:text-base mt-4 max-w-2xl mx-auto">
                                Proven results. Transparent pricing. No hidden fees.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            {packages.map((pkg) => (
                                <motion.div
                                    key={pkg.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: pkg.id * 0.1 }}
                                    className={`relative border p-6 md:p-8 transition-all duration-300 hover:border-emerald-500/50 ${pkg.popular
                                        ? "border-emerald-500/30 bg-emerald-500/5"
                                        : "border-zinc-900"
                                        }`}
                                >
                                    {pkg.popular && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-black px-3 py-0.5 text-[8px] md:text-[9px] font-mono uppercase tracking-wider font-bold">
                                            most_popular
                                        </div>
                                    )}

                                    <div className="text-emerald-500 font-mono text-[9px] md:text-[10px] mb-4 tracking-wider">
                                        TIER_0{pkg.id}
                                    </div>

                                    <h3 className="text-lg md:text-xl font-black uppercase mb-2">
                                        {pkg.name}
                                    </h3>

                                    <div className="text-2xl md:text-3xl font-black mb-1">
                                        {pkg.price}
                                    </div>

                                    <div className="text-zinc-600 text-[10px] md:text-xs font-mono mb-6">
                                        {pkg.duration}
                                    </div>

                                    <ul className="space-y-2 md:space-y-3 mb-8">
                                        {pkg.features.map((feature, idx) => (
                                            <li key={idx} className="text-zinc-400 text-xs md:text-sm flex items-start gap-2">
                                                <span className="text-emerald-500">✓</span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <a
                                        href={pkg.calLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`block text-center py-3 text-xs md:text-sm uppercase tracking-wider transition-all duration-300 ${pkg.popular
                                            ? "bg-emerald-500 text-black hover:bg-emerald-400 font-bold"
                                            : "border border-zinc-800 hover:border-emerald-500"
                                            }`}
                                    >
                                        Book Consultation →
                                    </a>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* --- NEWSLETTER SIGNUP --- */}
                    <section className="mt-32 md:mt-48">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="border-t border-zinc-900 pt-12 md:pt-16"
                        >
                            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                                <div>
                                    <div className="text-emerald-500 font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase mb-4">
                                        newsletter_signal
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-3">
                                        Get performance insights
                                    </h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed">
                                        Weekly tips on achieving 100/100 Lighthouse scores,
                                        Next.js optimization, and scaling high-performance apps.
                                    </p>
                                </div>

                                <form onSubmit={handleNewsletterSignup} className="flex flex-col sm:flex-row gap-3">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="dev@example.com"
                                        required
                                        className="flex-1 px-4 py-3 bg-black border border-zinc-800 text-white text-sm focus:border-emerald-500 outline-none transition-colors"
                                        disabled={emailStatus === "loading"}
                                    />
                                    <button
                                        type="submit"
                                        disabled={emailStatus === "loading"}
                                        className="px-6 py-3 bg-emerald-500 text-black text-sm font-mono uppercase tracking-wider hover:bg-emerald-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {emailStatus === "loading" ? "..." : emailStatus === "success" ? "✓ Subscribed" : "Subscribe →"}
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </section>

                    {/* --- FINAL CTA BEFORE FOOTER (NEW) --- */}
                    <section className="mt-32 md:mt-48">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="bg-emerald-500/5 border border-emerald-500/20 p-8 md:p-12 text-center"
                        >
                            <div className="text-emerald-500 font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase mb-4">
                                limited_availability
                            </div>
                            <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-4">
                                Ready to fix your site?
                            </h3>
                            <p className="text-zinc-400 text-sm mb-8 max-w-md mx-auto">
                                Don't let slow load times cost you customers. Get a guaranteed 100/100 Lighthouse score.
                            </p>
                            <a
                                href="https://cal.com/ronan-sibunga-m3zawr/quick-performance-audit"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-8 py-4 bg-emerald-500 text-black font-mono text-sm font-bold uppercase tracking-wider hover:bg-emerald-400 transition-all duration-300"
                            >
                                Book Your Audit Now →
                            </a>
                        </motion.div>
                    </section>

                    {/* --- BUSINESS CALL TO ACTION --- */}
                    <footer className="mt-32 md:mt-48 flex flex-col items-center border-t border-zinc-900 pt-16 md:pt-20">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center w-full px-4"
                        >
                            <p className="text-[10px] font-mono text-emerald-500 mb-6 md:mb-8 tracking-[0.4em] uppercase">
                                [ system_ready: true ]
                            </p>
                            <h3 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-8 md:mb-10 leading-tight">
                                Ready to turn 404s into <span className="text-emerald-500">200 OKs?</span>
                            </h3>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <a
                                    href="https://cal.com/ronan-sibunga-m3zawr/quick-performance-audit"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-4 bg-emerald-500 text-black font-mono text-sm font-bold uppercase tracking-wider hover:bg-emerald-400 transition-all duration-300"
                                >
                                    Book a Performance Audit →
                                </a>

                                <div
                                    onPointerDown={handleEmailRedirect}
                                    className="cursor-pointer group"
                                >
                                    <span className="px-8 py-4 inline-block border border-zinc-800 hover:border-emerald-500 transition-all duration-300">
                                        <span className="text-sm font-mono uppercase tracking-wider text-zinc-400 group-hover:text-white">
                                            Direct Contact
                                        </span>
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 text-[10px] text-zinc-600 tracking-widest uppercase font-mono">
                                Direct Transmission: contact@lizardinteractive.online
                            </div>
                        </motion.div>
                    </footer>
                </main>
            </ScreenContainer>
        </div>
    );
}