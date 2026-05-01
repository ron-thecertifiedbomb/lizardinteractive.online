import { motion } from "framer-motion";
import MetaHead from "@/components/MetaHead/MetaHead";
import ScreenContainer from "@/components/shared/ScreenContainer/ScreenContainer";
import MainHeader from "@/components/shared/MainHeader/MainHeader";
import ImpactBanner from "@/components/shared/ImpactBanner/ImpactBanner";
import { aboutContent } from "@/data/page/aboutContent";

export default function AboutPage() {
    return (
        <>
            <MetaHead
                data={{
                    title: aboutContent.meta.title,
                    description: aboutContent.meta.description,
                }}
            />

            <ScreenContainer>
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <MainHeader
                            eyebrow={aboutContent.header.eyebrow}
                            headline={aboutContent.header.headline}
                            subheadline={aboutContent.header.subheadline}
                        />
                    </motion.div>

                    <div className="px-6 md:px-8 w-full">
                        {/* The Narrative */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-4 text-sm md:text-base lg:text-lg text-zinc-400 font-medium leading-relaxed"
                        >
                            <p>{aboutContent.bio.origin}</p>
                            <p>{aboutContent.bio.philosophy}</p>
                            <p>{aboutContent.bio.approach}</p>
                            <p>{aboutContent.bio.commitment}</p>
                            <div className="pt-8 border-l-2 border-emerald-600 pl-4 md:pl-6 italic bg-zinc-900/20 py-4 text-sm md:text-base lg:text-lg">
                                "In this studio, speed is not a feature or an asset—it is the <span className="text-white font-bold">Standard.</span> We strip the noise until only the highest-fidelity performance remains."
                            </div>
                        </motion.div>
                    </div>
                </div>
                <div className="px-4 mt-24 max-w-4xl mx-auto">
                    {/* Technical Ledger */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-black border border-zinc-800 p-6 md:p-8 rounded-sm font-mono shadow-2xl"
                    >
                        <h3 className="text-white text-xs md:text-sm font-bold mb-6 md:mb-8 tracking-[0.3em] uppercase flex items-center">
                            <span className="w-2 h-2 bg-[#10b981] mr-3 animate-pulse"></span>
                            {aboutContent.stack.title}
                        </h3>
                        <ul className="space-y-4 text-xs md:text-sm lg:text-base">
                            {aboutContent.stack.items.map((item, index) => (
                                <li key={index} className={`flex justify-between ${index !== aboutContent.stack.items.length - 1 ? "border-b border-zinc-800/50 pb-2" : ""}`}>
                                    <span className="text-zinc-500">{item.label}</span>
                                    <span className={`text-right ${item.highlight ? "text-[#10b981]" : "text-white"} ${item.bold ? "font-bold" : ""}`}>
                                        {item.value}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
                <ImpactBanner
                    leftEyebrow="The Engineer"
                    leftTopLine="DTI Registered &"
                    leftBottomLine="Production Ready."
                    rightEyebrow="The Standard"
                    rightTopLine="Speed is not an Asset,"
                    rightBottomLine="It is a Requirement."
                />



                <div className="py-16 text-center ">
                    <motion.a
                        href="mailto:lizardinteractive.online@gmail.com"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block text-xs md:text-sm lg:text-base border border-[#10b981] text-[#10b981] px-8 md:px-12 py-3 md:py-4 font-mono tracking-widest hover:bg-[#10b981] hover:text-black transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] rounded-full"
                    >
                        LIZARD INTERACTIVE ONLINE
                    </motion.a>
                </div>
            </ScreenContainer>
        </>
    );
}