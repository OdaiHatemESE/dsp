

import React from "react";
import { UserProfile } from "./user.modal";

export interface Service {
  id: string;
  serviceId: string,
  applicationDefinitionId: number;
  urlAliasName: string;
  serviceName: string;
  serviceNameArabic: string;
  currentStepIndex: number;
  steps: ServiceStep[];
  form: {},
  attachments: AttachmentList[],
  summary?: React.FC,
  endPoints?:{
    saveAsDraft:any,
    getApplication:any
  }


}

export interface AttachmentList {
  attachmentId?: string;
  attachmentLabel?: string;
  required?: boolean,
  attachmentType?: string;
  attachmentNote?: string,
  attachmentFile?: any[];

}

export interface ServiceStep {
  index: number;
  title: string;
  status: string;
  component: any
}


export interface ServiceForm {
  id?: number;
  requestForId?: number,
  serviceId?: string;
  serviceName?: string;
  serviceNameArabic?: string;
  currentStepIndex?: number;
  applicantInformation?: UserProfile;
  form?: any;
  attachment?: any;
  applicationId?:any;
}


// studyDetails // issuance-and-attestation






export interface StudyDetails {
  requestTypeId: number;
  numberOfCopies: number;
  emirateSchoolId: string;
  comment: string;
  schoolId: number;
  schoolName: string;
  gradeId: number;
  academicYearId: number;
  sisNumber: string;
  emiratesIDNumber: string;
  agentComment: string;
  agentCommentAr: string;
  certificateUrl: string;
  certificateDownloadName: string;
  isMofaicAttested: boolean;
  destinationCountryId: number;
  destinationCountryNameAr: string;
  destinationCountryName: string;
  shippingAddress: Address;
  application: any;
  applicant: UserProfile;
  applicationHistory: any;
  paymentDetails: any


}




export interface Address {
  id: number;
  emirateId: any;
  emirateEntity: any;
  regionId: any;
  region: any;
  city: any;
  cityAr: any;
  area: any;
  street: any;
  building: any;
  poBox: any;
  mobileNumber: string;
  additionalMobileNumber: any;
  homePhone: any;
  workPhone: any;
  fax: any;
  email: string;
  isActive: boolean;

  streetNumber: string;
  houseNumber: string;
  emirate: string;
}


export interface StudyDetailsForm {
  applicationId?: number; // integer($int64)
  applicantId?: number; // integer($int32)
  requestForId?: number; // integer($int32)
  relationshipId?: string; // integer($int32) - optional if not always present
  emirateSchoolId?: string; // integer($int32)
  regionId?: number; // integer($int32)
  requestTypeId?: number; // integer($int32)
  numberOfCopies?: number; // integer($int32)
  gradeId?: string; // integer($int32)
  academicYearId?: number; // integer($int32)
  sourceChannel?: number; // integer($int32) - optional if not always present
  emiratesIdNumber?: string;
  streetNumber?: string;
  houseNumber?: string;
  schoolName?: string;
  comment?: string;
  sisNumber?: string;
  isLastStep?: boolean; // optional if not always present
  isMofaicAttested?: boolean; // optional if not always present
  destinationCountryId?: number; // integer($int32) - optional if not always present
  payButton?: boolean;
  consent?: boolean; // optional new field
  sisStudentControl?: object; // optional new field, replace with the correct type if known
  haveEmiratesId?: boolean; // optional new field
  previousAttachments?: any; // optional new field, replace with the correct type if known
  emirateId:string
}




export interface UpdateStudentForm {
  requestForId: number;
  isOriginalCertificate: boolean;
  comment: string;
  oldNationalityId: number;
  newNationalityId: number;
  oldNationalityAr: string;
  oldNationalityEn: string;
  changeName: boolean;
  changeBirthOfDate: boolean;
  changePlaceOfBirth: boolean;
  changeNationality: boolean;
  haveEmiratesId: boolean;
  nameAr: string;
  nameEn: string;
  placeOfBirthAr: string;
  placeOfBirthEn: string;
  birthOfDate: string; // Using string to represent the date
  emiratesIDNumber: string; // Assuming this might be a number or alphanumeric
  applicantId: number;
  applicationId:any
}

export interface StudenInfoFromManhal {
  response: {
    emirateId: string
    gradeId: string
    schoolCode: string
    schoolNameAr: string
    schoolNameEn: string
    studentNumber: string
  }
}

export interface ServicePayment {
  serviceId: string | null;
  serviceName: string | null;
  serviceNameArabic: string | null;
  servicePriceAmount: number;
  totalServiceAmount: number;
  totalVatAmount: number;
  quantity: number;
  isMultipleServices: boolean;
  serviceList?: ServicePayment[] | null;
}

export interface PaymentResponseAPI {
  status: string; // Indicates the status of the payment request (e.g., "1" might indicate success).
  tokenId: string; // A unique identifier for the payment token, possibly used to reference the payment.
  paymentUrl: string; // The URL to the payment page where the user can complete the payment process.
  customMessage: string; // A custom message related to the payment request, such as a confirmation message.
  errorText: string | null; // Contains any error text if an error occurred during the payment process, or null if no error.
  customerPulseToken: string | null; // A token possibly related to customer identification or tracking, or null if not applicable.
  serviceCatalogueDetails: any | null; // Details of the service catalogue, if available, or null if not provided.
}