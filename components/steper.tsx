

import { Service } from "@/config/service.model";
import { ServiceConfig } from "@/config/services-config";
import classNames from 'classnames';
interface SteperProps {
    serviceId: string;
}

const Steper: React.FC<SteperProps> = ({ serviceId }) => {

    const service = ServiceConfig.find(service => service.serviceId === serviceId);
    // step-current // step-completed // step-upcoming
    return (
        <nav aria-label="Progress" className="aegov-step pb-9 mb-10">
            <ol role="list" className="flex items-center justify-between">
                {service?.steps.map((step, index) => (
                    <li key={index} className={classNames({ 'relative w-full step-current': index == 0 }, { 'relative w-full step-upcoming': index != service?.steps.length - 1 }, { 'relative step-upcoming': index == service?.steps.length - 1 })}>
                        <div className="step-connector" aria-hidden="true" x-description="Completed Step" style={{ display: index == service?.steps.length - 1 ? 'none' : 'flex' }}>
                            <div className="step-connector-state"></div>
                        </div>
                        <a href="#" className="step-badge">
                            {index + 1}
                            <span className="step-text-below">{step.title}</span>
                        </a>
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Steper;