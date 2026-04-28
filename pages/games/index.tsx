'use client'

import EmulatorGrid from '@/components/emulator/EmulatorGrid/EmulatorGrid';
import MainHeader from '@/components/shared/MainHeader/MainHeader';
import ScreenContainer from '@/components/shared/ScreenContainer/ScreenContainer';

import { EMULATORS } from '@/data/lists/emulatorList';

export default function GamesPage() {
    return (
        <ScreenContainer className="pt-16 md:pt-10">

            {/* --- The Reusable Premium Header --- */}
            <div className="mb-16">
                <MainHeader
                    eyebrow="Legacy Hardware Protocols"
                    headline="The Emulator Vault"
                    subheadline="High-performance browser-based emulation. Optimized for low-latency execution and seamless retro-gaming experiences."
                />
            </div>

            {/* The Grid of Emulators */}
            <div className="w-full px-4 md:px-0">
                <EmulatorGrid emulators={EMULATORS} />
            </div>

        </ScreenContainer>
    );
}