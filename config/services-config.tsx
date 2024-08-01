import { AttachmentList, Service, StudyDetailsForm } from "./service.model";

const Issuance_and_attestation__applicationDefinitionId = 1;

export const ServiceConfig: Service[] = [
   {
      id: '399-03-001-000',
      serviceId: 'issuance-and-attestation',
      applicationDefinitionId: Issuance_and_attestation__applicationDefinitionId,
      serviceName: 'Issuance and attestation of school certificate',
      serviceNameArabic: 'طلب تصديق شهادة دراسية - تعليم عام',
      urlAliasName: 'issuance-and-attestation',
      currentStepIndex: 0,
      steps: [
         {
            index: 0,
            title: 'applicant-information',
            status:'step-current'
         },
         {
            index: 1,
            title: 'study-details',
            status:'step-upcoming'
         },
         {
            index: 2,
            title: 'attachments',
             status:'step-upcoming'
         },
         {
            index: 3,
            title: 'summary',
             status:'step-upcoming'
         }
      ],
      form: {} as StudyDetailsForm,
      attachments: [
         {
         attachmentId: '2022',
         attachmentType: 'pdf',
         attachmentLabel: 'other',
         attachmentFile: {} as ArrayBuffer,
         attachmentNote: 'Not Exceed 20 MB',
         required: true
      },
      {
         attachmentId: '2021',
         attachmentType: 'pdf',
         attachmentLabel: 'other',
         attachmentFile: {} as ArrayBuffer,
         attachmentNote: 'Not Exceed 20 MB',
         required: false
      } 
   ]
   },
];
