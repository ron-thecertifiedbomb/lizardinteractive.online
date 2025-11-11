import { useLizardLocation } from "@/hooks/useLizardLocation";
import { LizardText } from "./LizardText";


export function LizardCoordinates() {
    const { latitude, longitude, error, loading } = useLizardLocation();

    if (loading) return <div>Fetching location...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex gap-4">

            <LizardText className="text-2xl">
                Latitude: {latitude},
            </LizardText>
            <LizardText className="text-2xl">
                Longitude: {longitude}
            </LizardText>
            
        </div>
    );
}
