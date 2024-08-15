export interface Application {
    requestId: string;
    requestNo: string;
    id: string;
    statusId: string;
    statusEnglish: string;
    statusArabic: string;
    serviceName: string;
    serviceNameArabic: string;
    fullNameEn: string;
    fullNameAr: string;
    serviceUrl: string;
    translatedStatus?: string;
    translatedServiceName?: string;
    applicationDefinitionId: number;
    creationDate: string;
    creationDateTime: Date | null;
    allowEdit: boolean;
    allowDelete: boolean;
    applicationDefinition: {
      id: number;
      name: string;
      nameAr: string;
      serviceUrl: string;
    };
  }
  
  export interface ApiResponse {
    totalNumber: number;
    data: Application[];
  }
  