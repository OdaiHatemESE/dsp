import { Service } from "@/config/service.model";
import { ServiceConfig } from "@/config/services-config";
import { useAppSelector, useAppDispatch } from "@/store/lib/hooks"; // Import useAppDispatch if needed
import classNames from "classnames";
import { useState, useEffect } from "react";

interface Step {
  title: string;
  status: string; // 'step-current', 'step-completed', or 'step-upcoming'
}

interface SteperProps {
  serviceId: string;
}

const Steper: React.FC<SteperProps> = ({ serviceId }) => {
  // Find the service based on the serviceId
  const service = ServiceConfig.find((service) => service.serviceId === serviceId);

  // Use Redux state to get the service state and steps
  const serviceState = useAppSelector((state) => state.service.service);

  // Initialize steps from the Redux state
  const [steps, setSteps] = useState<Step[]>(serviceState?.steps || service?.steps || []);

  // Function to add a dynamic step
  const addDynamicStep = () => {
    // Example: Adding a step conditionally
    if (!steps.find((step) => step.title === "Dynamic Step")) {
      setSteps([
        ...steps,
        {
          title: "Dynamic Step",
          status: "step-upcoming",
        },
      ]);
    }
  };

  // Function to update the status of steps based on the current step index
  const updateStepStatus = (currentStepIndex: number) => {
    setSteps((prevSteps) =>
      prevSteps.map((step, index) => {
        if (index < currentStepIndex) return { ...step, status: "step-completed" };
        if (index === currentStepIndex) return { ...step, status: "step-current" };
        return { ...step, status: "step-upcoming" };
      })
    );
  };

  // Manage current step index
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  // Effect to update step statuses when the current step changes
  useEffect(() => {
    updateStepStatus(currentStepIndex);
  }, [currentStepIndex]);

  // Navigation functions
  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  return (
    <nav aria-label="Progress" className="aegov-step pb-9 mb-10">
      <ol role="list" className="flex items-center justify-between">
        {steps.map((step, index) => (
          <li
            key={index}
            className={classNames("relative", step.status, { "w-full": index != steps.length - 1 })}
          >
            <div
              className="step-connector"
              aria-hidden="true"
              style={{ display: index === steps.length - 1 ? "none" : "flex" }}
            >
              <div className="step-connector-state"></div>
            </div>
            <a href="#" className="step-badge" onClick={() => setCurrentStepIndex(index)}>
              {step.status !== "step-completed" && <span>{index + 1}</span>}
              <span className="step-text-below">{step.title}</span>
            </a>
          </li>
        ))}
      </ol>
      <div className="flex justify-between mt-12">
        <button onClick={prevStep} disabled={currentStepIndex === 0}>
          Previous
        </button>
        <button onClick={addDynamicStep}>Add Dynamic Step</button>
        <button onClick={nextStep} disabled={currentStepIndex === steps.length - 1}>
          Next
        </button>
      </div>
    </nav>
  );
};

export default Steper;
