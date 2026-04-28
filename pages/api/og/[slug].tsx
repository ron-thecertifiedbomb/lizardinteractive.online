// pages/api/og/[slug].tsx
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const slug = context.params?.slug;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lizardinteractive.online';

    if (!slug) {
        return { notFound: true };
    }

    try {
        const articleApiUrl = `${siteUrl}/api/articles?id=${slug}`;
        const articleResponse = await fetch(articleApiUrl);

        if (!articleResponse.ok) {
            return { notFound: true };
        }
        const post = await articleResponse.json();

        return {
            props: {
                post,
                siteUrl,
            },
        };
    } catch (error) {
        console.error('Error fetching article for OG image:', error);
        return { notFound: true };
    }
};

export default function OGImagePage({ post, siteUrl }: { post: any; siteUrl: string }) {
    const title = post?.title;
    const imageSource = post.ogImage || post.image || "";
    const backgroundImageUrl = imageSource.startsWith("http")
        ? imageSource
        : `${siteUrl}${imageSource.startsWith("/") ? "" : "/"}${imageSource}`;

    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#0a0a0a',
                margin: 0,
                padding: 0,
            }}
        >
            {/* Background image (the actual blog photo) */}
            {imageSource && (
                <img
                    src={backgroundImageUrl}
                    alt=""
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: 0.35,
                    }}
                />
            )}

            {/* Gradient overlay for text readability */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%)',
                }}
            />

            {/* Content overlay */}
            <div
                style={{
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '60px 80px',
                    width: '100%',
                    height: '100%',
                }}
            >
                {/* Logo - using emoji for reliability */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        marginBottom: '32px',
                    }}
                >
                    <div
                        style={{
                            width: '56px',
                            height: '56px',
                            background: '#10b981',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '28px',
                        }}
                    >
                        🦎
                    </div>
                    <span
                        style={{
                            fontSize: '22px',
                            fontWeight: 'bold',
                            color: '#10b981',
                            letterSpacing: '2px',
                        }}
                    >
                        LIZARD INTERACTIVE
                    </span>
                </div>

                {/* Title */}
                <h1
                    style={{
                        fontSize: '42px',
                        fontWeight: '900',
                        color: 'white',
                        textTransform: 'uppercase',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.2,
                        textAlign: 'center',
                        maxWidth: '800px',
                        textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                        marginBottom: '20px',
                    }}
                >
                    {title}
                </h1>
            </div>

            {/* Footer */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '30px',
                    left: 0,
                    right: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    zIndex: 1,
                }}
            >
                <span
                    style={{
                        fontSize: '12px',
                        color: '#666',
                        fontFamily: 'monospace',
                        letterSpacing: '0.3em',
                    }}
                >
                    LIZARD INTERACTIVE ONLINE
                </span>
            </div>

            {/* Top accent line */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #10b981, #3b82f6, #a855f7)',
                }}
            />
        </div>
    );
}