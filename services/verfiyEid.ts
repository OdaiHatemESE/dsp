
import { ApiResponse, UserProfile } from "@/config/user.modal";
import fetchWithAuth from "./fetchWithAuth";

export const getMobileNumber = async (eid: string): Promise<ApiResponse> => {
    try {
        const response = await fetchWithAuth('certificates/v1/GetIcaMaskedMobile/' + eid + '/false');
        const res: ApiResponse = await response.json();
        console.log(res);

        return res;
    } catch (error) {

        throw new Error('Failed to fetch data');
    }
};


export const verfiyMobile = async (eid: string, mobilenumber: string): Promise<UserProfile> => {
    try {
        const response = await fetchWithAuth('certificates/v1/ValidateIcaMobile/' + eid + '/' + mobilenumber);
        const res: UserProfile = await response.json();
        console.log(res);
        return res;
    } catch (error) {

        throw new Error('Failed to fetch data');
    }
};


// https://apigateway-stg.ese.gov.ae/certificates/v1/GetIcaMaskedMobile/784201558292955/false
//https://apigateway-stg.ese.gov.ae/certificates/v1/ValidateIcaMobile/784201558292955/0005
// https://apigateway-stg.ese.gov.ae/certificates/v1/GetProfile/784201558292955
//https://apigateway-stg.ese.gov.ae/certificates/v1/OtpProfileActivation?lang=ar

