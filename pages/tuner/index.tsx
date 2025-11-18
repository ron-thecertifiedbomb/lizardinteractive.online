import Container from "../../components/container";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";
import Tuner from "../../components/Tuner/Tuner";

export default function TunerPage() {

  return (
    <Container>
   <SectionHeader
        title="Guitar Tuner"
        subtitle="Tune your guitar accurately with our professional chromatic tuner."
                 />
          <Tuner />
    </Container >
  );
}

