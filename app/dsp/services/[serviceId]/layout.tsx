'use client';
import Breadcrumbs from "@/components/breadcrumb";
import Helper from "@/components/helper";
import Spinner from "@/components/spinner";
import Steper from "@/components/steper/steper";
import { StepperProvider } from "@/components/steper/stepperProvider";
import { ServiceForm } from "@/config/service.model";
import { ServiceConfig } from "@/config/services-config";
import useSetServiceState from "@/services/setServiceState";
import setServiceState from "@/services/setServiceState";
import { useAppSelector } from "@/store/lib/hooks";
import { useEffect } from "react";



export default function Layout({ children, params }: { children: React.ReactNode, params: { serviceId: string } }) {

    const { serviceId } = params;
    const serviceState = useAppSelector((state) => state.service.service)
    const whoApply = serviceState?.requestForId ?? 1; // Replace this with the actual value needed
    const service = ServiceConfig.find((service) => service.serviceId === serviceId);
    let steps = service?.steps;



    setServiceState({ serviceId, whoApply });


    return (

        <main role="main" className="container">

            <Breadcrumbs serviceId={serviceId} type="services" />
            <h3 className="mb-10">{service?.serviceName}</h3>
            <div className="w-full pt-1 px-2">
                <StepperProvider initialSteps={steps} serviceId={serviceId}>
                    <Steper serviceId={serviceId} />
                </StepperProvider>
            </div>
        </main>
    );
}
