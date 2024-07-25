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
  