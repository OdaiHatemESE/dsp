import { ServiceConfig } from "@/config/services-config";
import Link from 'next/link'
export default function Page() {
    const servicesList = ServiceConfig;

    return (
        <div className="container mx-auto">
        <div className="flex flex-wrap -mx-4">
                {servicesList.map((service) => {
                    return (
                        <div className="w-full md:w-1/3 px-4 mb-6">
                            <div className="aegov-card card-bordered card-glow card-service">
                                <h5 className="card-service-title line-clamp-2">
                                    <a href="#">{service.serviceName}</a>
                                </h5>
                                <Link href={'/services/' + service.serviceId} className="aegov-link">
                                    Start service
                                    <svg className="link-icon rtl:-scale-x-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="40" y1="128" x2="216" y2="128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><polyline points="144 56 216 128 144 200" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></polyline></svg>
                                </Link>

                                
                            </div>
                        </div>

                    );
                })}


            </div>
        </div>

    );
}