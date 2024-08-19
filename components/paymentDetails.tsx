import fetchWithAuth from "@/services/fetchWithAuth";
import { useGetpaymentDetails } from "@/services/getPaymentDetails";
import { useAppSelector } from "@/store/lib/hooks";
import Spinner from "./spinner";

const PaymentDetails: React.FC = () => {
  const serviceState = useAppSelector((state) => state.service.service); // Get Service State  

  const { paymentInfo, isLoadingInfo, isErrorInfo } = useGetpaymentDetails(serviceState); // Get Payment Details
  
  if (isLoadingInfo) return <Spinner />;
  if (isErrorInfo) return <div>Error</div>;

  return (
    <div className="overflow-x-auto p-4 bg-gray-100">
      <div className="mx-auto bg-white  rounded-lg p-6">
        {paymentInfo?.isMultipleServices ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b py-2 text-gray-700">Service Name</th>
                <th className="border-b py-2 text-gray-700">Service ID</th>
                <th className="border-b py-2 text-gray-700">Service Price</th>
                <th className="border-b py-2 text-gray-700">Total Amount</th>
          
              </tr>
            </thead>
            <tbody>
              {paymentInfo.serviceList.map((item, index) => (
                <tr key={index} className="border-b last:border-none">
                  <td className="py-2">{item.serviceName}</td>
                  <td className="py-2">{item.serviceId}</td>
                  <td className="py-2">{item.servicePriceAmount} AED</td>
                  <td className="py-2">{item.totalServiceAmount} AED</td>
                   
                </tr>
              ))}
              <tr>
                <td colSpan={2}></td>
                <td className="pt-4 font-bold border-t-2 border-gray-200">Total:</td>
                <td className="pt-4 font-bold border-t-2 border-gray-200">{paymentInfo.totalServiceAmount} AED</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b py-2 text-gray-700">Service Name</th>
                <th className="border-b py-2 text-gray-700">Service ID</th>
                <th className="border-b py-2 text-gray-700">Service Price</th>
                <th className="border-b py-2 text-gray-700">Total Amount</th>
                <th className="border-b py-2 text-gray-700">Quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b last:border-none">
                <td className="py-2">{paymentInfo?.serviceName}</td>
                <td className="py-2">{paymentInfo?.serviceId}</td>
                <td className="py-2">{paymentInfo?.servicePriceAmount} AED</td>
                <td className="py-2">{paymentInfo?.totalServiceAmount} AED</td>
                <td className="py-2">{paymentInfo?.quantity}</td>
              </tr>
              <tr>
                <td colSpan={3}></td>
                <td className="pt-4 font-bold border-t-2 border-gray-200">Total:</td>
                <td className="pt-4 font-bold border-t-2 border-gray-200">{paymentInfo.totalServiceAmount} AED</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PaymentDetails;
