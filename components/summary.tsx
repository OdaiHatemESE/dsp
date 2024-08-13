'use client';
import { useAppSelector } from "@/store/lib/hooks";
import { useStepper } from "./steper/stepperProvider";



const Summary: React.FC = () => {

    const serviceState = useAppSelector((state) => state.service.service); // Get Service State  

    const { nextStep, prevStep } = useStepper();
    const goPrevious = () => {
        prevStep();
    }
    console.log(serviceState);
    return (

        <div>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg ">
                <tbody>
                    <tr className="bg-gray-100 border-b border-gray-200">
                        <td className="px-6 py-4 font-bold text-gray-700">Emirate ID</td>
                        <td className="px-6 py-4 text-gray-600">{serviceState?.applicantInformation?.emiratesId}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                        <td className="px-6 py-4 font-bold text-gray-700">Name</td>
                        <td className="px-6 py-4 text-gray-600">{serviceState?.applicantInformation?.fullNameEn}</td>
                    </tr>
                    <tr className="bg-gray-100 border-b border-gray-200">
                        <td className="px-6 py-4 font-bold text-gray-700">Gender</td>
                        <td className="px-6 py-4 text-gray-600">{serviceState?.applicantInformation?.genderId == 1 ? 'Male' : 'Female'}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                        <td className="px-6 py-4 font-bold text-gray-700">Mobile Number</td>
                        <td className="px-6 py-4 text-gray-600">{serviceState?.applicantInformation?.address.mobileNumber}</td>
                    </tr>
                    <tr className="bg-gray-100 border-b border-gray-200">
                        <td className="px-6 py-4 font-bold text-gray-700">Email</td>
                        <td className="px-6 py-4 text-gray-600">{serviceState?.applicantInformation?.address.email}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                        <td className="px-6 py-4 font-bold text-gray-700">Nationality</td>
                        <td className="px-6 py-4 text-gray-600">{serviceState?.applicantInformation?.nationality.titleEn}</td>
                    </tr>
                    <tr className="bg-gray-100">
                        <td className="px-6 py-4 font-bold text-gray-700">User Type</td>
                        <td className="px-6 py-4 text-gray-600">{/* Add content for User Type here */}</td>
                    </tr>
                </tbody>
            </table>
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
                <button className="aegov-btn btn-lg" type="submit">
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

        </div>


    )
}

export default Summary;