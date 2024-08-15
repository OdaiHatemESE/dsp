

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
  summary?: React.FC


}

export interface AttachmentList {
  attachmentId: string;
  attachmentLabel: string;
  required: boolean,
  attachmentType: string;
  attachmentNote: string,
  attachmentFile?: ArrayBuffer;

}

export interface ServiceStep {
  index: number;
  title: string;
  status: string;
  component: any
}


export interface ServiceForm {
  id?: string;
  requestForId?: number,
  serviceId?: string;
  serviceName?: string;
  serviceNameArabic?: string;
  currentStepIndex?: number;
  applicantInformation?: UserProfile;
  form?: any;
  attachment?: AttachmentList[];
  applicationId?:any;
}


// studyDetails // issuance-and-attestation






export interface StudyDetails {
  requestTypeId: number;
  numberOfCopies: number;
  emirateId: number;
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
  emirateId?: string; // integer($int32)
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

}




export interface UpdateStudentForm {
  RequestForId: number;
  isOriginalCertificate: boolean;
  Comment: string;
  OldNationalityId: number;
  NewNationalityId: number;
  OldNationalityAr: string;
  OldNationalityEn: string;
  changeName: boolean;
  changeBirthOfDate: boolean;
  changePlaceOfBirth: boolean;
  changeNationality: boolean;
  haveEmiratesId: boolean;
  NameAr: string;
  NameEn: string;
  PlaceOfBirthAr: string;
  PlaceOfBirthEn: string;
  BirthOfDate: string; // Using string to represent the date
  EmiratesIDNumber: string; // Assuming this might be a number or alphanumeric
  ApplicantId: number;
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