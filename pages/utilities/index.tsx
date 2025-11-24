import Container from "../../components/container";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";
import { utilities } from "./data";

export default function UtilitiesHub() {

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
            className="block p-6 rounded-xl bg-gray-900 text-white text-center text-lg font-semibold shadow-md hover:shadow-lg transition-transform duration-200 hover:-translate-y-1"
          >
            {util.name}
          </a>
        ))}
      </div>
    </Container >
  );
}

