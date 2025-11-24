
import ScreenRecorder from "../../components/ScreenRecorder/ScreenRecorder";
import ScreenContainer from "../../components/shared/ScreenContainer/ScreenContainer";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";

export default function ScreenRecorderPage() {
  const utilities = [
    { name: "Tailwind Color Guide", url: "/palette" },
    { name: "Image to Text Converter", url: "/imagetotext" },
    { name: "PDF to Word Converter", url: "/pdftowordconverter" },
    { name: "Resume Builder", url: "/resumebuilder" },
    { name: "YouTube Video to MP3 Converter", url: "/youtubetomp3" },
  ];

  return (
    <ScreenContainer>
   <SectionHeader
        title="Screen Recorder"
        subtitle=" Easily capture your screen activity with our user-friendly screen recorder tool."
                 />
     <ScreenRecorder />
    </ScreenContainer >
  );
}

