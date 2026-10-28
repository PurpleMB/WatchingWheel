import type { ReactNode } from "react";
import "./StepDisplay.css";

type Step = { name: string; label: string; icon: ReactNode };
type Props = { steps: readonly Step[]; currentStepIndex: number };

function StepDisplay({ steps, currentStepIndex }: Props) {
  return (
    <div className="step-display">
      {steps.map((step, index) => {
        const isCurrent = index === currentStepIndex; 
        return (
          <div
            key = {step.name}
            className={`bead ${isCurrent ? "bead--current" : ""}`}
          >
            {isCurrent && (
              <>
                <span className="bead__icon">{step.icon}</span>
                <span className="bead__label">{step.label}</span>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default StepDisplay;