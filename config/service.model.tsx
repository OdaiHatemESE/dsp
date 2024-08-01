 
import { UserProfile } from "./user.modal";

export interface Service {
    id: string;
    serviceId:string,
    applicationDefinitionId: number;
    urlAliasName: string;
    serviceName: string;
    serviceNameArabic: string;
    currentStepIndex: number;
    steps:ServiceStep[];
    form:{},
    attachments: AttachmentList[]
    
    
  }

  export interface AttachmentList {
    attachmentId: string;
    attachmentLabel: string;
    required:boolean,
    attachmentType: string;
    attachmentNote:string,
    attachmentFile?: ArrayBuffer;

  }

  export interface ServiceStep {
    index: number;
    title: string;
    status:string;
  }
  

  export interface ServiceForm{
    id?: string; 
    requestForId?:number,
    serviceId?: string;
    serviceName?: string;
    serviceNameArabic?: string;
    currentStepIndex?: number;
    steps?:ServiceStep[];
    applicantInformation?: UserProfile;
    form?: any;
    attachment?:AttachmentList[];
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

  streetNumber:string;
  houseNumber:string;
  emirate:string;
}


export interface StudyDetailsForm{
  plan: string,
  Emirate: string,
  academicYear: string,
  schoolGrade:string
  schoolName: string,
  studentNumber: string,
  comments: string,
  MOFAIC: string
}

 