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
  

  interface Address {
    id: number;
    emirateEntity: EmirateEntity;
    emirateId: number;
    emirate: EmirateEntity | null;
    regionId: number;
    region: Region;
    city: string;
    cityAr: string;
    area: string | null;
    street: string | null;
    building: string | null;
    poBox: string | null;
    mobileNumber: string;
    additionalMobileNumber: string | null;
    homePhone: string | null;
    workPhone: string | null;
    fax: string | null;
    email: string;
    isActive: boolean;
}

interface EmirateEntity {
    id: number;
    titleAr: string;
    titleEn: string;
}

interface Region {
    id: number;
    titleAr: string;
    titleEn: string;
}

interface Nationality {
    id: number;
    titleAr: string;
    titleEn: string;
    code: string | null;
}

interface Gender {
    id: number;
    titleAr: string;
    titleEn: string;
}

interface Age {
    id: number;
    titleAr: string;
    titleEn: string;
}

interface Applicant {
    id: number;
    userId: string;
    unifiedNumber: string;
    nationalityName: any;
    nationalityCode:any;
    emiratesId: string;
    emiratesIdIssueDate: string | null;
    emiratesIdExpiryDate: string | null;
    nationality: Nationality;
    address: Address;
    addressId: number | null;
    nationalityId: number;
    fullNameAr: string;
    firstNameAr: string;
    secondNameAr: string;
    thirdNameAr: string;
    fourthNameAr: string;
    familyhNameAr: string;
    clanNameAr: string | null;
    fullNameEn: string;
    firstNameEn: string;
    secondNameEn: string;
    thirdNameEn: string;
    fourthNameEn: string;
    familyhNameEn: string;
    clanNameEn: string | null;
    tribe: string | null;
    khulasitQaidNumber: string | null;
    familyBookNumber: string | null;
    dateOfBirth: string;
    gender: Gender;
    genderId: number;
    age: Age;
    ageId: number;
    communicationId: number | null;
    countryOfBirth: string | null;
    emirateOfBirth: string | null;
    cityOfBirth: string | null;
    placeOfBirthAr: string | null;
    placeOfBirthEn: string | null;
    religion: string | null;
    personType: string;
    occupation: string | null;
    motherNameAr: string | null;
    motherNameEn: string | null;
    familyCount: number | null;
    familyMaleCount: number | null;
    familyFemaleCount: number | null;
    imageUrl: string | null;
    userTypeId: number;
    isActive: boolean;
    success: boolean;
    passportNumber: string | null;
    residence: string | null;
    isEIDVerified: boolean;
    relationShipId: number | null;
    subApplicantDto: string | null;
    providerName:number;
    clientId:any;
    favoritServices:any;
    isProfileCompleted:any;
    adressId:any;
    userType:any;
    user:any;
}

interface ApplicationStatus {
    id: number;
    titleAr: string;
    titleEn: string;
    statusReason: string | null;
    attachmentUrl: string | null;
}

interface ApplicationHistory {
    id: number;
    applicationId: number;
    changeDateTime: string;
    applicationStatusId: number;
    applicationStatus: ApplicationStatus;
    applicationWorkflowStepId: number;
    changedBy: string;
    reason: string | null;
    refunded: boolean;
    documents: string[];
}

interface ApplicationDetails {
    id: number;
    requestForId: number;
    attachments: string[];
    agentAttachments: string[];
    applicationStatusId: number;
    serviceNameEn: string;
    serviceNameAr: string;
    businessId: string;
    emiratesIDNumber: string | null;
    submittionDateTime: string;
    agentId: string | null;
    residencyOrNationalsDetailsId: string | null;
    relationshipId: string | null;
    isPaid: boolean;
    agentComment: string | null;
    agentCommentAr: string | null;
    closingComment: string | null;
    allawTry: boolean;
    applicationHistory: ApplicationHistory[] | null;
    showLastStep: boolean;
    comment: string | null;
}

interface Emirate {
    id: number;
    titleAr: string;
    titleEn: string;
}

interface ShippingAddress {
    id: number;
    emirateId: number;
    regionId: number;
    streetNumber: string;
    houseNumber: string;
    emirate: Emirate;
    region: Region | null;
}

export interface RequestData {
    requestTypeId: number;
    numberOfCopies: number;
    emirateId: number;
    comment: string;
    schoolId: number | null;
    gradeId: number;
    academicYearId: number;
    sisNumber: string | null;
    emiratesIDNumber: string;
    agentComment: string;
    agentCommentAr: string;
    certificateUrl: string | null;
    certificateDownloadName: string | null;
    isMofaicAttested: boolean;
    destinationCountryId: number | null;
    destinationCountryNameAr: string | null;
    destinationCountryName: string | null;
    shippingAddress: ShippingAddress;
    application: ApplicationDetails;
    applicant: Applicant;
    applicationHistory: ApplicationHistory[];
    schoolName: string;
    paymentDetails: string | null;
}
