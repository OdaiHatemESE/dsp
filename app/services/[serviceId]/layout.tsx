import Breadcrumbs from "@/components/breadcrumb";
import Helper from "@/components/helper";
import Steper from "@/components/steper";
import { ServiceConfig } from "@/config/services-config";




export default function Layout({ children, params }: { children: React.ReactNode, params: { serviceId: string } }) {
    return (


        <main role="main" className="container">
            <Breadcrumbs serviceId={params.serviceId} />
            <div className="w-full pt-1 px-2">
                <Steper serviceId={params.serviceId}  />
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