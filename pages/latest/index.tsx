export default function LatestTrendingNews() {
    const categories = [
        { name: "Programming", url: "/latest/programming" },
        { name: "Technology", url: "/latest/technology" },
        { name: "World News", url: "/latest/world" },
        { name: "Startups", url: "/latest/startups" },
    ];

    return (
        <section className="max-w-3xl mx-auto px-4 py-12">
            {/* Main Title */}
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-white">Latest Trending News</h1>
                <p className="text-gray-200 mt-2 text-lg">
                    Stay up-to-date with the most recent articles and updates across your favorite categories.
                </p>
            </div>

            {/* Categories List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {categories.map((cat, idx) => (
                    <a
                        key={idx}
                        href={cat.url}
                        className="block p-6 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center text-lg font-semibold shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
                    >
                        {cat.name}
                    </a>
                ))}
            </div>
        </section>
    );
}
