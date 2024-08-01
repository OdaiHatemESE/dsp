import ApplicantInformation from "@/components/applicant-information/applicant-information";
import { AttachmentList, Service, StudyDetailsForm } from "./service.model";
import StudyDetails from "@/app/services/forms/issuance-and-attestation/study-details";
import Attachments from "@/components/attachments";
import Summary from "@/components/summary";

const Issuance_and_attestation__applicationDefinitionId = 1;
const change_student_details__applicationDefinitionId = 3;

interface params{
   serviceId:string
}

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
            status: 'step-current',
            component:ApplicantInformation
         },
         {
            index: 1,
            title: 'study-details',
            status: 'step-upcoming',
            component:StudyDetails
         },
         {
            index: 2,
            title: 'attachments',
            status: 'step-upcoming',
            component: Attachments
         },
         {
            index: 3,
            title: 'summary',
            status: 'step-upcoming',
            component: Summary
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
