import Head from "next/head";
import { VoidSettings } from "../../config/config";
import ThePsychedelicRiffer from "../../components/ThePsychedelicRiffer/ThePsychedelicRiffer";

export default function RifferPage() {
    return (
        <div className="bg-black min-h-screen text-white">
            <Head>
                <title>{VoidSettings.metadata.title}</title>
                <meta name="description" content={VoidSettings.metadata.description} />
            </Head>

            {/* The high-level component containing all logic */}
            <ThePsychedelicRiffer />
        </div>
    );
}