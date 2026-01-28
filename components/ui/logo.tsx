import React from "react";

export function Logo({ className = "w-8 h-8" }: { className?: string }) {
    // Geometry Settings
    // ViewBox: 100x100
    // Center: 50,50
    const strokeWidth = 10;
    const outerRadius = 35;
    // 2026 Refinement: "The Sweet Spot"
    // Outer Stroke Inner Edge: 30px
    // Target Gap: 8px (Balanced Tensions)
    // Inner Stroke Outer Edge: 22px (30 - 8)
    // Inner Radius (Center): 17px (22 - 5)
    const innerRadius = 17;

    // Gap calculation (Standard C shape)
    // Circumference = 2 * PI * r
    // We want a gap of about 60 degrees?
    // 300 degrees visible.
    // Circle length = 1 (pathLength)
    // dasharray = 0.75 (visible), 0.25 (gap)? (270 degrees)
    // Let's use pathLength=1 for easy math.

    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className={className}
            aria-label="CorrectCase Logo"
        >
            <defs>
                <linearGradient id="brand-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="oklch(var(--brand-core))" />
                    <stop offset="100%" stopColor="oklch(60% 0.2 240)" />
                </linearGradient>
            </defs>
            <g transform="rotate(-90 50 50)">
                {/* Outer Capital C */}
                <circle
                    cx="50"
                    cy="50"
                    r={outerRadius}
                    stroke="url(#brand-gradient)"
                    strokeDasharray="0.75 1"
                    pathLength="1"
                    transform="rotate(135 50 50)"
                />

                {/* Inner Lowercase c */}
                <circle
                    cx="50"
                    cy="50"
                    r={innerRadius}
                    stroke="url(#brand-gradient)"
                    strokeDasharray="0.75 1"
                    pathLength="1"
                    transform="rotate(135 50 50)"
                />
            </g>
        </svg>
    );
}

// Explanation of Rotation:
// Default circle stroke starts at 3 o'clock (0 deg).
// "C" usually needs gap at 3 o'clock.
// stroke-dasharray="0.75 1" draws 75% of circle.
// By default it draws clockwise from 0 deg -> 270 deg (6 o'clock).
// Gap is from 270 to 360 (Bottom Right quadrant).
// We want gap at Right (0 deg/360).
// So we need to rotate the stroke so the gap (the empty 25%) is centered at 0 deg.
// The drawn part is center of 0-270 is 135 deg.
// Center of gap is 315 deg (-45).
// To put gap at 0, we rotate by +45?
// Actually, let's just rotate the container until it looks like a C.
// If I rotate 135, the start (0) moves to 135. End (270) moves to 45.
// Gap is 45 to 135. That's Top.
// Let's stick to standard manual path if circle rotation is confusing?
// No, circle is better for concentricity.
// Let's try transform="rotate(-135 50 50)".
// Start at -135. End at 135.
// Gap is 135 to -135 (Right side). Perfect.
