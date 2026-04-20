import { useRouter } from 'next/router';
import { useRef } from 'react';
import { EMULATORS } from '../../../data/emulatorList';
import ScreenContainer from '../../../components/shared/ScreenContainer/ScreenContainer';
import NesPlayer from '../../../components/emulator/nes/NesPlayer';

export default function EmulatorPage() {
    // const router = useRouter();
    // const { slug } = router.query;


    // const data = EMULATORS.find((e) => e.id === slug);

    // if (!router.isReady) return null;

    // if (!data) return (
    //     <main className="min-h-screen bg-(--bg)">
    //         <div className="flex items-center justify-center min-h-[50vh]">
    //             <h1 className="text-red-500 font-mono tracking-widest">404 // SYSTEM_NOT_FOUND</h1>
    //         </div>
    //     </main>
    // );

    return (
    
        <main className="min-h-screen">
            <div className="mx-auto max-w-7xl">
                <NesPlayer />
            </div>
        </main>

    );
}