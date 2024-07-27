'use client'

import { useEffect, useState } from "react";
import ApplicantDetails from "./applicant-details";
import WhoApply from "./who-apply";
import GetUserInfoByEID from "./get-user-info-eid";
import { ServiceConfig } from "@/config/services-config";
import { ServiceForm } from "@/config/service.model";
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks";
import { setService } from "@/store/slices/serviceSlice";
import { UserProfile } from "@/config/user.modal";
import { stat } from "fs";

interface params {
  serviceId: string
}

const ApplicantInformation: React.FC<params> = ({ serviceId }) => {
  const [whoApply, setWhoApply] = useState(1);
  const state=useAppSelector((state)=>state);
  const user=useAppSelector((state)=>state.user.user);
  const serviceState = useAppSelector((state) => state.service.service);

 
 
  const dispatch = useAppDispatch();

  const handleValueChange = (value: any) => {
    setWhoApply(value);
  };

 


  useEffect(() => {
    console.log('tazzzzzzzzzzzzzz')
    const appId = new URLSearchParams(window.location.search).get('application-id');

    if (appId != null) {
      // This is edit mode, handle edit mode logic here if needed
    } else {
      // This is new mode
      

      if (serviceState != null) {
        // Reset store if it is not empty
        dispatch(setService({} as ServiceForm));

      } else {
        // Store is empty

        const service = ServiceConfig.find(service => service.serviceId === serviceId);
    
        const serviceForm: ServiceForm = {
          id: service?.id ?? '',
          requestForId: Number(whoApply),
          serviceId: service?.serviceId ?? '',
          serviceName: service?.serviceName ?? '',
          serviceNameArabic: service?.serviceNameArabic ?? '',
          currentStepIndex: 1,
          applicantInformation: user ?? {} as UserProfile,
          form: [],
          attachment: []
        };
        dispatch(setService(serviceForm));


      }
    }
  }, []);
  return (
    <div className="ApplicantInformation">

      <WhoApply requestForId={handleValueChange} />
      <ApplicantDetails requestForId={Number(whoApply)} />
      <GetUserInfoByEID />


      {/* userType */}

      <div className="w-full actions mt-10 flex flex-row justify-end flex-wrap">
        <button className="aegov-btn btn-lg" type="button">
          Next
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
  );
};

export default ApplicantInformation;

