import { AttachmentList, Service, StudyDetailsForm } from "./service.model";

const Issuance_and_attestation__applicationDefinitionId = 1;
const change_student_details__applicationDefinitionId = 3;

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
            status: 'step-current'
         },
         {
            index: 1,
            title: 'study-details',
            status: 'step-upcoming'
         },
         {
            index: 2,
            title: 'attachments',
            status: 'step-upcoming'
         },
         {
            index: 3,
            title: 'summary',
            status: 'step-upcoming'
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
   {
      id: '399-03-001-000',
      serviceId: 'change-student-details',
      applicationDefinitionId: change_student_details__applicationDefinitionId,
      serviceName: 'Request To Modify Data Of A Previous Student',
      serviceNameArabic: 'طلب تعديل بيانات طالب سابق',
      urlAliasName: 'change-student-details',
      currentStepIndex: 0,
      steps: [
         {
            index: 0,
            title: 'applicant-information',
            status: 'step-current'
         },
         {
            index: 1,
            title: 'Info To Update',
            status: 'step-upcoming'
         },
         {
            index: 2,
            title: 'Attachments',
            status: 'step-upcoming'
         },
         {
            index: 3,
            title: 'Shipping Information',
            status: 'step-upcoming'
         },
         {
            index: 4,
            title: 'summary',
            status: 'step-upcoming'
         }
      ],
      form: {} as StudyDetailsForm,
      attachments: [
         {
            attachmentId: 'passport',
            attachmentType: 'pdf',
            attachmentLabel: 'Passport',
            attachmentFile: {} as ArrayBuffer,
            attachmentNote: 'Not Exceed 20 MB',
            required: true
         },
         {
            attachmentId: 'courtCertificate',
            attachmentType: 'pdf',
            attachmentLabel: 'Court Certificate/Consulate Letter',
            attachmentFile: {} as ArrayBuffer,
            attachmentNote: 'Not Exceed 20 MB',
            required: true
         },

         {
            attachmentId: 'schoolCertificate',
            attachmentType: 'pdf',
            attachmentLabel: 'School Certificate',
            attachmentFile: {} as ArrayBuffer,
            attachmentNote: 'Not Exceed 20 MB',
            required: true
         },
         {
            attachmentId: 'other',
            attachmentType: 'pdf',
            attachmentLabel: 'Other',
            attachmentFile: {} as ArrayBuffer,
            attachmentNote: 'Not Exceed 20 MB',
            required: false
         }



      ]
   },
];
