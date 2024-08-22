'use client';
import attachmentsDefinition, { ServiceConfig } from "@/config/services-config";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler, Controller, Form } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks";
import { AttachmentList } from "@/config/service.model";
import { arrayBuffer } from "stream/consumers";
import { setService } from "@/store/slices/serviceSlice";
import { useStepper } from "./steper/stepperProvider";
import { savaAsDraft } from "@/services/savaAsDraft";

interface Params {
    serviceId: string;
}

interface Attachment {
    attachmentId: string;
    attachmentLabel: string;
    required: boolean;
}

interface FormValues {
    [key: string]: File[] | undefined;
}

const Attachments: React.FC<Params> = ({ serviceId }) => {
    const { nextStep, prevStep } = useStepper();
    const goPrevious = () => {
        prevStep();
    }

    const service = ServiceConfig.find(service => service.serviceId === serviceId);

    let serviceState = useAppSelector((state) => state.service.service);
    console.clear();
    console.log(serviceState);

    let attchmentList = serviceState?.attachment ?? []; /// Show Purpose only when have data.


    let attachments = service?.attachments ?? [];
    if (serviceId == 'update-student-info') {
        const changeBirthOfDate = serviceState?.form.changeBirthOfDate;
        const changePlaceOfBirth = serviceState?.form.changePlaceOfBirth;
        const changeNationality = serviceState?.form.changeNationality;
        const changeName = serviceState?.form.changeName;

        let changeNameAttachments = [attachmentsDefinition.Passport.id, attachmentsDefinition.CourtCertificate.id,
        attachmentsDefinition.SchoolCertificate.id, attachmentsDefinition.Other.id]

        let changePlaceOfBirthAttachment = [attachmentsDefinition.Passport.id, attachmentsDefinition.NewPassport.id,
        attachmentsDefinition.BirthCertificate.id, attachmentsDefinition.SchoolCertificate, attachmentsDefinition.Other.id]

        let changeBirthOfDateAttachment = [attachmentsDefinition.Passport.id,
        attachmentsDefinition.SchoolCertificate.id, attachmentsDefinition.Other.id]

        let changeNationalitAttachment = [attachmentsDefinition.Passport.id, attachmentsDefinition.CourtCertificate.id,
            attachmentsDefinition.SchoolCertificate.id, attachmentsDefinition.Other.id]
    

        if (changeName == "true") {
            attachments = attachments.filter((elem) => {
                return changeNameAttachments.indexOf(elem.attachmentId ?? '') > -1;
            });
        }
        console.log('attachments', attachments)
    }




    const dispatch = useAppDispatch();

    const fileValidationSchema = (required: boolean) =>
        Yup.mixed()
            .test("fileSize", "Each file size must be less than 5MB", (value: File[]) => {
                return value ? value.every(file => file.size <= 5 * 1024 * 1024) : true;
            })
            .test("fileType", "Unsupported file format, only PDFs are allowed", (value: File[]) => {
                return value ? value.every(file => file.type === "application/pdf") : true;
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
        resolver: yupResolver(validationSchema),

    });



    const onSubmit: SubmitHandler<FormValues> = async data => {

        let form = new FormData();
        const attachmentList: AttachmentList[] = [];
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const value = data[key];
                attachmentList.push({
                    attachmentId: key,
                    attachmentFile: value
                });
            };


        }
        savaAsDraft(serviceState, attachmentList)

        nextStep();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>{ }
            <input type="text" value={serviceState?.form.applicationId} />
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
                                        onChange={(e) => field.onChange(e.target.files ? Array.from(e.target.files) : undefined)}
                                        className={errors[attachment.attachmentId] ? 'error' : ''}
                                        multiple={attachment.multiFiles}
                                    />
                                )}
                            />

                        </div>
                        {serviceState?.attachment &&
                            <div>

                                {serviceState?.attachment.map((file) => {
                                    return <div key={file.id} className="flex items-center mb-4">
                                        <div className="w-1/2 font-bold text-gray-700">{file.id}
                                            <a href={file.attachmentUrl}>{file.attachmentName}</a></div>
                                    </div>

                                })}
                            </div>
                        }
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
    );
}

export default Attachments;
