import Head from "next/head";
import ImageToTextConverter from "../../components/ImageToText/ImageToText";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";


export default function ImageToTextPage() {
    return (
        <>
            <Head>
                <title>Image to Text Converter | Lizard Interactive Online</title>
            </Head>

            <SectionHeader
                title="Image to Text Converter"
                subtitle="Quickly extract text from images with our easy-to-use online tool."
            />


            <ImageToTextConverter />

        </>
    );
}
