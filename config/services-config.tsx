import ApplicantInformation from "@/components/applicant-information/applicant-information";
import { AttachmentList, Service, StudyDetailsForm, UpdateStudentForm } from "./service.model";
import StudyDetails from "@/app/services/forms/issuance-and-attestation/study-details";
import Attachments from "@/components/attachments";
import Summary from "@/components/summary";
import UpdateInfoForm from "@/app/services/forms/update-student-info/update-info-form";
import ShippingAddress from "@/components/shipping-address";
import issuanceSummary from "@/app/services/forms/issuance-and-attestation/issuance-summary";

 

export const ServiceConfig: Service[] = [
   {
      id: '399-03-001-000',
      serviceId: 'issuance-and-attestation',
      applicationDefinitionId: 1,
      serviceName: 'Issuance and attestation of school certificate',
      serviceNameArabic: 'طلب تصديق شهادة دراسية - تعليم عام',
      urlAliasName: 'issuance-and-attestation',
      currentStepIndex: 0,
      steps: [
         {
            index: 0,
            title: 'Applicant Information',
            status: 'step-current',
            component: ApplicantInformation
         },
         {
            index: 1,
            title: 'study-details',
            status: 'step-upcoming',
            component: StudyDetails
         },
         {
            index: 2,
            title: 'attachments',
            status: 'step-upcoming',
            component: Attachments
         },
         {
            index: 3,
            title: 'Shipping Address',
            status: 'step-upcoming',
            component: ShippingAddress
         },
         {
            index: 3,
            title: 'summary',
            status: 'step-upcoming',
            component: Summary
         }
      ],
      form: {} as StudyDetailsForm,
      summary:issuanceSummary,
      attachments: [
         {
            attachmentId: '2022',
            attachmentType: 'pdf',
            attachmentLabel: 'other',
            attachmentFile: {} as ArrayBuffer,
            attachmentNote: 'Not Exceed 20 MB',
            required: false
         },
         {
            attachmentId: '2021',
            attachmentType: 'pdf',
            attachmentLabel: 'other',
            attachmentFile: {} as ArrayBuffer,
            attachmentNote: 'Not Exceed 20 MB',
            required: false
         }
      ],
      endPoints:{
         'saveAsDraft':'certificates/v1/SaveAsDraft',
         'getApplication':'certificates/v1/GetCertificateByApplicationId/'
      }
   },
   {
      id: '399-03-001-000',
      serviceId: 'update-student-info',
      applicationDefinitionId: 3,
      serviceName: 'Request To Modify Data Of A Previous Student',
      serviceNameArabic: 'طلب تعديل بيانات طالب سابق',
      urlAliasName: 'update-student-info',
      currentStepIndex: 0,
      steps: [
         {
            index: 0,
            title: 'Applicant Information',
            status: 'step-current',
            component: ApplicantInformation
         },
         {
            index: 1,
            title: 'Info To Update',
            status: 'step-upcoming',
            component: UpdateInfoForm
         },
         {
            index: 2,
            title: 'Shipping Information',
            status: 'step-upcoming',
            component: ShippingAddress
         },
         {
            index: 3,
            title: 'attachments',
            status: 'step-upcoming',
            component: Attachments
         },
         {
            index: 4,
            title: 'summary',
            status: 'step-upcoming',
            component: Summary
         }
      ],
      form: {} as UpdateStudentForm,
      summary:issuanceSummary,
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
      ],
      endPoints:{
         saveAsDraft:'certificates/v1/CreateStudentDataModify',
         getApplication:'certificates/v1/GetModifiedStudentData?Id='
      }
   },

];
