import Head from "next/head";
import ImageToTextConverter from "../../components/ImageToText/ImageToText";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";
import ScreenContainer from "../../components/shared/ScreenContainer/ScreenContainer";


export default function ImageToTextPage() {
    const staticPreviewImage = "/imagetotext.jpg";

    return (
        <>
            <Head>
                <title>Image to Text Converter | Lizard Interactive Online</title>
                <meta property="og:title" content="Image to Text Converter | Lizard Interactive Online" />
                <meta property="og:description" content="Quickly extract text from images with our easy-to-use online tool." />
                <meta property="og:image" content={`${staticPreviewImage}?v=1`} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.lizardinteractive.online/imagetotext" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Image to Text Converter | Lizard Interactive Online" />
                <meta name="twitter:description" content="Quickly extract text from images with our easy-to-use online tool." />
                <meta name="twitter:image" content={`${staticPreviewImage}?v=1`} />
            </Head>

            {/* Screen container wraps everything */}
            <ScreenContainer>
                <SectionHeader
                    title="Image to Text Converter"
                    subtitle="Quickly extract text from images with our easy-to-use online tool."
                />
                <ImageToTextConverter />
            </ScreenContainer>
        </>
    );
}
