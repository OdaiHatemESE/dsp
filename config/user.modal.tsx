export interface UserProfile {
  id: number;
  unifiedNumber: string;
  emiratesId: string;
  emiratesIdIssueDate: any;
  emiratesIdExpiryDate: any;
  nationalityName: any;
  nationalityCode: string;
  fullNameAr: string;
  firstNameAr: string;
  secondNameAr: any;
  thirdNameAr: any;
  fourthNameAr: any;
  familyhNameAr: string;
  clanNameAr: any;
  fullNameEn: string;
  firstNameEn: string;
  secondNameEn: any;
  thirdNameEn: any;
  fourthNameEn: any;
  familyhNameEn: string;
  clanNameEn: any;
  tribe: any;
  khulasitQaidNumber: any;
  familyBookNumber: any;
  dateOfBirth: any;
  countryOfBirth: any;
  emirateOfBirth: any;
  cityOfBirth: any;
  placeOfBirthAr: any;
  placeOfBirthEn: any;
  religion: any;
  personType: string;
  occupation: any;
  motherNameAr: any;
  motherNameEn: any;
  familyCount: any;
  familyMaleCount: any;
  familyFemaleCount: any;
  imageUrl: any;
  isActive: boolean;
  providerName: number;
  isEIDVerified: boolean;
  clientId: any;
  favoritServices: any;
  isProfileCompleted: boolean;
  adressId: any;
  nationalityId: number;
  userTypeId: number;
  genderId: number;
  ageId: number;
  communicationId: any;
  userId: string;
  address: Address;
  nationality: Nationality;
  userType: any;
  gender: any;
  age: any;
  user: User;
  RelationShipId: string
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
}

export interface Nationality {
  id: number;
  titleAr: string;
  titleEn: string;
  code: string | null;
}

export interface User {
  id: string;
  email: string;
  phoneNumber: string;
  emailConfirmed: string;
  phoneNumberConfirmed: string;
  providerName: number;
}


// Define the Response interface
export interface Response {
  maskedMobile: string;
  profile: any; // Assuming profile can be of any type as it's not detailed.
  isSuccess: boolean;
  message: string | null;
  messageAr: string | null;
}

// Define the main interface
export interface ApiResponse {
  errorMessage: string | null;
  errorMessageAr: string | null;
  isSuccess: boolean;
  response: Response;
}

