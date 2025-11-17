import Container from "../../components/container";
import { Palette } from "../../components/Palette/Pallete";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";

function PalettePage() {
  return (
    <Container>

      <SectionHeader
        title="Tailwind Color Guide"
        subtitle="  Explore Tailwind CSS colors and find the perfect palette for your projects."
      />
      <Palette />
    </Container>
  );
}

export default PalettePage;
