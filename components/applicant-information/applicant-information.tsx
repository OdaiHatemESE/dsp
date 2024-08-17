'use client'

import { useEffect, useState } from "react";
import ApplicantDetails from "./applicant-details";
import WhoApply from "./who-apply";
import GetUserInfoByEID from "./get-user-info-eid";
import { ServiceConfig } from "@/config/services-config";
import { ServiceForm, ServiceStep } from "@/config/service.model";
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks";
import { setService } from "@/store/slices/serviceSlice";
import { User, UserProfile } from "@/config/user.modal";
import { stat } from "fs";
import { useRouter } from "next/navigation";
import setServiceState from "@/services/setServiceState";
import { useStepper } from "../steper/stepperProvider";
import fetchWithAuth from "@/services/fetchWithAuth";
import { addSubProfile } from "@/services/userprofile";

interface params {
  serviceId: string
}

const ApplicantInformation: React.FC<params> = ({ serviceId }) => {

  const { nextStep } = useStepper();

  const [whoApply, setWhoApply] = useState(1);
  const router = useRouter();
  const dispatch = useAppDispatch();
  let serviceState = useAppSelector((state) => state.service.service);
  const otherApplicant = useAppSelector((state) => state.applicant.applicant);

  useEffect(() => {
    setWhoApply(serviceState?.requestForId ?? 1)
  })



  const handleValueChange = (value: any) => {
    setWhoApply(value);
    serviceState = { ...serviceState, requestForId: Number(value) }
    dispatch(setService(serviceState));
  };


  const goNext = async () => {
    nextStep();
  }




  return (
    <div className="ApplicantInformation">

      <WhoApply requestForId={handleValueChange} />
      <ApplicantDetails requestForId={Number(whoApply)} />
      {whoApply == 2 && otherApplicant == null && <GetUserInfoByEID />}



      {/* userType */}

      <div className="w-full actions mt-10 flex flex-row justify-end flex-wrap">
        <button className="aegov-btn btn-lg" type="button" onClick={goNext}>
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

