import Container from "../../components/container";
import ScreenRecorder from "../../components/ScreenRecorder/ScreenRecorder";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";

export default function UtilitiesHub() {
  const utilities = [
    { name: "Tailwind Color Guide", url: "/palette" },
    { name: "Image to Text Converter", url: "/imagetotext" },
    { name: "PDF to Word Converter", url: "/pdftowordconverter" },
    { name: "Resume Builder", url: "/resumebuilder" },
    { name: "YouTube Video to MP3 Converter", url: "/youtubetomp3" },
  ];

  return (
    <Container>
   <SectionHeader
        title="Screen Recorder"
        subtitle=" Easily capture your screen activity with our user-friendly screen recorder tool."
                 />
     <ScreenRecorder />
    </Container >
  );
}

