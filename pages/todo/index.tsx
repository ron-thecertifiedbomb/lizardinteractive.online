import Container from "../../components/container";
import ScreenRecorder from "../../components/ScreenRecorder/ScreenRecorder";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";
import Todo from "../../components/Todo/Todo";

export default function TodoPage() {
  const utilities = [
    { name: "Tailwind Color Guide", url: "/palette" },
    { name: "Image to Text Converter", url: "/imagetotext" },
    { name: "PDF to Word Converter", url: "/pdftowordconverter" },
    { name: "Resume Builder", url: "/resumebuilder" },
    { name: "YouTube Video to MP3 Converter", url: "/youtubetomp3" },
  ];

  return (
    <>
   <SectionHeader
        title="Todo List"
        subtitle="Easily manage your tasks and stay organized with our intuitive todo list application."
                 />
     <Todo />
    </ >
  );
}

