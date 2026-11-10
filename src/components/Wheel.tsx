import { useState, useRef, useEffect } from "react";
import "./Wheel.css";

const RESULT_DELAY_MS = 800;
const POINTER_ANGLE = 90; // Degrees CW from top of wheel

interface WheelProps {
  items: string[];
  onSpinStateChange: (isSpinning: boolean) => void;
  onResult: (winningEpisodeIndex: number) => void;
}

function Wheel({ items, onSpinStateChange, onResult }: WheelProps) {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const winningEpisodeIndex = useRef<number | null>(null);
  const resultTimeout = useRef<number | undefined>(undefined);

  const slicePercent = 100 / items.length;
  const background =
    items.length === 0
      ? "white"
      : `conic-gradient(
        ${items
          .map((_, i) => {
            const hue = (i * 360) / items.length;
            const startPercent = i * slicePercent;
            const endPercent = (i + 1) * slicePercent;
            return `hsl(${hue} 70% 55%) ${startPercent}% ${endPercent}%`;
          })
          .join(", ")}
      )`;

  useEffect(() => () => window.clearTimeout(resultTimeout.current), []);

  function spinWheel(rotationDegrees: number) {
    if (isSpinning || items.length === 0) return;

    winningEpisodeIndex.current = Math.floor(Math.random() * items.length);

    const sliceAngle = 360 / items.length;
    const jitter = (Math.random() - 0.5) * sliceAngle * 0.9; // Final multiplier keeps it from landing too close to the edge of a slice.
    const targetRotation =
      (winningEpisodeIndex.current! + 0.5) * sliceAngle + jitter; // +0.5 centers it within the slice
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
    <div className="wheel-container">
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
              onResult(winningEpisodeIndex.current!);
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
