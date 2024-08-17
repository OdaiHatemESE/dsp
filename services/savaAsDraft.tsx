import { useAppSelector } from "@/store/lib/hooks";
import fetchWithAuth from "./fetchWithAuth";




export const savaAsDraft = async (serviceState:any) => {

 
    const data = serviceState?.form;
    const form = new FormData();
    const serviceId=serviceState?.serviceId;

    
    let count = data.numberOfCopies;
    console.clear();
    Object.keys(data).forEach((key) => {
        if (key == 'numberOfCopies') {
            form.append(key, count.toString());
        } else {
            form.append(key, data[key]?.toString() || '');
        }
    });
 
    try {
        const response = await fetchWithAuth('certificates/v1/SaveAsDraft', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: form,
        });

        if (!response.ok) {
            throw new Error('Failed to post data');
        }

        const result = await response.json();
        console.log('Data posted successfully:', result);
    } catch (error) {
        console.error('Error saving draft:', error);
    }
};