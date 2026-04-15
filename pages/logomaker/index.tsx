// "use client";

// import { useState, useEffect, memo } from "react";
// import dynamic from "next/dynamic";
// import Head from "next/head";
// import ScreenContainer from "../../components/shared/ScreenContainer/ScreenContainer";
// import { motion } from "framer-motion";

// // 1. ISOLATE ENGINE: Load with No SSR and forced client-side boundary
// const LogoMaker = dynamic(() => import("../../components/LogoMaker/LogoMaker"), {
//     ssr: false,
//     loading: () => (
//         <div className="w-full h-[600px] border border-zinc-900 flex items-center justify-center bg-[#050505]">
//             <div className="flex flex-col items-center gap-4">
//                 <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent animate-spin rounded-full" />
//                 <span className="text-[8px] font-mono text-zinc-700 uppercase tracking-[0.8em]">
//                     Mounting_Identity_Engine...
//                 </span>
//             </div>
//         </div>
//     )
// });

// // 2. MEMOIZE HEADER: Zero re-renders during logo manipulation
// const PageHeader = memo(() => (
//     <div className="text-center space-y-4 mb-16">
//         <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent">
//             Media.Identity
//         </h2>
//         <p className="text-zinc-500 text-xs md:text-sm tracking-[0.3em] uppercase font-mono max-w-2xl mx-auto leading-relaxed">
//             Vector.Identity_Synthesis // Construct high-fidelity branding assets with zero latency.
//         </p>
//     </div>
// ));

// PageHeader.displayName = "PageHeader";

// export default function LogoMakerPage() {
//     const [isMounted, setIsMounted] = useState(false);

//     useEffect(() => {
//         setIsMounted(true);
//     }, []);

//     // If we aren't on the client, render a black void to prevent hydration hang
//     if (!isMounted) return <div className="min-h-screen bg-black" />;

//     return (
//         <div className="min-h-screen w-full bg-black text-white selection:bg-emerald-500 selection:text-black">
//             <Head>
//                 <title>Media.Identity | Logo Maker | Lizard Interactive</title>
//                 <meta name="description" content="Professional branding and vector identity synthesis." />
//             </Head>

//             <ScreenContainer variant="dark" maxWidth="xl">
//                 <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 pt-24 pb-40">

//                     <PageHeader />

//                     {/* 3. EXECUTION SHIELD: Isolated container with no motion logic */}
//                     <div className="flex justify-center">
//                         <div className="w-full min-h-[600px] relative">
//                             {/* The 'key' ensures the component instance is stable */}
//                             <LogoMaker key="identity-engine-instance" />
//                         </div>
//                     </div>

//                     {/* SYSTEM FOOTER */}
//                     <div className="mt-20 flex flex-col items-center gap-4 text-center opacity-20">
//                         <div className="h-px w-12 bg-zinc-800" />
//                         <span className="text-[8px] font-mono text-zinc-700 uppercase tracking-[0.8em]">
//                             State.Lock: ACTIVE // Process.Isolation: ENABLED
//                         </span>
//                     </div>
//                 </div>
//             </ScreenContainer>
//         </div>
//     );
// }