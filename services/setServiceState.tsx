import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks";
import { setService } from "@/store/slices/serviceSlice";
import { ServiceConfig } from "@/config/services-config";
import { AttachmentList, ServiceForm } from "@/config/service.model";
import { UserProfile } from "@/config/user.modal";
import { setUser } from "@/store/slices/userSlice";

interface Params {
  serviceId: string;
  whoApply: number;
}

const setServiceState = ({ serviceId, whoApply }: Params) => {
  const dispatch = useAppDispatch();
  const mainUser = useAppSelector((state) => state.user.user);
  const otherApplicant = useAppSelector((state) => state.applicant.applicant);
  const serviceState = useAppSelector((state) => state.service.service);

  useEffect(() => {
    const appId = new URLSearchParams(window.location.search).get('application-id');

    if (appId != null) {
      // This is edit mode, handle edit mode logic here if needed
    } else {
      // This is new mode
      const service = ServiceConfig.find(service => service.serviceId === serviceId);
      let updatedserviceState = serviceState ?? {} as ServiceForm;
      updatedserviceState = {
        id: service?.id ?? '',
        requestForId: Number(whoApply),
        serviceId: service?.serviceId,
        serviceName: service?.serviceName,
        serviceNameArabic: service?.serviceNameArabic,
        currentStepIndex: 1,
        applicantInformation: mainUser ?? {} as UserProfile,
        form: updatedserviceState.form,
        attachment: serviceState?.attachment,
        steps: serviceState?.steps ?? service?.steps
      }

      const user = Number(whoApply) == 1 ? mainUser : otherApplicant;
      updatedserviceState = { ...updatedserviceState, applicantInformation: user ?? {} as UserProfile };

      console.log('from set service state');
      dispatch(setService(updatedserviceState));

    }
  }, [mainUser, otherApplicant, whoApply, serviceId, dispatch]);
};

export default setServiceState;
