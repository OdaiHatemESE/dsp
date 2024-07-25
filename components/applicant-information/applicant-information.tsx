import ApplicantDetails from "./applicant-details";
import WhoApply from "./who-apply";
const ApplicantInformation: React.FC = async () => {
  return (
    <div className="ApplicantInformation">
      <WhoApply />
      <ApplicantDetails />
      <hr className="mb-5 mt-5" />
      <h5>User Type</h5>
      <p className="text-sm text-gray-500 mt-1">Please Select user Type</p>
      <div className="w-full">
        <div className="aegov-form-control">
          <div className="form-control-input">
            <select id="opt1" name="opt1">
              <option>option 1</option>
              <option>option 2</option>
              <option>option 3</option>
            </select>
          </div>
        </div>
      </div>

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

