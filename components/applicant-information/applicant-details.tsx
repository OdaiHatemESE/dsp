// file path: /app/applicant-information/ApplicantDetails.tsx


'use client';
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks";


interface param {
    requestForId: number
}

const ApplicantDetails: React.FC<param> = ({ requestForId }) => {
    
    let otherApplicant = useAppSelector((state) => state.applicant.applicant);
    const mainUser = useAppSelector((state) => state.user.user);
   
    const user = requestForId == 1 ? mainUser : otherApplicant;
 
    


    return (
        <section>
            {user && 

            <div className="ApplicantDetails">
                <h5>Applicant Information</h5>
                <p className="text-sm text-gray-500 mt-1">
                    Please confirm personal information in order to continue the application
                </p>
                <div className="flex flex-wrap md:flex-row">
                    <div className="w-full md:w-1/4">
                        <h6>Emirates ID Number</h6>
                        <p>{user?.emiratesId}</p>
                    </div>
                    <div className="w-full md:w-1/4">
                        <h6>Full Name</h6>
                        <p>{user ? user.fullNameEn : "Loading..."}</p>
                    </div>
                    <div className="w-full md:w-1/4">
                        <h6>Phone</h6>
                        <p>{user ? user.address.mobileNumber : "Loading..."}</p>
                    </div>
                    <div className="w-full md:w-1/4">
                        <h6>Email</h6>
                        <p><span>{mainUser ? mainUser.address.email : "Loading..."}</span></p>
                    </div>
                </div>
            </div>
             }
        </section>
    );
};

export default ApplicantDetails;
