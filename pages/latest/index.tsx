import Container from "../../components/container";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";

export default function LatestTrendingNews() {
    const categories = [
        { name: "Programming", url: "/latest/programming" },
        { name: "Technology", url: "/latest/technology" },
        { name: "World News", url: "/latest/world" },
        { name: "Startups", url: "/latest/startups" },
    ];

    return (
  <Container>
             <SectionHeader
                title="Latest Trending News"
                subtitle=" Stay up-to-date with the most recent articles and updates across your favorite categories."
                 />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {categories.map((cat, idx) => (
                    <a
                        key={idx}
                        href={cat.url}
                        className="block p-6 rounded-xl bg-gradient-to-r bg-gray-900 text-white text-center text-lg font-semibold shadow-md hover:shadow-lg transition-transform duration-200 hover:-translate-y-1"
                    >
                        {cat.name}
                    </a>
                ))}
            </div>
        </Container>
    );
}
