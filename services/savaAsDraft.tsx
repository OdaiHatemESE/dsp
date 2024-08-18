
import { AttachmentList } from "@/config/service.model";
import fetchWithAuth from "./fetchWithAuth";
export const savaAsDraft = async (serviceState: any, attachments: AttachmentList[]) => {
    const data = serviceState?.form;
    //  console.clear();
    // console.log(data);
    const form = new FormData();
    const serviceId = serviceState?.serviceId;
    let count = data.numberOfCopies;

    Object.keys(data).forEach((key) => {

        if (key == 'numberOfCopies') {
            form.append(key, count.toString());
        } else {
            form.append(key, data[key]?.toString() || '');
        }
    });

    if(attachments.length>0){
        attachments.forEach((attachment) => {
            attachment.attachmentFile?.forEach((file)=>{
                form.append('other', file);
            })
        })
    }


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
        // console.log('Data posted successfully:', result);
        return result;

    } catch (error) {
        console.error('Error saving draft:', error);
    }
};