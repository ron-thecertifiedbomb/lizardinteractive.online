import { motion } from "framer-motion";
import MetaHead from "@/components/MetaHead/MetaHead";
import ScreenContainer from "@/components/shared/ScreenContainer/ScreenContainer";
import MainHeader from "@/components/shared/MainHeader/MainHeader";
import ImpactBanner from "@/components/shared/ImpactBanner/ImpactBanner";

export default function AboutPage() {
    return (
        <>
            <MetaHead
                data={{
                    title: "Manifest | Lizard Interactive",
                    description: "ID: Ronan Sibunga. Software Developer, Guitarist, and Performance Architect. Eliminating digital friction through extreme engineering.",
                    ogImage: "/og-image-about.jpg",
                    ogUrl: "https://www.lizardinteractive.online/about",
                    ogType: "profile",
                }}
            />

            <ScreenContainer>
                <div className="py-8 md:py-32 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <MainHeader
                            eyebrow="Architect Identity"
                            headline="The Manifest"
                            subheadline="Consolidating software engineering, musical precision, and performance architecture into a single unified protocol."
                        />
                    </motion.div>

                    <div className="mt-20 grid md:grid-cols-2 gap-16 items-start">
                        {/* Left: The Narrative */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-8 text-zinc-400 font-mono leading-relaxed"
                        >
                            <p>
                                I am <span className="text-white font-bold">Ronan Sibunga</span>.
                                In a digital landscape cluttered with bloat, I prioritize the
                                <span className="text-[#10b981]"> "Performance Gap."</span>
                            </p>
                            <p>
                                Every millisecond shaved off a load time is a friction point removed
                                from your revenue stream. Whether I am tracking a guitar solo or
                                optimizing a Next.js edge runtime, the goal remains identical:
                                <span className="text-white"> Extreme Signal. Zero Noise.</span>
                            </p>
                            <div className="pt-4 border-l-2 border-zinc-800 pl-6 italic">
                                "Treat code like a recording session: strip the noise until only the purest signal remains."
                            </div>
                        </motion.div>

                        {/* Right: Technical Ledger */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-sm font-mono"
                        >
                            <h3 className="text-white text-xs font-bold mb-8 tracking-[0.3em] uppercase flex items-center">
                                <span className="w-2 h-2 bg-[#10b981] mr-3 animate-pulse"></span>
                                Current_Stack
                            </h3>
                            <ul className="space-y-4 text-sm">
                                <li className="flex justify-between border-b border-zinc-800/50 pb-2">
                                    <span className="text-zinc-500">ROLES</span>
                                    <span className="text-[#10b981] text-right">Dev / Guitar / Video</span>
                                </li>
                                <li className="flex justify-between border-b border-zinc-800/50 pb-2">
                                    <span className="text-zinc-500">ENGINE</span>
                                    <span className="text-white text-right">Next.js 14 / TS</span>
                                </li>
                                <li className="flex justify-between border-b border-zinc-800/50 pb-2">
                                    <span className="text-zinc-500">AI_CORE</span>
                                    <span className="text-white text-right">Gemini 1.5 Pro</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="text-zinc-500">AUDIT_TARGET</span>
                                    <span className="text-[#10b981] font-bold">100/100 LH</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </div>

                <ImpactBanner
                    leftEyebrow="The Developer"
                    leftTopLine="Built on logic &"
                    leftBottomLine="Scalable Architecture."
                    rightEyebrow="The Artist"
                    rightTopLine="Driven by rhythm &"
                    rightBottomLine="Creative Execution."
                />

                <div className="py-32 text-center">
                    <motion.a
                        href="mailto:lizardinteractive.online@gmail.com"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block border border-[#10b981] text-[#10b981] px-12 py-4 font-mono tracking-widest hover:bg-[#10b981] hover:text-black transition-all"
                    >
                        EXECUTE_CONTACT
                    </motion.a>
                </div>
            </ScreenContainer>
        </>
    );
}
