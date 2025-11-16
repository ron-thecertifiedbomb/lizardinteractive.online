import Head from "next/head";
import YouTubeToMp3 from "../../components/YoutubeToMp3/YoutubeToMp3";


export default function YouTubeToMp3Page() {
    return (
        <>
            <Head>
                <title>YouTube to MP3 | RonDevSolutions</title>
            </Head>

            <main className="min-h-screen justify-center pt-10">
                <YouTubeToMp3 />
            </main>
        </>
    );
}
