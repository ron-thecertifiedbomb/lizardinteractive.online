"use client";

import { useRouter } from "next/router";

import MetaHead from "@/components/MetaHead/MetaHead";
import ScreenContainer from "@/components/shared/ScreenContainer/ScreenContainer";
import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";

// Import your tool components

import JsPlayground from "@/components/JsPlayground/JsPlayground";
import ImageToText from "@/components/ImageToText/ImageToText";
import PDFToWordConverter from "@/components/PDFToWordConverter/PDFToWordConverter";

import MeshGenerator from "@/components/MeshGenerator/MeshGenerator";
import ScreenRecorder from "@/components/ScreenRecorder/ScreenRecorder";
import ImageEditor from "@/components/ImageEditor/ImageEditor";
import ScaleMapper from "@/components/ScaleMapper/ScaleMapper";
import Metronome from "@/components/Metronome/Metronome";
import Tuner from "@/components/Tuner/Tuner";
import Planner from "@/components/Planner/Planner";
import Todo from "@/components/Todo/Todo";
import BoxShadowGenerator from "@/components/BoxShadowGenerator/BoxShadowGenerator";
import { Palette } from "@/components/Palette/Pallete";
import ResumeBuilder from "@/components/ResumeBuilder/ResumerBuilder";
import { utilities } from "@/data/lists/utilities";
import AudioVisualizer from "@/components/AudioVisualizer/AudioVisualizer";
import ChordDetector from "@/components/ChordDetector/ChordDetector";
import PdfEditor from "@/components/PdfEditor/PdfEditor";



// 1. Create the Map
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
  chorddetector: ChordDetector,
  planner: Planner,
  pdfeditor: PdfEditor,
  todo: Todo,
  boxshadowgenerator: BoxShadowGenerator,
};

export default function UtilityToolPage() {
  const router = useRouter();
  const { slug } = router.query;

  const tool = utilities.find((u) => u.slug === slug);

  if (!router.isReady) return null;
  if (!tool) return <p>System Error: Module Not Found</p>;

  // 2. Resolve the Component
  const SelectedTool = TOOL_COMPONENTS[tool.slug as string];

  return (
    <>
      <MetaHead data={{ title: tool.name, description: tool.description }} />

      <ScreenContainer>
        <SectionHeader
          title={tool.name}
          // highlight="Module"
          description={tool.description}
        />

        <div className="mt-1 w-full">
          {/* 3. Conditional Render */}
          {SelectedTool ? (
            <SelectedTool />
          ) : (
            <div className="p-20 border border-dashed border-zinc-800 text-center">
              <p className="text-zinc-500 font-mono uppercase tracking-widest text-xs">
                Interface Initialization Failed: Component not mapped.
              </p>
            </div>
          )}
        </div>
      </ScreenContainer>
    </>
  );
}