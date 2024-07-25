import ApplicantInformation from "@/components/applicant-information/applicant-information";
import Attachments from "@/components/attachments";

interface Params {
    params: {
      step: string;
    };
  }
  
  const DynamicPage: React.FC<Params> = ({ params }) => {
    const { step } = params;
  
    // Function to determine which component to render
    const renderComponent = () => {
      switch (step) {
        case 'applicant-information':
          return <ApplicantInformation />
        case 'service-form':
          return 'form';
        case '3':
          return <Attachments />;
          case '4':
          return 'summary';
        default:
          return <div>Default Component</div>;
      }
    };
  
    return (
      <div>
        {renderComponent()}
      </div>
    );
  };
  
  export default DynamicPage;