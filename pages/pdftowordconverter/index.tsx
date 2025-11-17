import Head from "next/head";
import PDFToWordConverter from "../../components/PDFToWordConverter/PDFToWordConverter";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";


export default function PdfToWordConverterPage() {
    return (
        <>
            <Head>
                <title>PDF to Word Converter | RonDevSolutions</title>
            </Head>


            <SectionHeader
                title="PDF to Word Converter"
                subtitle="Quickly convert your PDF files to Word documents with ease."
            />


       
              
                <PDFToWordConverter />
    
        </>
    );
}
