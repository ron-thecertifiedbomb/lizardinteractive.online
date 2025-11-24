import Head from "next/head";
import PDFToWordConverter from "../../components/PDFToWordConverter/PDFToWordConverter";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";
import ScreenContainer from "../../components/shared/ScreenContainer/ScreenContainer";


export default function PdfToWordConverterPage() {
    return (
        <>
            <Head>
                <title>PDF to Word Converter | Lizard Interactive Online</title>
            </Head>

<ScreenContainer>
            <SectionHeader
                title="PDF to Word Converter"
                subtitle="Quickly convert your PDF files to Word documents with ease."
            />


       
              
                <PDFToWordConverter />
                </ScreenContainer>
        </>
    );
}
