import Spinner from "@/components/spinner";
import { StudyDetailsForm } from "@/config/service.model";
import { useGeneralLookups } from "@/lookups/lookupService";
import { useAppSelector } from "@/store/lib/hooks";


const issuanceSummary: React.FC = () => {

    const serviceState = useAppSelector((state) => state.service.service); // Get Service State  
    const data: StudyDetailsForm = serviceState?.form;
    const { lookups, isLoading, isError } = useGeneralLookups();

    if (isLoading) return <Spinner></Spinner>;
    if (isError) return <div>Error loading </div>;

 
    const lookupField = (key: string, value: any) => {
        switch (key) {
            case "RequestTypeId": { return value == 1 ? 'Soft Copy' : 'Hard Copy' }
            case "EmirateSchoolId": { return lookups?.Emirate.find((item) => item.id == value)?.titleEn; }
            case "AcademicYearId": { return lookups?.AcademicYear.find((item) => item.id == value)?.titleEn }
            case "GradeId": { return lookups?.Grade.find((item) => item.id == value)?.titleEn || "" }
            default:
                return value;
        }
    };
    return (
        <table>
            <tbody>
                {Object.entries(data)
                    .filter(([_, value]) => value !== undefined && value !== null && value.toString().trim() !== '')
                    .map(([key, value], index) => (
                        <tr key={index}>
                            <td>{key}</td>
                            <td>{lookupField(key, value)}</td>
                        </tr>
                    ))}
            </tbody>
        </table>
    )
}

export default issuanceSummary;