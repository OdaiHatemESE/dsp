
import { AttachmentList } from "@/config/service.model";
import fetchWithAuth from "./fetchWithAuth";
import { ServiceConfig } from "@/config/services-config";
export const savaAsDraft = async (serviceState: any, attachments: AttachmentList[]) => {
    const data = serviceState?.form;
  
    const form = new FormData();
    const serviceId = serviceState?.serviceId;
    const service = ServiceConfig.find((service) => service.serviceId == serviceId);

    let count = data.numberOfCopies;

    Object.keys(data).forEach((key) => {
        if (key == 'numberOfCopies') {
            form.append(key, count.toString());
        } else {
            form.append(key, data[key]?.toString() || '');
        }
    });

    if (attachments.length > 0) {
        attachments.forEach((attachment) => {
            attachment.attachmentFile?.forEach((file) => {
                form.append('other', file);
            })
        })
    }


    try {
        const response = await fetchWithAuth(service?.endPoints?.saveAsDraft, {
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
        return result;

    } catch (error) {
        console.error('Error saving draft:', error);
    }
};