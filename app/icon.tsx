import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
    width: 32,
    height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
    // 2026 "Sweet Spot" Geometry
    // Scale: 32x32 is small, so we render at 100x100 and let Next.js downscale/serve nicely, 
    // OR we render at 32x32 directly. 
    // Rendering at 32x32 with 100x100 viewBox is standard for SVGs.
    // But ImageResponse outputs PNG. So we should probably render a high-res version 
    // and let the browser scale it or export multiple sizes.
    // Actually, let's make the native size 48x48 or 100x100 for better quality on retina.
    // But export const size controls the output file size header.
    // Let's stick to standard 32x32 for 'favicon.ico' equivalent behavior, 
    // or maybe 48x48.
    // Ideally we define size = { width: 32, height: 32 } but render high DPI? 
    // No, standard is to match.
    // Let's use 100% dimensions in the SVG with viewBox.

    // Colors (OKLCH -> Hex fallback for maximum compatibility)
    // Core: oklch(45% 0.24 260) -> #0055ff (Approx Vivid Blue)
    // Secondary: oklch(60% 0.2 240) -> #4d88ff (Approx Lighter Blue)
    // We'll use the OKLCH strings directly as they are widely supported in modern rendering,
    // but ImageResponse uses Satori which supports a subset of CSS.
    // Satori supports linear-gradient.
    // Let's use Hex for Satori safety.
    const brandCore = "#3b82f6"; // Tailwind Blue-500 approx
    const brandLight = "#60a5fa"; // Tailwind Blue-400 approx
    // Actually our brand is more Vivid/Purple-ish.
    const c1 = "#2045e6"; // Deep Vivid Blue
    const c2 = "#4d73ff"; // Lighter Blue

    const strokeWidth = 10;
    const outerRadius = 35;
    const innerRadius = 17; // The Sweet Spot

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "transparent",
                    // Reset defaults
                }}
            >
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <linearGradient id="brand-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                            <stop offset="0%" stopColor={c1} />
                            <stop offset="100%" stopColor={c2} />
                        </linearGradient>
                    </defs>
                    <g transform="rotate(-90 50 50)">
                        {/* Outer Capital C */}
                        <circle
                            cx="50"
                            cy="50"
                            r={outerRadius}
                            stroke="url(#brand-gradient)"
                            strokeWidth={strokeWidth}
                            strokeDasharray="0.75 1"
                            pathLength="1"
                            transform="rotate(135 50 50)"
                            strokeLinecap="round"
                        />

                        {/* Inner Lowercase c */}
                        <circle
                            cx="50"
                            cy="50"
                            r={innerRadius}
                            stroke="url(#brand-gradient)"
                            strokeWidth={strokeWidth}
                            strokeDasharray="0.75 1"
                            pathLength="1"
                            transform="rotate(135 50 50)"
                            strokeLinecap="round"
                        />
                    </g>
                </svg>
            </div>
        ),
        {
            ...size,
        }
    );
}
