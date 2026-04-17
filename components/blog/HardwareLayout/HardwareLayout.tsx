import { motion } from 'framer-motion';
import { Monitor } from "lucide-react";

export const HardwareLayout = ({ content }: { content: any }) => (
    <div className="grid grid-cols-1 gap-12">
        {content.recommendations?.map((item: any) => (
            <motion.div key={item.id} className="p-8 border border-zinc-900 bg-zinc-900/10 hover:border-emerald-500/30 transition-all">
                <div className="flex flex-col lg:flex-row gap-10 items-center">
                    <div className="w-full lg:w-1/3 aspect-video bg-zinc-900 flex items-center justify-center border border-zinc-800">
                        <Monitor size={48} className="text-zinc-800" />
                    </div>
                    <div className="flex-1">
                        <span className="text-emerald-500 font-mono text-[10px] font-black tracking-widest">{item.brand}</span>
                        <h3 className="text-4xl font-black uppercase my-2">{item.name}</h3>
                        <p className="text-zinc-500 text-sm mb-6">{item.description}</p>
                        <div className="bg-black p-4 border border-zinc-800 font-mono text-[9px] text-zinc-500 uppercase tracking-widest flex justify-between">
                            <span>CPU: {item.specs.cpu}</span>
                            <span>RAM: {item.specs.ram}</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        ))}
    </div>
);