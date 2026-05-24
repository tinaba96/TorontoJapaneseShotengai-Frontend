"use client";

import React from "react";

type PetalSpec = {
  left: string;
  size: number;
  delay: string;
  duration: string;
  drift: number;
  rotate: number;
  opacity: number;
};

const PETALS: PetalSpec[] = Array.from({ length: 18 }).map((_, i) => ({
  left: `${(i * 5.4) % 100}%`,
  size: 10 + ((i * 7) % 18),
  delay: `${(i * 0.6) % 12}s`,
  duration: `${12 + ((i * 1.7) % 10)}s`,
  drift: ((i * 31) % 60) - 30,
  rotate: (i * 47) % 360,
  opacity: 0.45 + ((i * 13) % 40) / 100,
}));

const SakuraPetals: React.FC<{ density?: "light" | "normal" }> = ({
  density = "normal",
}) => {
  const list = density === "light" ? PETALS.slice(0, 8) : PETALS;
  return (
    <>
      <style jsx>{`
        @keyframes petalFall {
          0% {
            transform: translate3d(0, -10vh, 0) rotate(0deg);
          }
          100% {
            transform: translate3d(var(--drift), 110vh, 0)
              rotate(var(--rot));
          }
        }
        .petal {
          position: absolute;
          top: 0;
          animation-name: petalFall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .petal {
            animation: none !important;
            display: none;
          }
        }
      `}</style>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {list.map((p, i) => (
          <span
            key={i}
            className="petal"
            style={
              {
                left: p.left,
                width: p.size,
                height: p.size,
                opacity: p.opacity,
                animationDelay: p.delay,
                animationDuration: p.duration,
                "--drift": `${p.drift}vw`,
                "--rot": `${p.rotate}deg`,
              } as React.CSSProperties
            }
          >
            <svg viewBox="0 0 32 32" className="h-full w-full">
              <defs>
                <radialGradient id={`petalGrad-${i}`} cx="50%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#fff5f8" />
                  <stop offset="55%" stopColor="#ff97b6" />
                  <stop offset="100%" stopColor="#e91c63" />
                </radialGradient>
              </defs>
              <path
                d="M16 2 C 22 6, 28 12, 28 18 C 28 25, 22 30, 16 30 C 10 30, 4 25, 4 18 C 4 12, 10 6, 16 2 Z"
                fill={`url(#petalGrad-${i})`}
              />
              <path
                d="M16 6 C 18 12, 18 22, 16 28"
                stroke="#9a1450"
                strokeOpacity="0.25"
                strokeWidth="0.6"
                fill="none"
              />
            </svg>
          </span>
        ))}
      </div>
    </>
  );
};

export default SakuraPetals;
