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
    
    
  }

  export interface ServiceStep {
    index: number;
    title: string;
  }
  

  export interface ServiceForm{
    id: string;
    requestForId:number,
    serviceId:string,
    applicationDefinitionId: number;
    serviceName: string;
    serviceNameArabic: string;
    currentStepIndex: number;
    applicantInformation:UserProfile,
    form:[],
    attachment:[] 
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