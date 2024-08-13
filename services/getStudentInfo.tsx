import useSWR from "swr";
import fetchWithAuth from "./fetchWithAuth"
import { StudenInfoFromManhal } from "@/config/service.model";




export const getStudentData = async (emirateId:string): Promise<StudenInfoFromManhal> => {
    const response = await fetchWithAuth('certificates/v1/GetGradScholData?eid=' + emirateId);

    const res: StudenInfoFromManhal = await response.json();

    return res;
}


export const getStudentInfo = (emirateId: string) => {
    const { data, error } =  useSWR(['studentInfo', emirateId], () => getStudentData(emirateId));
    return {
        studentInfo: data?.response,
        isLoadingInfo: !error && !data,
        isErrorInfo: error,
    };
};

