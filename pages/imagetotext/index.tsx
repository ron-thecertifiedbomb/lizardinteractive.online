import Head from "next/head";
import ImageToTextConverter from "../../components/ImageToText/ImageTotText";


export default function ImageToTextPage() {
    return (
        <>
            <Head>
                <title>Image to Text Converter | RonDevSolutions</title>
            </Head>

            <div className="p-6 max-w-2xl mx-auto bg-gray-900 text-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">Image to Text Converter</h2>
                <ImageToTextConverter />
            </div>
        </>
    );
}
