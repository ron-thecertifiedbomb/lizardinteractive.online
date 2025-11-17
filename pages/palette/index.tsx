import Container from "../../components/container";
import { Palette } from "../../components/pallete/Pallete";

function PalettePage() {
  return (
    <Container>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-white">Tailwind Color Guide</h1>
        <p className="text-gray-300 mt-2 text-lg">
          Explore Tailwind CSS colors and find the perfect palette for your projects.
        </p>
      </div>
       
      {/* Palette Component */}
      <div className="flex justify-center">
        <Palette />
      </div>
    </Container>
  );
}

export default PalettePage;
