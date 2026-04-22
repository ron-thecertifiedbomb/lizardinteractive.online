// pages/api/og/[slug].tsx
import { ImageResponse } from '@vercel/og';
import { blogArticles } from '@/data/lists/blogArticle';

export const config = {
    runtime: 'edge',
};

export default async function handler(req: Request) {
    // Extract slug from the URL
    const url = new URL(req.url);
    const slug = url.pathname.split('/').pop();

    // Find the blog post
    const post = blogArticles.find((article) => article.id === slug);

    if (!post) {
        return new Response('Post not found', { status: 404 });
    }

    const category = post.category.replace('_', ' ');
    const title = post.title;

    // Generate the OG image
    return new ImageResponse(
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
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
            >
                {/* Top accent bar */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '8px',
                        background: '#10b981',
                    }}
                />

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
                        marginBottom: '40px',
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

                {/* Bottom gradient bar */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: 'linear-gradient(90deg, #10b981, #3b82f6, #a855f7)',
                    }}
                />

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
        }
    );
}