export interface generalLookups {
    AcademicYear: AcademicYear[],
    Age: [],
    ApplicationDefinition: [],
    ApplicationStatus: [],
    ApplicationTypeRequest: [],
    Currency: [],
    DocumentDefinition: [],
    EducationType: [],
    EducationZone: [],
    Emirate: Emirate[],
    Grade: Grade[],
    Nationality: Nationality[],
    NationalityMofaic: mofaic[],
    Region: [],
    Relationship: [],
    RequestFor: [],
    RequestType: [],
    StudyPeriod: [],
    UserType: []
}

interface Emirate {
    id: number,
    titleAr: String,
    titleEn: string
}

interface AcademicYear {
    id: number,
    titleAr: String,
    titleEn: string
}

interface mofaic {
    active: String,
    countryCode: String,
    countryName: String,
    countryNameAr: String,
    id: number
}

interface Nationality {
    code: string;
    createdBy: string;
    createdOn: string; // ISO 8601 date string
    id: number;
    isActive: boolean;
    isoCode3: string;
    modifiedBy: string | null;
    modifiedOn: string | null; // ISO 8601 date string or null
    titleAr: string;
    titleEn: string;
}

interface Grade {
    code: string;
    createdBy: string;
    createdOn: string;
    cycle: string | null;
    cycleId: number;
    educationTypeId: number;
    gradeOrder: number;
    id: number;
    isActive: boolean;
    manhalCode: string;
    modifiedBy: string | null;
    modifiedOn: string | null;
    titleAr: string;
    titleEn: string;
}