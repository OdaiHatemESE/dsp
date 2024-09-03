'use client';
import { useAppSelector } from "@/store/lib/hooks";
import { useStepper } from "./steper/stepperProvider";
import { ServiceConfig } from "@/config/services-config";
import { useGeneralLookups } from "@/lookups/lookupService";
import Spinner from "./spinner";
import { StudyDetailsForm } from "@/config/service.model";
import { UserProfile } from "@/config/user.modal";
import PaymentDetails from "./paymentDetails";
import { getPaymentUrl } from "@/services/getPaymentDetails";

interface params {
    serviceId: string
}

const Summary: React.FC<params> = ({ serviceId }) => {

    const serviceState = useAppSelector((state) => state.service.service); // Get Service State  
    const service = ServiceConfig.find((service) => service.serviceId === serviceId);
    const studyDetails: StudyDetailsForm = serviceState?.form;
   
    const { lookups, isLoading, isError } = useGeneralLookups();

    if (isLoading) return <Spinner></Spinner>;
    if (isError) return <div>Error loading </div>;


    const { nextStep, prevStep } = useStepper();
    const goPrevious = () => {
        prevStep();
    }


    const lookupField = (key: string, value: any) => {
        switch (key) {
            case "requestTypeId": { return value == 1 ? 'Soft Copy' : 'Hard Copy' }
            case "emirateSchoolId": { return lookups?.Emirate.find((item) => item.id == value)?.titleEn; }
            case "academicYearId": { return lookups?.AcademicYear.find((item) => item.id == value)?.titleEn }
            case "gradeId": { return lookups?.Grade.find((item) => item.id == value)?.titleEn || "" }
            case "requestForId": { return value == 1 ? 'For Me' : 'For Another person' }
            default:
                return value;
        }
    };


    const handelPayment = async () => {
        const res = await getPaymentUrl(serviceState?.applicationId);
        if (res) {

            window.location.href = res.paymentUrl;
            return <Spinner />
        }
    }

    return (
        <section>
            <h1 className="text-xl mb-5">Applicant Information</h1>
            <div className="bg-white border border-gray-200 rounded-lg">
                <div className="flex flex-wrap">
                    <div className="w-full sm:w-2/2 md:w-3/3 lg:w-2/4 p-4 border-b border-gray-200 flex">
                        <div className="w-1/2 font-bold text-gray-700">Emirate ID</div>
                        <div className="w-1/2 text-gray-600">{serviceState?.applicantInformation?.emiratesId}</div>
                    </div>
                    <div className="w-full sm:w-2/2 md:w-3/3 lg:w-2/4 p-4 border-b border-gray-200 flex">
                        <div className="w-1/2 font-bold text-gray-700">Name</div>
                        <div className="w-1/2 text-gray-600">{serviceState?.applicantInformation?.fullNameEn}</div>
                    </div>
                    <div className="w-full sm:w-2/2 md:w-3/3 lg:w-2/4 p-4 border-b border-gray-200 flex">
                        <div className="w-1/2 font-bold text-gray-700">Gender</div>
                        <div className="w-1/2 text-gray-600">{serviceState?.applicantInformation?.genderId == 1 ? 'Male' : 'Female'}</div>
                    </div>
                    <div className="w-full sm:w-2/2 md:w-3/3 lg:w-2/4 p-4 border-b border-gray-200 flex">
                        <div className="w-1/2 font-bold text-gray-700">Mobile Number</div>
                        <div className="w-1/2 text-gray-600">{serviceState?.applicantInformation?.address.mobileNumber}</div>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-3/3 lg:w-2/4 p-4 border-b border-gray-200 flex">
                        <div className="w-1/2  font-bold text-gray-700">Email</div>
                        <div className="w-1/2 text-gray-600">{serviceState?.applicantInformation?.address.email}</div>
                    </div>
                    <div className="w-full sm:w-2/2 md:w-3/3 lg:w-2/4 p-4 border-b border-gray-200 flex">
                        <div className="w-1/2 font-bold text-gray-700">Nationality</div>
                        <div className="w-1/2 text-gray-600">{serviceState?.applicantInformation?.nationality.titleEn}</div>
                    </div>
                    <div className="w-full sm:w-2/2 md:w-3/3 lg:w-2/4 p-4 flex">
                        <div className="w-1/2 font-bold text-gray-700">User Type</div>
                        <div className="w-1/2 text-gray-600">{/* Add content for User Type here */}</div>
                    </div>
                </div>
            </div>


            <hr className="mt-10" />
            <div className="mt-10">
                <h1 className="text-xl mb-5">Service Details</h1>
                <div className="bg-white border border-gray-200 rounded-lg">
                    <div className="flex flex-wrap">
                        {Object.entries(studyDetails)
                            .filter(([_, value]) => value !== undefined && value !== null && value.toString().trim() !== '')
                            .map(([key, value], index) => (
                                <div className="w-full sm:w-2/2 md:w-3/3 lg:w-2/4 p-4 border-b border-gray-200 flex" key={index}>
                                    <div className="w-1/2 font-bold text-gray-700">{key}</div>
                                    <div className="w-1/2 text-gray-600">{lookupField(key, value)}</div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            {serviceState?.attachment &&

                <div className="mt-10">
                    <hr className="mt-10" />
                    <h1 className="text-xl mb-5">Attachments</h1>
                    <div className="overflow-x-auto p-4 bg-gray-100">
                        <div className=" mx-auto bg-white  rounded-lg p-6">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr>
                                        <th className="border-b py-2 text-gray-700">File Name</th>
                                        <th className="border-b py-2 text-gray-700">Download Link</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {serviceState?.attachment.map((file: any) => (
                                        <tr key={file.id} className="border-b last:border-none">
                                            <td className="py-2 font-bold text-gray-700">{file.attachmentName}</td>
                                            <td className="py-2">
                                                <a
                                                    href={file.attachmentUrl}
                                                    className="text-blue-600 hover:underline"
                                                    download
                                                >
                                                    Download
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

            }
            <hr className="mt-10" />
            <div className="mt-10">
                <h1 className="text-xl mb-5">Payment Details</h1>
                <div>
                    <PaymentDetails />
                </div>
            </div>




            <div className="w-full actions mt-10 flex flex-row justify-between flex-wrap">
                <button className="aegov-btn btn-lg" type="button" onClick={goPrevious}>

                    <svg
                        className="rtl:-scale-x-100 rotate-180"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 256"
                    >
                        <rect width="256" height="256" fill="none" />
                        <line
                            x1="40"
                            y1="128"
                            x2="216"
                            y2="128"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="16"
                        />
                        <polyline
                            points="144 56 216 128 144 200"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="16"
                        />
                    </svg>

                    Previous
                </button>
                <button className="aegov-btn btn-lg" type="button" onClick={handelPayment}>
                    Pay
                    <svg
                        className="rtl:-scale-x-100"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 256"
                    >
                        <rect width="256" height="256" fill="none" />
                        <line
                            x1="40"
                            y1="128"
                            x2="216"
                            y2="128"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="16"
                        />
                        <polyline
                            points="144 56 216 128 144 200"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="16"
                        />
                    </svg>
                </button>

            </div>

        </section>



    )
}

export default Summary;