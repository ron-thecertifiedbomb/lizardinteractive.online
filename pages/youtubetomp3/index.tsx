import Head from "next/head";
import YouTubeToMp3 from "../../components/YoutubeToMp3/YoutubeToMp3";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";


export default function YouTubeToMp3Page() {
    return (
        <>
            <Head>
                <title>YouTube to MP3 | RonDevSolutions</title>
            </Head>
      <SectionHeader
                title="Youtube Video to MP3 Converter"
                subtitle="Quickly convert Youtube Video to MP3 with ease."
            />
           
                <YouTubeToMp3 />
          
        </>
    );
}
