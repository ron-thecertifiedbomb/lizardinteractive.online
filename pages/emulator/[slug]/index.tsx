import { useRouter } from 'next/router';
import { EMULATORS } from '../../../data/emulatorList';
import ScreenContainer from '../../../components/shared/ScreenContainer/ScreenContainer';
import NesEmulator from '../../../components/emulator/NesEmulator';

export default function EmulatorPage() {
    const router = useRouter();
    const { slug } = router.query;

    const data = EMULATORS.find((e) => e.id === slug);

    if (!router.isReady) return null;

    if (!data) {
        return (
            <ScreenContainer variant="dark">
                <h1 className="text-red-500 font-mono">404 // PROTOCOL_NOT_FOUND</h1>
            </ScreenContainer>
        );
    }

    return (
        <ScreenContainer variant="dark" maxWidth="xl">
            {/* Centering wrapper to keep the console "eye-level" */}
            <div className="flex flex-col items-center justify-center min-h-[70vh] w-full py-4">

                {/* THE VIEWPORT ADJUSTMENT:
                  - h-[60vh] md:h-[75vh]: Sets height based on screen height.
                  - aspect-[4/3]: Forces the correct retro NES ratio.
                  - max-w-full: Prevents it from clipping on narrow mobile screens.
                */}
                <div className="relative h-[60vh] md:h-[75vh] aspect-[4/3] max-w-full bg-black border border-zinc-900 shadow-2xl shadow-emerald-500/5 overflow-hidden">

                    {/* Header Overlay (Optional) */}
                    <div className="absolute top-0 left-0 right-0 p-2 z-20 flex justify-between items-start pointer-events-none">
                        <span className="text-[8px] font-mono text-zinc-700 uppercase tracking-widest">
                            {data.system} // {data.version}
                        </span>
                        <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_5px_#10b981]" />
                    </div>

                    <NesEmulator />
                </div>

                {/* Footer Metadata */}
                <div className="mt-6 text-center">
                    <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.4em]">
                        [ Protocol_{data.id}_Active ]
                    </p>
                </div>
            </div>
        </ScreenContainer>
    );
}