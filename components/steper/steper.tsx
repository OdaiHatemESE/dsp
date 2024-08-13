import React from 'react';
import { useStepper } from './stepperProvider';
import classNames from 'classnames';
import Helper from '../helper';



interface params {
  serviceId: string
}

// Stepper component
const Stepper: React.FC<params> = ({ serviceId }) => {
  const { currentStepIndex, steps, getStepClass } = useStepper();

  // Get the current step component
  
  const CurrentStepComponent = steps[currentStepIndex].component;

  return (
    <div>
      <nav aria-label="Progress" className="aegov-step pb-9 mb-10">
        <ol role="list" className="flex items-center justify-between">
          {steps.map((step, index) => (
            <li key={index} className={classNames("relative", getStepClass(index), { "w-full": index != steps.length - 1 })}>
              <div
                className="step-connector"
                aria-hidden="true"
                style={{ display: index === steps.length - 1 ? 'none' : 'flex' }}
              >
                <div className="step-connector-state"></div>
              </div>
              <a href="#" className="step-badge">
                {getStepClass(index)!='step-completed' && <span>{index + 1}</span>}
                <span className="step-text-below">{step.title}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="w-full flex flex-col sm:flex-row flex-grow overflow-hidden">
        <div className="w-full h-full flex-grow overflow-auto border p-10 rounded-lg mb-10">
          <CurrentStepComponent serviceId={serviceId} />
        </div>
        <div className="sm:w-1/3 md:1/4 w-full flex-shrink flex-grow-0">
          <Helper />
        </div>
      </div>

    </div>
  );
};

export default Stepper;
