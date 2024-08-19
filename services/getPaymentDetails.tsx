
import useSWR from "swr";
import fetchWithAuth from "./fetchWithAuth"
import { PaymentResponseAPI, ServicePayment } from "@/config/service.model";




export const getPaymentDetails = async (serviceState: any): Promise<ServicePayment> => {
    const response = await fetchWithAuth(`certificates/v1/Payment/GetServiceDetails/${serviceState?.id}/${serviceState?.applicationId}`);

    const res: ServicePayment = await response.json();

    return res;
}


export const useGetpaymentDetails = (serviceState: any) => {
    const { data, error } = useSWR(['paymentInfo', serviceState], () => getPaymentDetails(serviceState));
    return {
        paymentInfo: data as ServicePayment,
        isLoadingInfo: !error && !data,
        isErrorInfo: error,
    };
};


export const getPaymentUrl = async (applicationId: any): Promise<PaymentResponseAPI> => {

    const response = await fetchWithAuth(`certificates/v1/Payment/CreatePayment/${applicationId}`)
    const res: PaymentResponseAPI = await response.json();
    return res;

}

