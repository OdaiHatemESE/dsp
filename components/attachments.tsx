'use client';
import { ServiceConfig } from "@/config/services-config";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks";
import { AttachmentList } from "@/config/service.model";
import { arrayBuffer } from "stream/consumers";
import { setService } from "@/store/slices/serviceSlice";
import { useStepper } from "./steper/stepperProvider";

interface Params {
    serviceId: string;
}

interface Attachment {
    attachmentId: string;
    attachmentLabel: string;
    required: boolean;
}

interface FormValues {
    [key: string]: File | undefined;
}



const Attachments: React.FC<Params> = ({ serviceId }) => {


    const { nextStep, prevStep } = useStepper();
    const goPrevious = () => {
        prevStep();
    }


    const service = ServiceConfig.find(service => service.serviceId === serviceId);


    let serviceState = useAppSelector((state) => state.service.service);
    const attachments = service?.attachments ?? serviceState?.attachment ?? [];
    const dispatch = useAppDispatch();

    const fileValidationSchema = (required: boolean) =>
        Yup.mixed()
            .test("fileSize", "File size is too large, must be less than 5MB", value => {
                return value ? value.size <= 5 * 1024 * 1024 : true;
            })
            .test("fileType", "Unsupported file format, only PDF is allowed", value => {
                return value ? value.type === "application/pdf" : true;
            })
            .nullable()
            .required(required ? "This field is required" : undefined);

    const validationSchema = Yup.object().shape(
        attachments.reduce((schema, attachment) => {
            schema[attachment.attachmentId] = attachment.required ? fileValidationSchema(attachment.required) : Yup.mixed()
            return schema;
        }, {} as any)
    );

    const { register, handleSubmit, control, formState: { errors } } = useForm<FormValues>({
        resolver: yupResolver(validationSchema)

    });



    const convertTobinary = (key: string, data: any): Promise<ArrayBuffer | undefined> => {
        return new Promise((resolve, reject) => {
            if (data[key]) {
                const file = data[key];
                const reader = new FileReader();
                reader.onload = () => {
                    const result = reader.result as ArrayBuffer;
                    
                    resolve(result);
                };
                reader.onerror = () => {
                    reject(undefined);
                };
                reader.readAsArrayBuffer(file);
            } else {
                resolve(undefined);
            }
        });
    };

    const onSubmit: SubmitHandler<FormValues> = async data => {
        const updatedAttachments = await Promise.all(
            attachments.map(async (attachment) => {
                const attachmentFile = await convertTobinary(attachment.attachmentId, data);
                return {
                    ...attachment,
                    attachmentFile,
                };
            })
        );

        serviceState = { ...serviceState, attachment: updatedAttachments };
        dispatch(setService(serviceState));
       
        nextStep();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {attachments.map((attachment) => (
                <div id={attachment.attachmentId} key={attachment.attachmentId}>
                    <div className="aegov-form-control mb-10">
                        <label htmlFor={attachment.attachmentId}>{attachment.attachmentLabel}
                            {!attachment.required && <span>(optional)</span>}
                        </label>
                        <div className="form-control-input">
                            <Controller
                                name={attachment.attachmentId}
                                control={control}
                                render={({ field }) => (
                                    <input
                                        id={attachment.attachmentId}
                                        type="file"
                                        onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : undefined)}
                                        className={errors[attachment.attachmentId] ? 'error' : ''}
                                    />
                                )}
                            />

                        </div>
                        {errors[attachment.attachmentId] && <p><span className="error-message">{errors[attachment.attachmentId]?.message}</span></p>}
                    </div>
                </div>
            ))}
            <div className="w-full actions mt-10 flex flex-row justify-between flex-wrap">
                <button className="aegov-btn btn-lg" type="button" onClick={goPrevious}>

                    <svg
                        className="rtl:-scale-x-100 rotate-180"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 256"
                    >
                        <rect width="256" height="256" fill="none" />
                        <line
                            x1="40"
                            y1="128"
                            x2="216"
                            y2="128"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="16"
                        />
                        <polyline
                            points="144 56 216 128 144 200"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="16"
                        />
                    </svg>

                    Previous
                </button>
                <button className="aegov-btn btn-lg" type="submit">
                    Next
                    <svg
                        className="rtl:-scale-x-100"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 256"
                    >
                        <rect width="256" height="256" fill="none" />
                        <line
                            x1="40"
                            y1="128"
                            x2="216"
                            y2="128"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="16"
                        />
                        <polyline
                            points="144 56 216 128 144 200"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="16"
                        />
                    </svg>
                </button>

            </div>
        </form>
    )
}

export default Attachments;
