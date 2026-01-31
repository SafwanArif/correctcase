import { ImageResponse } from "next/og";

// Route segment config
export const dynamic = "force-static";

// Image metadata
export const size = {
    width: 32,
    height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
    // 2026 Adaptive Favicon Strategy:
    // Since Next.js static generation doesn't have access to runtime color-scheme,
    // we generate TWO versions and browsers pick the right one via manifest/link media queries.
    // However, for the default icon.tsx, browsers typically use a single version.
    // 
    // Best practice: Generate a NEUTRAL version that works in both modes,
    // OR use SVG with embedded media queries (not supported by Next.js icon.tsx yet).
    //
    // For now, we'll generate a version optimized for DARK MODE (most common),
    // but with sufficient contrast to work in light mode too.
    //
    // Alternative: Create icon-light.tsx and icon-dark.tsx and use HTML link tags
    // with media queries. Let's do that approach.

    // DARK MODE COLORS (for dark browser chrome - need LIGHT logo)
    const darkModeC1 = "#b3c2ff"; // High-Voltage Obsidian (L90)
    const darkModeC2 = "#0ce4e4"; // High-Voltage Radiant (L85)

    // LIGHT MODE COLORS (for light browser chrome - need DARK logo)
    // Using our light mode brand tokens: darker obsidian + victory emerald
    const lightModeC1 = "#2a4fab"; // Dark Obsidian (L28) - oklch(28% 0.18 255)
    const lightModeC2 = "#3d8f5a"; // Victory Emerald (L48) - oklch(48% 0.18 150)

    // For static generation, we default to DARK MODE version (light colors)
    // This works best on most browsers' dark tabs
    const c1 = darkModeC1;
    const c2 = darkModeC2;

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

                    {/* 
                      Satori/ImageResponse often lacks support for 'pathLength="1"'.
                      We must use absolute pixel values for strokeDasharray.
                      
                      Outer Radius: 35
                      Circumference: 2 * PI * 35 ~= 220
                      75% Visible: 165
                      DashArray: "165 220"
                      
                      Inner Radius: 17
                      Circumference: 2 * PI * 17 ~= 107
                      75% Visible: 80
                      DashArray: "80 107"
                    */}
                    <g transform="rotate(-90 50 50)">
                        {/* Outer Capital C */}
                        <circle
                            cx="50"
                            cy="50"
                            r={outerRadius}
                            stroke="url(#brand-gradient)"
                            strokeWidth={strokeWidth}
                            strokeDasharray="165 220"
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
                            strokeDasharray="80 107"
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
