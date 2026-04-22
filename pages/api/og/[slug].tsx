import { ImageResponse } from '@vercel/og';
import { blogArticles } from '@/data/lists/blogArticle';
import fs from 'fs';
import path from 'path';

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

    // Try to load the blog's actual image if it exists
    let blogImageData = null;
    if (post.image) {
        try {
            // For Edge runtime, we need to fetch the image via URL
            const imageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${post.image}`;
            const imageResponse = await fetch(imageUrl);
            blogImageData = await imageResponse.arrayBuffer();
        } catch (err) {
            console.log('Could not load blog image:', err);
        }
    }

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
            >
                {/* If blog image exists, use it as background */}
                {blogImageData ? (
                    <img
                        src={`data:image/jpeg;base64,${Buffer.from(blogImageData).toString('base64')}`}
                        alt=""
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                ) : null}

                {/* Overlay gradient for readability */}
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
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
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
                            background: 'rgba(16, 185, 129, 0.2)',
                            borderRadius: '100px',
                            marginBottom: '30px',
                            border: '1px solid rgba(16, 185, 129, 0.5)',
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
                                color: '#888',
                            }}
                        >
                            lizardinteractive.online
                        </span>
                    </div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}   