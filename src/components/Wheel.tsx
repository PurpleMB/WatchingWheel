import { useState } from "react";
import "./Wheel.css";

interface WheelProps {
  items: string[];
}

function Wheel({ items }: WheelProps) {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const slicePercent = 100 / items.length;
  const background = 
    items.length === 0
      ? "white"
      : `conic-gradient(
        ${items.map((_, i) => {
          const hue = (i * 360) / items.length;
          const startPercent = i * slicePercent;
          const endPercent = (i + 1) * slicePercent;
          return `hsl(${hue} 70% 55%) ${startPercent}% ${endPercent}%`
        }).join(", ")}
      )`;

  function spinWheel(rotationDegrees: number) {
    if (isSpinning) return;

    setIsSpinning(true);
    setRotation((prev) => prev + rotationDegrees);
  }

  return (
    <div className="wheel-container">
      <div
        className={`wheel ${isSpinning ? "wheel--spinning" : ""}`}
        style={{ transform: `rotate(${rotation}deg)`, background }}
        onClick={() => spinWheel(1440)}
        onTransitionEnd={(e) => {
          if (e.target === e.currentTarget) setIsSpinning(false);
        }}
      >
        {items.map((item, i) => {
          const angle = (i + 0.5) * (360 / items.length);
          return (
            <span 
              key={i}
              className="wheel__lebel"
              style={{ transform: `translateY(-50%) rotate(${angle - 90}deg)` }}
            >
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default Wheel;