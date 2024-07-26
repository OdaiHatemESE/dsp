'use client'

import { useState } from "react";
import ApplicantDetails from "./applicant-details";
import WhoApply from "./who-apply";
import GetUserInfoByEID from "./get-user-info-eid";
const ApplicantInformation: React.FC = () => {
  const [whoApply, setWhoApply] = useState(1);

  const handleValueChange = (value: any) => {
    setWhoApply(value);
  };

  return (
    <div className="ApplicantInformation">

      <WhoApply requestForId={handleValueChange} />
      <ApplicantDetails requestForId={Number(whoApply)}  />
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

