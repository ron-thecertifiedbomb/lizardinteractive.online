'use client'

import EmulatorGrid from '@/components/emulator/EmulatorGrid/EmulatorGrid';
import ScreenContainer from '@/components/shared/ScreenContainer/ScreenContainer';
import SectionHeader from '@/components/shared/SectionHeader/SectionHeader';
import { EMULATORS } from '@/data/lists/emulatorList';


export default function GamesPage() {
    return (
        <ScreenContainer variant="dark" maxWidth="xl">
            <SectionHeader
                title="Emulator"
                highlight="Vault"
                description="Initialize legacy hardware protocols. Optimized for low-latency browser execution."
            />

            {/* ✅ Pass the EMULATORS array here */}
            <EmulatorGrid emulators={EMULATORS} />

    =
        </ScreenContainer>
    );
}