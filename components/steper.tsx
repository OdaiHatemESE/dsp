

import { Service } from "@/config/service.model";
import { ServiceConfig } from "@/config/services-config";
import { useAppSelector } from "@/store/lib/hooks";
import classNames from 'classnames';
import { useEffect } from "react";
interface SteperProps {
    serviceId: string;
}

const Steper: React.FC<SteperProps> = ({ serviceId }) => {

    const service = ServiceConfig.find(service => service.serviceId === serviceId);
    const serviceState = useAppSelector((state)=>state.service.service)
    let steps = serviceState?.steps;
  
    // step-current // step-completed // step-upcoming
    return (
        <nav aria-label="Progress" className="aegov-step pb-9 mb-10">
            <ol role="list" className="flex items-center justify-between">
                {steps?.map((step, index) => (
                    
                    <li key={index} className={classNames('relative', step.status, { 'w-full': index !=steps.length - 1 })}>    
                        <div className="step-connector" aria-hidden="true" x-description="Step" style={{ display: index == steps.length - 1 ? 'none' : 'flex' }}>
                            <div className="step-connector-state"></div>
                        
                        </div>
                        <a href="#" className="step-badge">
                          {step.status!='step-completed'  && <span>{index + 1}</span> }
                            <span className="step-text-below">{step.title}</span>
                        </a>
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Steper;