import Head from "next/head";
import RonDevSolutions from "../../components/RonDevSolutions/RonDevSolutions";

export default function RonDevSolutionsPage() {
    return (
        <div className="bg-black min-h-screen">
            <Head>
                <title>RonDevSolutions | High-Performance Web Architecture</title>
                <meta name="description" content="Full-stack development and performance optimization by Ron." />
            </Head>

            <RonDevSolutions />
        </div>
    );
}