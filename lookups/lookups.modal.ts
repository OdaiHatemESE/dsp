export interface generalLookups{
    AcademicYear:AcademicYear[],
    Age:[],
    ApplicationDefinition:[],
    ApplicationStatus:[],
    ApplicationTypeRequest:[],
    Currency:[],
    DocumentDefinition:[],
    EducationType:[],
    EducationZone:[],
    Emirate:Emirate[],
    Grade:Grade[],
    Nationality:[],
    NationalityMofaic:[],
    Region:[],
    Relationship:[],
    RequestFor:[],
    RequestType:[],
    StudyPeriod:[],
    UserType:[]
}

interface Emirate{
    id:number,
    titleAr:String,
    titleEn:string
}

interface AcademicYear{
    id:number,
    titleAr:String,
    titleEn:string
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