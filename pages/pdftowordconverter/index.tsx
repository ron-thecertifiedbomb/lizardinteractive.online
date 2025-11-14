import Head from "next/head";
import PDFToWordConverter from "../../components/PDFToWordConverter/PDFToWordConverter";


export default function PdfToWordConverterPage() {
    return (
        <>
            <Head>
                <title>PDF to Word Converter | RonDevSolutions</title>
            </Head>

            <div className="p-6 max-w-2xl mx-auto bg-gray-900 text-white rounded-lg shadow-lg">
              
                <PDFToWordConverter />
            </div>
        </>
    );
}
