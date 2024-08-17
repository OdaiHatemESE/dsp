'use client';

import { ApiResponse, UserProfile } from "@/config/user.modal";
import { getMobileNumber, verfiyMobile } from "@/services/verfiyEid";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@/store/lib/hooks";
import { setApplicant } from "@/store/slices/applicantSlice";
import OTPForm from "./otpForm";


const GetUserInfoByEID: React.FC = () => {
    const [emirateId, setemirateId] = useState<string>("");
    const [emirateIdVerified,setEmirateIdStatus]=useState<boolean>(false);
    const [mobileValidation,setemobileValidationStatus]=useState<boolean>(false);
    const [mobileNumber, setMobileNumber] = useState<string>("");
    const [digits, setDigits] = useState('');
    const [user,setUser]=useState<UserProfile>();

    const handleChange = (event: any) => {
        setemirateId(event.target.value);
    };

    const verifyEid = async () => {
        let data: ApiResponse = await getMobileNumber(emirateId);
         
        if (data.response.maskedMobile) {
            setEmirateIdStatus(true);
            setMobileNumber(data.response.maskedMobile);
        }
    }

    const handleMobileSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        let data: UserProfile = await verfiyMobile(emirateId, digits)
        if(data){
            setemobileValidationStatus(true)
            setUser(data);

        }
         
    };

    return (
        <section>
            {emirateIdVerified==false && 
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
                <button onClick={verifyEid} className="aegov-btn mt-5" type="button">Verfiy</button>
            </div>
}
            {emirateIdVerified && !mobileValidation &&
            <div id="mobieNumberForm">
                <form onSubmit={handleMobileSubmit}>
                    <div className="aegov-form-control">
                        <label htmlFor="number_input">Enter the last 4 digits of your mobile number:</label>
                        <h4 className="mt-5 mb-5">{mobileNumber}</h4>
                        <div className="form-control-input">
                            <input type="number"

                                id="digits"
                                name="digits"
                                value={digits}
                                onChange={(e) => setDigits(e.target.value)}
                                maxLength={4}
                                required
                            />
                            <span className="control-suffix">
                                <svg className="text-primary-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                                    <rect width="256" height="256" fill="none" />
                                    <path
                                        d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,168a12,12,0,1,1,12-12A12,12,0,0,1,128,192Zm8-48.72V144a8,8,0,0,1-16,0v-8a8,8,0,0,1,8-8c13.23,0,24-9,24-20s-10.77-20-24-20-24,9-24,20v4a8,8,0,0,1-16,0v-4c0-19.85,17.94-36,40-36s40,16.15,40,36C168,125.38,154.24,139.93,136,143.28Z" />
                                </svg>
                            </span>
                        </div>
                    </div>
                    <button className="aegov-btn mt-5" type="submit">Submit</button>
                </form>
            </div>
}



{mobileValidation && emirateIdVerified && user &&
            <div id="otpForm">
                <OTPForm eid={emirateId} mobileNumber={mobileNumber} user={user} ></OTPForm>
            </div>
        }
        </section>
    )
};

export default GetUserInfoByEID;