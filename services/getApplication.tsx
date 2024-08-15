import useSWR from "swr";
import fetchWithAuth from "./fetchWithAuth";
import { StudyDetails } from "@/config/service.model";


export const getIssuanceApplication = async (requestId: string): Promise<StudyDetails> => {
    const response = await fetchWithAuth('certificates/v1/GetCertificateByApplicationId/' + requestId);
    const res: StudyDetails = await response.json();

    return res;
}


 
