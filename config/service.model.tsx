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