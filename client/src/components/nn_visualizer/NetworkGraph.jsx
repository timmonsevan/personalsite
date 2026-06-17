import { useState, useEffect, useMemo } from "react";

const W = 1000;
const H = 500;
const PAD = 20;
const CELL = 5; // px per input pixel cell

const X_IN = 90; // center of 28×28 input grid
const X_H1 = 320;
const X_H2 = 560;
const X_OUT = 870;

// Precomputed y-positions — these never change, only colors change per prediction
const Y1 = Array.from(
  { length: 128 },
  (_, i) => PAD + (i + 0.5) * ((H - 2 * PAD) / 128),
);
const Y2 = Array.from(
  { length: 64 },
  (_, i) => PAD + (i + 0.5) * ((H - 2 * PAD) / 64),
);
const Y3 = Array.from(
  { length: 10 },
  (_, i) => PAD + (i + 0.5) * ((H - 2 * PAD) / 10),
);

// 20 evenly-spaced H1 indices used for drawing edges (128×64 would be too many)
const H1_SAMPLE = Array.from({ length: 20 }, (_, i) =>
  Math.floor((i * 128) / 20),
);

const EMPTY_A0 = new Array(784).fill(0);
const EMPTY_A1 = new Array(128).fill(0);
const EMPTY_A2 = new Array(64).fill(0);
const EMPTY_A3 = new Array(10).fill(0);

function useTheme() {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute("data-theme") ?? "light",
  );
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute("data-theme") ?? "light");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);
  return theme;
}

function nodeColorDark(v) {
  const r = Math.round(30 + v * 225);
  const g = Math.round(30 + v * 150);
  const b = Math.round(80 - v * 60);
  return `rgb(${r},${g},${b})`;
}

function nodeColorLight(v) {
  const r = Math.round(200 - v * 110);
  const g = Math.round(210 - v * 72);
  const b = Math.round(210 - v * 120);
  return `rgb(${r},${g},${b})`;
}

function normalise(arr) {
  const max = Math.max(...arr, 1e-9);
  return arr.map((v) => v / max);
}

const LABELS = [
  [X_IN, "input (784)"],
  [X_H1, "hidden 1 (128)"],
  [X_H2, "hidden 2 (64)"],
  [X_OUT, "output"],
];

export default function NetworkGraph({ activations }) {
  const [a0, a1, a2, a3] = activations ?? [
    EMPTY_A0,
    EMPTY_A1,
    EMPTY_A2,
    EMPTY_A3,
  ];

  const theme = useTheme();
  const isDark = theme === "dark";

  const nodeColor = isDark ? nodeColorDark : nodeColorLight;
  const edgeRgb = isDark ? "255,180,50" : "70,130,70";
  const textMuted = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";
  const labelColor = isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.45)";
  const nodeStroke = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)";
  const digitFill = isDark ? "white" : "rgba(0,0,0,0.85)";

  const n0 = useMemo(() => normalise(a0), [a0]);
  const n1 = useMemo(() => normalise(a1), [a1]);
  const n2 = useMemo(() => normalise(a2), [a2]);
  // a3 is already softmax (0–1)

  const gridX = X_IN - (28 * CELL) / 2;
  const gridY = H / 2 - (28 * CELL) / 2;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="network-svg"
      preserveAspectRatio="xMidYMid meet"
    >
      {n0.map((v, idx) => {
        const gray = Math.round(v * 255);
        return (
          <rect
            key={idx}
            x={gridX + (idx % 28) * CELL}
            y={gridY + Math.floor(idx / 28) * CELL}
            width={CELL - 0.5}
            height={CELL - 0.5}
            fill={`rgb(${gray},${gray},${gray})`}
          />
        );
      })}

      {H1_SAMPLE.flatMap((i1) =>
        Y2.map((y2, i2) => (
          <line
            key={`e1-${i1}-${i2}`}
            x1={X_H1}
            y1={Y1[i1]}
            x2={X_H2}
            y2={y2}
            stroke={`rgba(${edgeRgb},${0.02 + n1[i1] * n2[i2] * 0.18})`}
            strokeWidth={0.4}
          />
        )),
      )}

      {Y2.flatMap((y2, i2) =>
        Y3.map((y3, i3) => (
          <line
            key={`e2-${i2}-${i3}`}
            x1={X_H2}
            y1={y2}
            x2={X_OUT}
            y2={y3}
            stroke={`rgba(${edgeRgb},${0.02 + n2[i2] * a3[i3] * 0.45})`}
            strokeWidth={0.5}
          />
        )),
      )}

      {Y1.map((y, i) => (
        <circle
          key={`h1-${i}`}
          cx={X_H1}
          cy={y}
          r={1.8}
          fill={nodeColor(n1[i])}
        />
      ))}

      {Y2.map((y, i) => (
        <circle
          key={`h2-${i}`}
          cx={X_H2}
          cy={y}
          r={3}
          fill={nodeColor(n2[i])}
        />
      ))}

      {Y3.map((y, i) => (
        <g key={`out-${i}`}>
          <circle
            cx={X_OUT}
            cy={y}
            r={18}
            fill={nodeColor(a3[i])}
            stroke={nodeStroke}
            strokeWidth={1}
          />
          <text
            x={X_OUT}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={digitFill}
            fontSize={13}
            fontWeight="bold"
            style={{ userSelect: "none" }}
          >
            {i}
          </text>
          <text
            x={X_OUT + 26}
            y={y}
            dominantBaseline="middle"
            fill={textMuted}
            fontSize={10}
            style={{ userSelect: "none" }}
          >
            {(a3[i] * 100).toFixed(1)}%
          </text>
        </g>
      ))}

      {LABELS.map(([x, label]) => (
        <text
          key={label}
          x={x}
          y={H - 4}
          textAnchor="middle"
          fill={labelColor}
          fontSize={11}
          style={{ userSelect: "none" }}
        >
          {label}
        </text>
      ))}
    </svg>
  );
}
