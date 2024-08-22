import ApplicantInformation from "@/components/applicant-information/applicant-information";
import { AttachmentList, Service, StudyDetailsForm, UpdateStudentForm } from "./service.model";
import StudyDetails from "@/app/services/forms/issuance-and-attestation/study-details";
import Attachments from "@/components/attachments";
import Summary from "@/components/summary";
import UpdateInfoForm from "@/app/services/forms/update-student-info/update-info-form";
import ShippingAddress from "@/components/shipping-address";
import issuanceSummary from "@/app/services/forms/issuance-and-attestation/issuance-summary";
const attachmentsDefinition = {
   "NOCDocument": {
     id: "1",
     label: "NOCDocument",
     label_ar: "NOC Document",
   },
   "Other": {
     id: "2",
     label: "Other",
     label_ar: "اخرى",
   },
   "AttestedEducation": {
     id: "3",
     label: "Attested Education",
     label_ar: "الشهادة المصدقة",
   },
   "PersonalPhoto": {
     id: "4",
     label: "Personal Photo",
     label_ar: "صورة شخصية",
   },
   "Residents": {
     id: "5",
     label: "Residents",
     label_ar: "الاقامة",
   },
   "FamilyBook": {
     id: "6",
     label: "Family Book",
     label_ar: "خلاصة القيد",
   },
   "Passport": {
     id: "7",
     label: "Passport",
     label_ar: "جواز السفر",
   },
   "CourtCertificate": {
     id: "8",
     label: "Court Certificate",
     label_ar: "إشهاد المحكمة/خطاب القنصلية",
   },
   "BirthCertificate": {
     id: "9",
     label: "Birth Certificate",
     label_ar: "شهادة الميلاد",
   },
   "SchoolCertificate": {
     id: "10",
     label: "School Certificate",
     label_ar: "الشهادة الدراسية",
   },
   "EmirateIdPicture": {
     id: "11",
     label: "Emirate Id Picture",
     label_ar: "صورة الهوية",
   },
   "AgentDocument": {
     id: "12",
     label: "AgentDocument",
     label_ar: "Agent Document",
   },
   "NewPassport": {
     id: "13",
     label: "NewPassport",
     label_ar: "جواز السفر الجديد",
   },
   "HoldsEmiratesNationality": {
     id: "14",
     label: "Holds Emirates Nationality",
     label_ar: "Holds Emirates Nationality",
   },
   "HealthStatusReport": {
     id: "15",
     label: "Health Status Report",
     label_ar: "Health Status Report",
   },
   "MotherFamilyBook": {
     id: "16",
     label: "Mother Family Book",
     label_ar: "خلاصة قيد الأم",
   },
   "HusbandRecordWife": {
     id: "17",
     label: "Husband Record Wife",
     label_ar: "husband record wife",
   },
 };
 
 export default attachmentsDefinition;


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
            title: 'summary',
            status: 'step-upcoming',
            component: Summary
         }
      ],
      form: {} as StudyDetailsForm,
      summary: issuanceSummary,
      attachments: [
         {
            attachmentId: attachmentsDefinition.Other.id,
            attachmentType: 'pdf',
            attachmentLabel: attachmentsDefinition.Other.label,
            attachmentFile: [],
            attachmentNote: 'Not Exceed 20 MB',
            required: false
         }
         
      ],
      endPoints: {
         'saveAsDraft': 'certificates/v1/SaveAsDraft',
         'getApplication': 'certificates/v1/GetCertificateByApplicationId/'
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
      form: {} as UpdateStudentForm,
      summary: issuanceSummary,
      attachments: [
         {
            attachmentId: attachmentsDefinition.Passport.id,
            attachmentType: 'pdf',
            attachmentLabel: attachmentsDefinition.Passport.label,
            attachmentFile: [],
            attachmentNote: 'Not Exceed 20 MB',
            multiFiles: false,
            required: true // Change Name
         },
         {
            attachmentId: attachmentsDefinition.NewPassport.id,
            attachmentType: 'pdf',
            attachmentLabel: attachmentsDefinition.NewPassport.label,
            attachmentFile: [],
            attachmentNote: 'Not Exceed 20 MB',
            multiFiles: false,
            required: true
         },
         {
            attachmentId: attachmentsDefinition.CourtCertificate.id,
            attachmentType: 'pdf',
            attachmentLabel:attachmentsDefinition.CourtCertificate.label,
            attachmentFile: [],
            attachmentNote: 'Not Exceed 20 MB',
            multiFiles: false,
            required: true // Change Name 
         },
         {
            attachmentId: attachmentsDefinition.BirthCertificate.id,
            attachmentType: 'pdf',
            attachmentLabel: attachmentsDefinition.BirthCertificate.label,
            attachmentFile: [],
            attachmentNote: 'Not Exceed 20 MB',
            multiFiles: false,
            required: true
         },
         {
            attachmentId: attachmentsDefinition.SchoolCertificate.id,
            attachmentType: 'pdf',
            attachmentLabel: attachmentsDefinition.SchoolCertificate.label,
            attachmentFile: [],
            attachmentNote: 'Not Exceed 20 MB',
            multiFiles: false,
            required: true // Change Name
         },
         {
            attachmentId: attachmentsDefinition.Other.id,
            attachmentType: 'pdf',
            attachmentLabel: attachmentsDefinition.Other.label,
            attachmentFile: [],
            attachmentNote: 'Not Exceed 20 MB',
            multiFiles: true,
            required: false
         }
      ],
      endPoints: {
         saveAsDraft: 'certificates/v1/CreateStudentDataModify',
         getApplication: 'certificates/v1/GetModifiedStudentData?Id='
      }
   },

];


 
