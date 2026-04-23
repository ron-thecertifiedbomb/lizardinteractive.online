// pages/api/og/[slug].tsx
import { ImageResponse } from '@vercel/og';
import { blogArticles } from '@/data/lists/blogArticle';

export const config = {
    runtime: 'edge',
};

export default async function handler(req: Request) {
    const url = new URL(req.url);
    const slug = url.pathname.split('/').pop();

    const post = blogArticles.find((article) => article.id === slug);

    if (!post) {
        return new Response('Post not found', { status: 404 });
    }

    const title = post.title;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lizardinteractive.online';

    // Try to load logo if exists
    let logoBuffer = null;
    try {
        const logoResponse = await fetch(`${siteUrl}/lizardround.png`);
        if (logoResponse.ok) {
            logoBuffer = await logoResponse.arrayBuffer();
        }
    } catch (error) {
        console.log('Logo not found, using emoji');
    }

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    maxWidth: '600px',
                    margin: '0 auto',
                    backgroundColor: '#080808',
                    border: '1px solid #18181b',
                    padding: '32px',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                }}
            >
                {/* Logo and Title centered */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        marginBottom: '16px',
                        width: '100%',
                    }}
                >
                    {logoBuffer ? (
                        <img
                            src={logoBuffer as any}
                            width={70}
                            height={70}
                            style={{ borderRadius: '12px' }}
                            alt="Logo"
                        />
                    ) : (
                        <div
                            style={{
                                width: '48px',
                                height: '48px',
                                background: '#10b981',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '24px',
                            }}
                        >
                            🦎
                        </div>
                    )}

                </div>

                {/* Title - centered */}
                <h1
                    style={{
                        fontSize: '30px',
                        fontWeight: '900',
                        color: 'white',
                        textTransform: 'uppercase',
                        letterSpacing: '-0.025em',
                        lineHeight: 1.2,
                        textAlign: 'center',
                        maxWidth: '500px',
                    }}
                >
                    {title}
                </h1>

                {/* Bottom Glow Effect */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '100px',
                        background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.15) 0%, transparent 70%)',
                        pointerEvents: 'none',
                    }}
                />

                {/* Subtle top border gradient */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent, #10b981, #3b82f6, #a855f7, transparent)',
                    }}
                />

                {/* Footer - centered */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '20px',
                        left: 0,
                        right: 0,
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <span
                        style={{
                            fontSize: '10px',
                            color: '#52525b',
                            fontFamily: 'monospace',
                            letterSpacing: '0.3em',
                        }}
                    >
                        LIZARD INTERACTIVE ONLINE
                    </span>
                </div>
            </div>
        ),
        {
            width: 600,
            height: 400,
        }
    );
}