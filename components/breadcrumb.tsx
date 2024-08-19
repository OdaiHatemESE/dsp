import { ServiceConfig } from "@/config/services-config";

interface BreadcrumbsProps {
    serviceId: string;
    type: string
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ serviceId, type }) => {
    const service = ServiceConfig.find((service) => service.serviceId === serviceId);
    return (
        <div className="mt-5 mb-5">
            {type === 'services' ? (
                <nav aria-label="Breadcrumb" className="aegov-breadcrumb with-seperator">
                    <ol>
                        <li><a href="#">Home</a></li>
                        <li><a href="#" title="Services">Services</a></li>
                        <li><span aria-current="page">{service?.serviceName}</span></li>
                    </ol>
                </nav>
            ) : type === 'general' ? (
                <nav aria-label="Breadcrumb" className="aegov-breadcrumb with-seperator">
                    <ol>
                        <li><a href="#">Home</a></li>
                        <li><span aria-current="page">A really long page name that must be affected.</span></li>
                    </ol>
                </nav>
            ) : (
                <div>Custom</div>
            )}


        </div>
    );
};

export default Breadcrumbs;