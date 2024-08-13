import useSWR from "swr";
import fetchWithAuth from "./fetchWithAuth"
import { StudenInfoFromManhal } from "@/config/service.model";

 


export const getStudentData= async():Promise<StudenInfoFromManhal>=>{
    const response = await fetchWithAuth('certificates/v1/GetGradScholData?eid=784201625741588');
    
    const res : StudenInfoFromManhal = await response.json();
    
    return res;
}


export const getStudentInfo = () => {
    const { data, error } = useSWR('studentInfo', getStudentData);
    return {
        studentInfo: data?.response,
        isLoadingInfo: !error && !data,
        isErrorInfo: error,
    };
  };

