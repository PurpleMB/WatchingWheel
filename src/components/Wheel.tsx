import { useState, useRef, useEffect } from "react";
import "./Wheel.css";

const RESULT_DELAY_MS = 800;
const POINTER_ANGLE = 90; // Degrees CW from top of wheel

interface WheelProps {
  radius: number;
  items: string[];
  colors?: string[];
  onSpinStateChange: (isSpinning: boolean) => void;
  onResult: (winningIndex: number) => void;
}

function Wheel({
  radius,
  items,
  colors,
  onSpinStateChange,
  onResult,
}: WheelProps) {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const winningIndex = useRef<number | null>(null);
  const resultTimeout = useRef<number | undefined>(undefined);

  let background = "white";
  if (items.length > 0) {
    const sliceAngle = 360 / items.length;
    const blendAngle = Math.min(0.25, sliceAngle / 4);

    const palette = [...new Set(colors ?? [])];
    const sliceColors = items.map((_, i) => {
      if (palette.length === 0) {
        return `hsl(${(i * 360) / items.length} 70% 55%)`;
      }

      const color = palette[i % palette.length];

      if (i === items.length - 1 && color === palette[0]) {
        const prevColor = palette[(i - 1) % palette.length];
        const altColor = palette.find(
          (c) => c !== prevColor && c !== palette[0],
        );
        if (altColor) {
          return altColor;
        }
      }

      return color;
    });

    const stops = sliceColors.flatMap((color, i) => {
      const nextColor = sliceColors[(i + 1) % sliceColors.length];
      const boundary = (i + 0.5) * sliceAngle;

      return [
        `${color} ${boundary - blendAngle}deg`,
        `${nextColor} ${boundary + blendAngle}deg`,
      ];
    });

    background = `
      conic-gradient(
        from ${sliceAngle / 2}deg,
        ${sliceColors[0]} 0deg,
        ${stops.join(", ")},
        ${sliceColors[0]} 360deg
      )
    `;
  }

  useEffect(() => () => window.clearTimeout(resultTimeout.current), []);

  function spinWheel(rotationDegrees: number) {
    if (isSpinning || items.length === 0) return;

    winningIndex.current = Math.floor(Math.random() * items.length);

    const sliceAngle = 360 / items.length;
    const jitter = (Math.random() - 0.5) * sliceAngle * 0.9; // Final multiplier keeps it from landing too close to the edge of a slice.
    const targetRotation = (winningIndex.current! + 0.5) * sliceAngle + jitter; // +0.5 centers it within the slice
    const extraSpins = 360 * (Math.floor(Math.random() * 3) + 3); // adds 3-5 extra spins to the wheel for variation

    const currentRotation = rotation % 360;
    const totalRotation =
      extraSpins +
      ((((POINTER_ANGLE - targetRotation - currentRotation) % 360) + 360) %
        360);

    setIsSpinning(true);
    onSpinStateChange(true);
    setRotation((prev) => prev + totalRotation);
  }

  return (
    <div
      className="wheel-container"
      style={{ width: radius * 2, height: radius * 2 }}
    >
      <div className="wheel-wrapper">
        <div
          className={`wheel ${isSpinning ? "wheel--spinning" : ""}`}
          style={{ transform: `rotate(${rotation}deg)`, background }}
          onClick={() => spinWheel(1440)}
          onTransitionEnd={(e) => {
            if (e.target !== e.currentTarget) return;
            resultTimeout.current = window.setTimeout(() => {
              setIsSpinning(false);
              onSpinStateChange(false);
              onResult(winningIndex.current!);
            }, RESULT_DELAY_MS);
          }}
        >
          {items.map((item, i) => {
            const angle = (i + 0.5) * (360 / items.length);
            return (
              <span
                key={i}
                className="wheel__label"
                style={{
                  transform: `translateY(-50%) rotate(${angle - 90}deg)`,
                }}
              >
                {item}
              </span>
            );
          })}
        </div>
        <div className="wheel-pointer" />
      </div>
    </div>
  );
}

export default Wheel;
