import ApplicantInformation from "@/components/applicant-information/applicant-information";
import Attachments from "@/components/attachments";
import StudyDetails from "../../forms/issuance-and-attestation/study-details";

interface Params {
  params: {
    step: string;
    serviceId: string;
  };
}

const DynamicPage: React.FC<Params> = ({ params }) => {

  const step = params.step;
  const serviceId = params.serviceId;
  // Function to determine which component to render
  const renderComponent = () => {
    switch (step) {
      case 'applicant-information':
        return <ApplicantInformation serviceId={serviceId} />
      case 'service-form':
        return serviceForm(serviceId);
      case '3':
        return <Attachments />;
      case '4':
        return 'summary';
      default:
        return <div>Default Component</div>;
    }
  };

  const serviceForm = (id: string) => {
    switch (id) {
      case 'issuance-and-attestation':
        return <StudyDetails />
    }
  }

  return (
    <div>
      {renderComponent()}
    </div>
  );
};

export default DynamicPage;