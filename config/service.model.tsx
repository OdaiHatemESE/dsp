

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
  summary?:React.FC


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
  ApplicationId?: number; // integer($int64)
  ApplicantId?: number; // integer($int32)
  RequestForId?: number; // integer($int32)
  RelationshipId?: string; // integer($int32) - optional if not always present
  EmirateId?: string; // integer($int32)
  EmirateSchoolId?: string; // integer($int32)
  RegionId?: number; // integer($int32)
  RequestTypeId?: number; // integer($int32)
  NumberOfCopies?: number; // integer($int32)
  GradeId?: string; // integer($int32)
  AcademicYearId?: number; // integer($int32)
  SourceChannel?: number; // integer($int32) - optional if not always present
  EmiratesIDNumber?: string;
  StreetNumber?: string;
  HouseNumber?: string;
  SchoolName?: string;
  Comment?: string;
  SISNumber?: string;
  IsLastStep?: boolean; // optional if not always present
  IsMofaicAttested?: boolean; // optional if not always present
  DestinationCountryId?: number; // integer($int32) - optional if not always present
  PayButton?: boolean;
  consent?: boolean; // optional new field
  sisstudentcontrol?: object; // optional new field, replace with the correct type if known
  haveEmiratesId?: boolean; // optional new field
  PreviousAttachments?: any; // optional new field, replace with the correct type if known
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