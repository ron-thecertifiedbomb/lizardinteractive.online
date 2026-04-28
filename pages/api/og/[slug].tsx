// pages/api/og/[slug].tsx
import { ImageResponse } from '@vercel/og';

export const config = {
    runtime: 'edge',
};

export default async function handler(req: Request) {
    const url = new URL(req.url);
    const slug = url.pathname.split('/').pop();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lizardinteractive.online';

    if (!slug) {
        return new Response('Slug not found in URL', { status: 400 });
    }

    // Fetch the article data from our own API endpoint
    // This is a better pattern for edge functions that need DB access
    let post;
    try {
        const articleApiUrl = `${siteUrl}/api/articles?id=${slug}`;
        const articleResponse = await fetch(articleApiUrl, { next: { revalidate: 3600 } }); // Cache for 1 hour

        if (!articleResponse.ok) {
            const errorText = await articleResponse.text();
            console.error(`Failed to fetch article from API: ${articleResponse.status}`, errorText);
            return new Response('Post not found', { status: 404 });
        }
        post = await articleResponse.json();
    } catch (error) {
        console.error('Error fetching article for OG image:', error);
        return new Response('Failed to fetch article data', { status: 500 });
    }

    if (!post) {
        return new Response('Post not found', { status: 404 });
    }

    const title = post.title;

    // Construct the correct absolute URL for the background image
    const imageSource = post.ogImage || post.image || "";
    const backgroundImageUrl = imageSource.startsWith("http")
        ? imageSource
        : `${siteUrl}${imageSource.startsWith("/") ? "" : "/"}${imageSource}`;

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#0a0a0a',
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
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}