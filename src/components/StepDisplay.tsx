import { Fragment, type ReactNode } from "react";
import "./StepDisplay.css";

type Step = { name: string; label: string; icon: ReactNode };
type Props = { steps: readonly Step[]; currentStepIndex: number };

function StepDisplay({ steps, currentStepIndex }: Props) {
  return (
    <div className="step-display">
      {steps.map((step, index) => {
        const isCurrent = index === currentStepIndex; 
        return (
          <Fragment key={step.name}>
            {index > 0 && 
              <div 
                className={`bead-connector ${index <= currentStepIndex ? "bead-connector--done" : ""}`} 
              />
            }
            <div
              className={`bead ${isCurrent ? "bead--current" : ""} ${index < currentStepIndex ? "bead--done" : ""}`}
            >
              {isCurrent && (
                <>
                  <span className="bead__icon">{step.icon}</span>
                  <span className="bead__label">{step.label}</span>
                </>
              )}
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}

export default StepDisplay;