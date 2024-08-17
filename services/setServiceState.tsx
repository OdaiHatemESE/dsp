

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks";
import { setService } from "@/store/slices/serviceSlice";
import { ServiceConfig } from "@/config/services-config";
import { AttachmentList, ServiceForm, StudyDetails } from "@/config/service.model";
import { UserProfile } from "@/config/user.modal";
import { setUser } from "@/store/slices/userSlice";
import { getIssuanceApplication } from "./getApplication";
import Spinner from "@/components/spinner";
import { setApplicant } from "@/store/slices/applicantSlice";

interface Params {
  serviceId: string;
  whoApply: number;
}

const setServiceState = ({ serviceId, whoApply }: Params) => {
  const dispatch = useAppDispatch();
  const mainUser = useAppSelector((state) => state.user.user);
  const otherApplicant = useAppSelector((state) => state.applicant.applicant);
  const serviceState = useAppSelector((state) => state.service.service);
  const service = ServiceConfig.find(service => service.serviceId === serviceId);


  const appId = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('requestId') : null;

  if (appId != null) {
    // This is edit mode, handle edit mode logic here if needed
    let data = null;
    const fetchData = async () => {
      const data = await getIssuanceApplication(appId);

      let updatedserviceState = serviceState ?? {} as ServiceForm;
      updatedserviceState = {
        id: service?.id ?? '',
        requestForId: data.application.requestForId,
        serviceId: service?.serviceId,
        serviceName: service?.serviceName,
        serviceNameArabic: service?.serviceNameArabic,
        currentStepIndex: 1,
        applicantInformation: data.applicant,
        form: data,
        attachment: serviceState?.attachment,
        applicationId: parseInt(appId)

      }
      dispatch(setService(updatedserviceState));
      if (data.application.requestForId == 1) {
        dispatch(setUser(data.applicant))
      } else {
        dispatch(setApplicant(data.applicant))
      }
    }

    useEffect(() => {
      if (data == null) {
        fetchData();
      }
    }, [data])

  

  } else {
    useEffect(() => {
      let updatedserviceState = serviceState ?? {} as ServiceForm;
      updatedserviceState = {
        id: service?.id ?? '',
        requestForId: Number(whoApply),
        serviceId: service?.serviceId,
        serviceName: service?.serviceName,
        serviceNameArabic: service?.serviceNameArabic,
        currentStepIndex: 1,
        applicantInformation: mainUser ?? {} as UserProfile,
        form: updatedserviceState.form ?? service?.form,
        attachment: serviceState?.attachment,
        applicationId:null,

      }

      const user = Number(whoApply) == 1 ? mainUser : otherApplicant;
      updatedserviceState = { ...updatedserviceState, applicantInformation: user ?? {} as UserProfile };

      dispatch(setService(updatedserviceState));

    }, [mainUser, whoApply, otherApplicant, serviceId])
  }

};

export default setServiceState;
