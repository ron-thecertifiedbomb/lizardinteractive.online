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

    const category = post.category.replace('_', ' ');
    const title = post.title;

    // ✅ Force proper image response
    const image = new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
                    padding: '60px 80px',
                }}
            >
                {/* Logo */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '40px',
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
                            fontSize: '32px',
                        }}
                    >
                        🦎
                    </div>
                    <span
                        style={{
                            fontSize: '28px',
                            fontWeight: 'bold',
                            color: '#10b981',
                            letterSpacing: '3px',
                        }}
                    >
                        LIZARD INTERACTIVE
                    </span>
                </div>

                {/* Category Badge */}
                <div
                    style={{
                        display: 'flex',
                        padding: '8px 24px',
                        background: 'rgba(16, 185, 129, 0.15)',
                        borderRadius: '100px',
                        marginBottom: '30px',
                        border: '1px solid rgba(16, 185, 129, 0.4)',
                    }}
                >
                    <span
                        style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#10b981',
                            letterSpacing: '2px',
                        }}
                    >
                        {category}
                    </span>
                </div>

                {/* Title */}
                <div
                    style={{
                        display: 'flex',
                        textAlign: 'center',
                        maxWidth: '900px',
                    }}
                >
                    <span
                        style={{
                            fontSize: '52px',
                            fontWeight: '900',
                            color: 'white',
                            lineHeight: 1.2,
                        }}
                    >
                        {title}
                    </span>
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
                    }}
                >
                    <span
                        style={{
                            fontSize: '14px',
                            color: '#666',
                        }}
                    >
                        lizardinteractive.online
                    </span>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
            // ✅ Add these headers
            headers: {
                'content-type': 'image/png',
                'cache-control': 'public, max-age=31536000, immutable',
            },
        }
    );

    return image;
}