import { Service, StudyDetailsForm } from "./service.model";

const Issuance_and_attestation__applicationDefinitionId = 1;

export const ServiceConfig: Service[] = [
    {
        id: '399-03-001-000',
        serviceId:'issuance-and-attestation',
        applicationDefinitionId: Issuance_and_attestation__applicationDefinitionId,
        serviceName: 'Issuance and attestation of school certificate',
        serviceNameArabic: 'طلب تصديق شهادة دراسية - تعليم عام',
        urlAliasName: 'issuance-and-attestation',
        currentStepIndex: 0,
        steps: [
            {
               index:0,
               title:'applicant-information'
            },
            {
                index:1,
                title:'study-details'
             },
             {
                index:2,
                title:'attachments'
             },
             {
                index:3,
                title:'summary'
             }
        ],
        form: {} as StudyDetailsForm
    },
];
