export function getAuditEmailHtml(
  firstName: string,
  websiteUrl: string,
): string {
  return `
    <div style="font-family: 'Courier New', Courier, monospace; max-width: 600px; margin: 0 auto; background-color: #0a0a0a; color: #d4d4d8; padding: 32px; border-radius: 8px; border: 1px solid #27272a;">
        <!-- Header -->
        <div style="border-bottom: 1px solid #27272a; padding-bottom: 16px; margin-bottom: 24px;">
            <div style="margin-bottom: 16px;">
                <img src="https://lizardinteractive.online/lizardround.png" alt="Lizrd Interactive" style="display: inline-block; vertical-align: middle; height: 36px; width: auto; margin-right: 12px;" />
                <h2 style="color: #4ade80; margin: 0; font-size: 18px; letter-spacing: 1px; text-transform: uppercase; display: inline-block; vertical-align: middle;">/// LIZARD_PERFORMANCE_AUDIT</h2>
            </div>
            <p style="color: #52525b; font-size: 12px; margin-top: 4px; margin-bottom: 0;">TARGET: ${websiteUrl}</p>
        </div>

        <!-- Body -->
        <p style="font-size: 15px; line-height: 1.6; color: #f4f4f5;">Hello ${firstName},</p>
        <p style="font-size: 15px; line-height: 1.6;">I recently ran a performance diagnostic on <strong>${websiteUrl}</strong> and identified significant mobile latency.</p>
        
        <!-- Diagnostic Alert Box -->
        <div style="background-color: rgba(244, 63, 94, 0.1); border-left: 3px solid #f43f5e; padding: 12px 16px; margin: 24px 0;">
            <span style="color: #f43f5e; font-weight: bold; font-size: 14px;">STATUS: Sub-optimal Load Times Detected</span><br/>
            <span style="font-size: 13px; color: #d4d4d8;">Your current architecture is leaking potential revenue.</span>
        </div>

        <p style="font-size: 15px; line-height: 1.6;">I can bridge this gap for you with guaranteed <span style="color: #4ade80; font-weight: bold;">100/100 Google Lighthouse</span> optimizations. Every millisecond saved is friction removed from your revenue stream.</p>
        <p style="font-size: 15px; line-height: 1.6;">You can verify my metrics below. If you're open to fixing this, <strong>reply to this email</strong> and I'll send over a 5-minute technical breakdown of the exact issues.</p>
        
        <!-- Embedded Image -->
        <div style="margin: 32px 0;">
            <img src="cid:email_image" alt="Performance Overview" style="max-width: 100%; height: auto; border-radius: 4px; border: 1px solid #27272a;" />
        </div>

        <!-- CTA Button -->
        <div style="margin: 32px 0;">
            <a href="https://lizardinteractive.online/" style="background-color: #4ade80; color: #000000; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 4px; display: inline-block; text-transform: uppercase; font-size: 14px;">Verify My Metrics</a>
        </div>

        <!-- Footer -->
        <div style="border-top: 1px solid #27272a; padding-top: 16px; margin-top: 32px;">
            <p style="color: #52525b; font-size: 11px; margin: 0;">>> END OF TRANSMISSION</p>
            <p style="color: #3f3f46; font-size: 10px; margin-top: 4px;">Sent via Lizrd Engine v1.0</p>
        </div>
    </div>
  `;
}
