import Head from "next/head";
import { motion } from "framer-motion";
import { VoidSettings } from "../../config/config";

export default function AboutTheRiffer() {
    return (
        <div className="bg-black min-h-screen text-white font-sans selection:bg-zinc-800">
            <Head>
                <title>About | {VoidSettings.artistName}</title>
                <meta name="description" content={`The story behind ${VoidSettings.artistName} and Lizard Interactive.`} />
            </Head>

            <main className="max-w-3xl mx-auto px-6 py-24">
                {/* --- HEADER --- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 border-b border-zinc-900 pb-12"
                >
                    <h1 className="text-4xl font-bold tracking-tighter mb-4 uppercase">
                        Code & Chords
                    </h1>
                    <p className="text-zinc-500 tracking-widest uppercase text-xs">
                        The Story Behind {VoidSettings.artistName}
                    </p>
                </motion.div>

                {/* --- CONTENT SECTION --- */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 1 }}
                    className="space-y-8 text-zinc-300 leading-relaxed text-lg"
                >
                    <p>
                        I am a developer by day and a psychedelic guitarist by night.
                        <strong> Lizard Interactive</strong> serves as my technical laboratory,
                        while <strong>The Psychedelic Riffer</strong> is where those experiments
                        manifest into atmospheric soundscapes.
                    </p>

                    <p>
                        My music focuses on 100 BPM ambient textures, high-gain leads, and
                        psychedelic explorations. Every piece of gear listed in "The Rig"
                        has been meticulously selected to serve this specific sonic vision.
                    </p>

                    <div className="py-6">
                        <h2 className="text-white font-bold uppercase tracking-widest text-sm mb-4">
                            The Philosophy
                        </h2>
                        <p>
                            I believe in the intersection of digital precision and analog soul.
                            Whether I&apos;m coding a new tool for this site or tracking a late-night
                            improvised session, the goal is always the same: immersion.
                        </p>
                    </div>

                    {/* --- AFFILIATE DISCLOSURE (Crucial for Approval) --- */}
                    <div className="bg-zinc-950 border border-zinc-900 p-8 rounded-sm mt-12">
                        <h2 className="text-white font-bold uppercase tracking-widest text-xs mb-3">
                            Affiliate Disclosure
                        </h2>
                        <p className="text-sm text-zinc-500 italic">
                            The Psychedelic Riffer is a participant in affiliate marketing programs.
                            This means I may earn a commission if you purchase gear through my links.
                            I only feature hardware that I personally use, test, or trust for
                            professional recording and production.
                        </p>
                    </div>
                </motion.div>

                {/* --- FOOTER / BACK LINK --- */}
                <footer className="mt-24 text-center">
                    <a
                        href="/thepsychedelicriffer"
                        className="text-[10px] text-zinc-600 hover:text-white transition-colors uppercase tracking-[0.3em]"
                    >
                        [ Return to The Void ]
                    </a>
                </footer>
            </main>
        </div>
    );
}
