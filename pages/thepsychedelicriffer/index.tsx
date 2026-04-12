"use client";
import Image from "next/image";
import Head from "next/head";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";
import ScreenContainer from "../../components/shared/ScreenContainer/ScreenContainer";

export default function ThePsychedelicRifferPage() {
    const staticPreviewImage = "/thepsychedelicriffer.jpg";
    const siteUrl = "https://lizardinteractive.online";

    return (
        <>
            <Head>
                <title>The Psychedelic Riffer | Lizard Interactive Online</title>
                {/* Open Graph - Use absolute URLs for images so scrapers can find them */}
                <meta property="og:title" content="The Psychedelic Riffer | Lizard Interactive Online" />
                <meta property="og:description" content="Explore remorseful, 100 BPM melodic instrumentals and atmospheric guitar textures." />
                <meta property="og:image" content={`${siteUrl}${staticPreviewImage}`} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={siteUrl} />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="The Psychedelic Riffer | Lizard Interactive Online" />
                <meta name="twitter:description" content="Slow, melodic instrumentals focused on reflection and regret." />
                <meta name="twitter:image" content={`${siteUrl}${staticPreviewImage}`} />
            </Head>

            <ScreenContainer variant="dark">
                {/* <SectionHeader
                    title=""
                    subtitle="Remorseful 100 BPM melodic instrumentals. A journey through reflection and atmospheric textures."
                /> */}

                {/* Image Container: Added relative positioning and a fixed aspect ratio/height */}
                <div style={{
                    position: 'relative',
                    width: '100%',
         
                    height: '400px', // Adjusted for a hero-header feel
                    margin: '2rem auto 0 auto',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 0 50px -12px rgba(120, 119, 198, 0.4)'
                }}>
                    <Image
                        src={staticPreviewImage}
                        alt="The Psychedelic Riffer Cover"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                </div>

                {/* Spotify Embed Container */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    marginTop: '3rem',
                    paddingBottom: '5rem'
                }}>
                    <iframe data-testid="embed-iframe" style={{
                        borderRadius: '12px',
                        background: "transparent",
                    }} allowTransparency src="https://open.spotify.com/embed/album/3vzVZ2UJ9QuHJHvRxXCLki?utm_source=generator" width="100%" height="352" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                    </div>
            </ScreenContainer>
        </>
    );
}