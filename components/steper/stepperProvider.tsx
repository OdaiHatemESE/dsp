import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ServiceStep } from '@/config/service.model';

// Define the context type
interface StepperContextType {
  currentStepIndex: number;
  setCurrentStepIndex: (index: number) => void;
  addDynamicStep: (step: ServiceStep) => void;
  steps: ServiceStep[];
  getStepClass: (index: number) => string;
  nextStep: () => void;
  prevStep: () => void;
}

// Create the context
const StepperContext = createContext<StepperContextType | undefined>(undefined);

// Stepper context provider component
interface StepperProviderProps {
  children: ReactNode;
  initialSteps?: ServiceStep[];
  serviceId: string;
}

export const StepperProvider: React.FC<StepperProviderProps> = ({ children, initialSteps, serviceId }) => {
 
  
  // Initialize steps and current step index state
  const [steps, setSteps] = useState<ServiceStep[]>(initialSteps || []);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  

  // Function to add a dynamic step
  const addDynamicStep = (step: ServiceStep) => {
    setSteps((prevSteps) => [...prevSteps, step]);
  };

  // Function to get class for a step based on its index
  const getStepClass = (index: number): string => {
    if (index < currentStepIndex) return 'step-completed'; // If step index is less than current step index, it is completed
    if (index === currentStepIndex) return 'step-current'; // If step index is equal to current step index, it is current
    return 'step-upcoming'; // Otherwise, the step is upcoming
  };

  // Function to move to the next step
  const nextStep = () => {
    setCurrentStepIndex((prevIndex) => {
      if (prevIndex < steps.length - 1) {
        return prevIndex + 1;
      }
      return prevIndex; // Return current index if already at last step
    });
  };

  // Function to move to the previous step
  const prevStep = () => {
    setCurrentStepIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      }
      return prevIndex; // Return current index if already at first step
    });
  };

  const value = {
    currentStepIndex,
    setCurrentStepIndex,
    addDynamicStep,
    steps,
    getStepClass,
    nextStep,
    prevStep,
  };

  return <StepperContext.Provider value={value}>{children}</StepperContext.Provider>;
};

// Hook to use the StepperContext
export const useStepper = () => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error('useStepper must be used within a StepperProvider');
  }
  return context;
};
