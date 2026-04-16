
import { Metadata } from "next";
import { DigitalAssetVault } from "../../components/DigitalAssetVault/digital-asset-vault";

export const metadata: Metadata = {
    title: "Asset Vault | Lizard Interactive",
    description: "Secure repository for audio plugins, developer tools, and infrastructure assets.",
};

export default function VaultPage() {
    return (
        <main className="min-h-screen bg-black pt-[72px] md:pt-[88px]">
            {/* Optional: Add a subtle page transition or container here */}
            <DigitalAssetVault />
        </main>
    );
}