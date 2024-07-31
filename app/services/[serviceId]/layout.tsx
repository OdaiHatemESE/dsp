'use client';
import Breadcrumbs from "@/components/breadcrumb";
import Helper from "@/components/helper";
import Steper from "@/components/steper";
import { ServiceForm } from "@/config/service.model";
import { ServiceConfig } from "@/config/services-config";
import setServiceState from "@/services/setServiceState";
import { useAppSelector } from "@/store/lib/hooks";
import { stat } from "fs";


export default function Layout({ children, params }: { children: React.ReactNode, params: { serviceId: string } }) {

    const { serviceId } = params;
    const serviceState = useAppSelector((state) => state.service.service)
    const whoApply = serviceState?.requestForId ?? 1; // Replace this with the actual value needed

    setServiceState({ serviceId, whoApply });


    return (
        <main role="main" className="container">
            <Breadcrumbs serviceId={serviceId} />
            <div className="w-full pt-1 px-2">
                <Steper serviceId={serviceId} />
                <div className="w-full flex flex-col sm:flex-row flex-grow overflow-hidden">
                    <div className="w-full h-full flex-grow overflow-auto border p-10 rounded-lg mb-10">
                        {children}
                    </div>
                    <div className="sm:w-1/3 md:1/4 w-full flex-shrink flex-grow-0">
                        <Helper />
                    </div>
                </div>
            </div>
        </main>
    );
}
