import Container from "../../components/container";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";

export default function UtilitiesHub() {
  const utilities = [
    { name: "Tailwind Color Guide", url: "/palette" },
    { name: "Image to Text Converter", url: "/imagetotext" },
    { name: "PDF to Word Converter", url: "/pdftowordconverter" },
    { name: "Resume Builder", url: "/resumebuilder" },
    { name: "YouTube Video to MP3 Converter", url: "/youtubetomp3" },
    { name: "Screen Recorder", url: "/screenrecorder" },
    { name: "Image Editor", url: "/imageeditor" },
    { name: "Logo Maker", url: "/logomaker" },
  ];

  return (
    <Container>
   <SectionHeader
        title="Useful Utilities"
        subtitle=" Quickly access our most popular web tools to simplify your workflow."
                 />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {utilities.map((util, idx) => (
          <a
            key={idx}
            href={util.url}
            className="block p-6 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 text-white text-center text-lg font-semibold shadow-md hover:shadow-lg transition-transform duration-200 hover:-translate-y-1"
          >
            {util.name}
          </a>
        ))}
      </div>
    </Container >
  );
}

