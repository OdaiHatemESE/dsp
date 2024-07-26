'use client';

import { ApiResponse, UserProfile } from "@/config/user.modal";
import { getMobileNumber, verfiyMobile } from "@/services/verfiyEid";
import { FormEvent, useRef, useState } from "react";
import { useAppDispatch } from "@/store/lib/hooks";
import { setApplicant } from "@/store/slices/applicantSlice";


const GetUserInfoByEID: React.FC = () => {


    const [emirateId, setemirateId] = useState<string>("");
    const [mobileNumber, setMobileNumber] = useState<string>("");
    const [digits, setDigits] = useState('');
    const dispatch=useAppDispatch();


    const handleChange = (event: any) => {
        setemirateId(event.target.value);
    };

    const verifyEid = async () => {
        let data: ApiResponse = await getMobileNumber(emirateId);
        console.log(data.response.maskedMobile);
        setMobileNumber(data.response.maskedMobile)
    }

    const handleMobileSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log('Last 4 digits entered:', digits);
        let data: UserProfile = await verfiyMobile(emirateId, digits)
        dispatch(setApplicant(data))
        console.log(data);
    };

    return (
        <section>
            <div id="emirateIDForm">
                <div className="aegov-form-control">
                    <label htmlFor="number_input">Emirates ID</label>
                    <div className="form-control-input">
                        <input type="number" name="number_input" id="number_input" placeholder="000-0000-0000000-0" value={emirateId} onChange={handleChange} />
                        <span className="control-suffix">
                            <svg className="text-primary-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                                <rect width="256" height="256" fill="none" />
                                <path
                                    d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,168a12,12,0,1,1,12-12A12,12,0,0,1,128,192Zm8-48.72V144a8,8,0,0,1-16,0v-8a8,8,0,0,1,8-8c13.23,0,24-9,24-20s-10.77-20-24-20-24,9-24,20v4a8,8,0,0,1-16,0v-4c0-19.85,17.94-36,40-36s40,16.15,40,36C168,125.38,154.24,139.93,136,143.28Z" />
                            </svg>
                        </span>
                    </div>
                </div>
                <button onClick={verifyEid} className="aegov-btn" type="button">Verfiy</button>
            </div>
            <div id="mobileNumberForm" className="flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Verify Your Mobile Number</h2>
                    <p className="mb-4 text-gray-600">Your mobile number: {mobileNumber}</p>
                    <form onSubmit={handleMobileSubmit}>
                        <div className="mb-4">
                            <label htmlFor="digits" className="block text-gray-700">Enter the last 4 digits of your mobile number:</label>
                            <input
                                type="text"
                                id="digits"
                                name="digits"
                                value={digits}
                                onChange={(e) => setDigits(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                                maxLength={4}
                                required

                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
            
            <div id="otpForm">

            </div>

        </section>
    )
};

export default GetUserInfoByEID;