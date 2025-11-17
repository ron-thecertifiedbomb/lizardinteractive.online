import Head from "next/head";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";
import ResumeBuilder from "../../components/ResumeBuilder/ResumerBuilder";


export default function ImageToTextPage() {
    return (
        <>
            <Head>
                <title>Resume Builder | Lizard Interactive Online</title>
            </Head>

            <SectionHeader
                title="Resume Builder"

            />


            <ResumeBuilder />

        </>
    );
}
