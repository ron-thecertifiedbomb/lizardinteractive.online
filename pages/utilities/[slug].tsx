import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";

import MetaHead from "@/components/MetaHead/MetaHead";
import ScreenContainer from "@/components/shared/ScreenContainer/ScreenContainer";

import JsPlayground from "@/components/JsPlayground/JsPlayground";
import ImageToText from "@/components/ImageToText/ImageToText";
import PDFToWordConverter from "@/components/PDFToWordConverter/PDFToWordConverter";
import MeshGenerator from "@/components/MeshGenerator/MeshGenerator";
import ScreenRecorder from "@/components/ScreenRecorder/ScreenRecorder";
import ImageEditor from "@/components/ImageEditor/ImageEditor";
import ScaleMapper from "@/components/ScaleMapper/ScaleMapper";
import Tuner from "@/components/Tuner/Tuner";
import Planner from "@/components/Planner/Planner";
import Todo from "@/components/Todo/Todo";
import BoxShadowGenerator from "@/components/BoxShadowGenerator/BoxShadowGenerator";
import { Palette } from "@/components/Palette/Pallete";
import ResumeBuilder from "@/components/ResumeBuilder/ResumerBuilder";
import AudioVisualizer from "@/components/AudioVisualizer/AudioVisualizer";
import ChordDetector from "@/components/ChordDetector/ChordDetector";
import PdfEditor from "@/components/PdfEditor/PdfEditor";
import Metronome from "@/components/Metronome/Metronome";
import { TextTools } from "@/components/TextTools/TextTools";
import { QRCodeGenerator } from "@/components/QRCodeGenerator/QRCodeGenerator";
import { PasswordGenerator } from "@/components/PasswordGenerator/PasswordGenertator";
import { JSONFormatter } from "@/components/JSONFormatter/JSONFormatter";
import { UnitConverter } from "@/components/UnitConverter/UnitConverter";
import { SpeedTest } from "@/components/SpeedTest/SpeedTest";
import { Base64Tool } from "@/components/Base64Tool/Base64Tool";
import { VideoToGIF } from "@/components/VideoToGIF/VideoToGIF";
import { PageSpeedTool } from "@/components/PageSpeedTool/PageSpeedTool";
import { ImageConverter } from "@/components/ImageConverter/ImageConverter";

import { utilities } from "@/data/lists/utilities";

const TOOL_COMPONENTS: Record<string, React.ComponentType> = {
  palette: Palette,
  javascriptplayground: JsPlayground,
  imagetotext: ImageToText,
  pdftowordconverter: PDFToWordConverter,
  resumebuilder: ResumeBuilder,
  meshgenerator: MeshGenerator,
  screenrecorder: ScreenRecorder,
  imageeditor: ImageEditor,
  scalemapper: ScaleMapper,
  metronome: Metronome,
  audiovisualizer: AudioVisualizer,
  tuner: Tuner,
  "chord-detector": ChordDetector,
  planner: Planner,
  pdfeditor: PdfEditor,
  todo: Todo,
  boxshadowgenerator: BoxShadowGenerator,
  "text-tools": TextTools,
  "qrcode-generator": QRCodeGenerator,
  "password-generator": PasswordGenerator,
  "json-formatter": JSONFormatter,
  "unit-converter": UnitConverter,
  "speed-test": SpeedTest,
  "base64-tool": Base64Tool,
  "video-to-gif": VideoToGIF,
  "pagespeed-insights": PageSpeedTool,
  "image-converter": ImageConverter,
};

interface ToolPageProps {
  slug: string;
  title: string;
  description: string;
  category: string;
}

export default function UtilityToolPage({ slug, title, description, category }: ToolPageProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.lizardinteractive.online";
  const canonicalUrl = `${baseUrl}/utilities/${slug}`;

  const categoryKeywords: Record<string, string> = {
    Dev: "developer tools, programming, code",
    Design: "design tools, UI, CSS",
    Files: "file converter, document editor",
    Productivity: "productivity tools, work efficiency",
    Media: "media tools, video, image",
    Music: "music tools, audio, guitar",
    Security: "security tools, password, encryption",
    Network: "network tools, speed test, connection",
  };

  const keywords = `${title}, ${categoryKeywords[category] || ""}, online tool, free tool, web utility`;

  const SelectedTool = TOOL_COMPONENTS[slug];

  return (
    <>
      <Head>
        <title>{title} | Lizard Interactive Online Tools</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content="Lizard Interactive" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={`${title} | Lizard Interactive`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${baseUrl}/og-image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Lizard Interactive Online" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={`${title} | Lizard Interactive`} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${baseUrl}/og-image.png`} />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: title,
              description: description,
              applicationCategory: category,
              operatingSystem: "Web",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              url: canonicalUrl,
              author: { "@type": "Organization", name: "Lizard Interactive" },
            }),
          }}
        />
      </Head>

      <ScreenContainer className="pt-20 px-3 md:pt-30">
        {SelectedTool ? (
          <SelectedTool />
        ) : (
          <div className="p-20 border border-dashed border-zinc-800 text-center">
            <p className="text-zinc-500 font-mono uppercase tracking-widest text-xs">
              Interface Initialization Failed: Component not mapped.
            </p>
          </div>
        )}
      </ScreenContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = utilities.map((tool) => ({
    params: { slug: tool.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const tool = utilities.find((u) => u.slug === slug);

  if (!tool) return { notFound: true };

  return {
    props: {
      slug: tool.slug,
      title: tool.name,
      description: tool.description,
      category: tool.category,
    },
  };
};