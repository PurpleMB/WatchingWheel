import { useState } from "react";
import "./Wheel.css";

function Wheel() {
  const [rotation, setRotation] = useState(0);

  function spinWheel(rotationDegrees: number) {
    setRotation((prev) => prev +rotationDegrees);
  }

  return (
    <div className="wheel-container">
      <div
        className="wheel"
        style={{ transform: `rotate(${rotation}deg)`}}
        onClick={() => spinWheel(1440)}
      />
    </div>
  );
}

export default Wheel;