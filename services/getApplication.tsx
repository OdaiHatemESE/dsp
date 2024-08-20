import useSWR from "swr";
import fetchWithAuth from "./fetchWithAuth";
import { StudyDetails } from "@/config/service.model";
import { ServiceConfig } from "@/config/services-config";


export const getApplication = async (requestId: string, serviceId: string): Promise<StudyDetails> => {

    const service = ServiceConfig.find(service => service.serviceId === serviceId);
    const entPointUrl = service?.endPoints?.getApplication;
    const apiUrl = entPointUrl + requestId;



    const response = await fetchWithAuth(apiUrl);
    const res: StudyDetails = await response.json();

    return res;
}



