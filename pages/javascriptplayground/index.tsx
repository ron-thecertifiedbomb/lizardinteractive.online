import Head from "next/head";
import ImageToTextConverter from "../../components/ImageToText/ImageToText";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";
import JsPlayground from "../../components/JsPlayground/JsPlayground";


export default function JavascriptPlaygroundPage() {
    return (
        <>
            <Head>
                <title>Image to Text Converter | Lizard Interactive Online</title>
            </Head>

            <SectionHeader
                title=" Javascript Playground"
                subtitle=" Test and experiment with JavaScript code in real-time"
            />


            <JsPlayground />

        </>
    );
}
