import { ImageResponse } from '@vercel/og';

export const config = {
    runtime: 'edge',
};

export default function handler() {
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
                    backgroundColor: '#0a0a0a',
                    color: 'white',
                    fontFamily: 'sans-serif',
                }}
            >
                {/* Main Content Area */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 80px', textAlign: 'center' }}>

                    {/* The Logo */}
                    <img
                        src={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://lizardinteractive.online'}/logo.svg`}
                        alt="Lizrd Interactive Online Logo"
                        width={100}
                        height={100}
                        style={{ marginBottom: '30px' }}
                    />

                    <div style={{ color: '#4ade80', fontSize: 24, marginBottom: 20, letterSpacing: '0.1em' }}>
                        LIZRD INTERACTIVE ONLINE • PERFORMANCE ENGINEERING
                    </div>

                    <div style={{ fontSize: 72, fontWeight: 900, marginBottom: 30, lineHeight: 1.1 }}>
                        I Build the Fastest 1% of the Web.
                    </div>

                    <div style={{ fontSize: 32, color: '#a1a1aa', marginBottom: 60, lineHeight: 1.4, maxWidth: '900px' }}>
                        Stop losing mobile customers to bloated, slow-loading websites. I engineer lightning-fast custom web applications with a guaranteed 100/100 Google Lighthouse performance score.
                    </div>

                    {/* Lighthouse Metrics Recreated */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', borderTop: '2px solid #27272a', paddingTop: '40px' }}>
                        <div style={{ color: '#71717a', fontSize: 24, marginBottom: 40, textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                            Verified Metrics
                        </div>
                        <div style={{ display: 'flex', gap: '60px' }}>
                            {[
                                { label: 'Performance', score: 100 },
                                { label: 'Accessibility', score: 100 },
                                { label: 'Best Practices', score: 100 },
                                { label: 'SEO', score: 100 },
                            ].map((metric) => (
                                <div key={metric.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div
                                        style={{
                                            width: 120,
                                            height: 120,
                                            borderRadius: 60,
                                            border: '8px solid #22c55e',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#4ade80',
                                            fontSize: 42,
                                            fontWeight: 'bold',
                                            backgroundColor: 'rgba(34, 197, 94, 0.1)',
                                            marginBottom: 20,
                                        }}
                                    >
                                        {metric.score}
                                    </div>
                                    <div style={{ color: '#a1a1aa', fontSize: 24 }}>{metric.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        ),
        { width: 1200, height: 630 }
    );
}