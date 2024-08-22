import { UserProfile } from "@/config/user.modal";
import fetchWithAuth from "./fetchWithAuth";
import { useAppSelector } from "@/store/lib/hooks";
import useSWR from "swr";


export const getUser = async (): Promise<UserProfile> => {
  try {

    const response = await fetchWithAuth('uap/api/Profile/GetById');
    const res: UserProfile = await response.json();
    return res;
  } catch (error) {

    throw new Error('Failed to fetch data');
  }
};



export const useGetUser =  () => {
  const { data, error } = useSWR(['UserInfo'], () => getUser());
  return {
    userInfo: data as UserProfile,
    isLoading: !data && !error,
    isError: error,
  }
}

  interface SubProfile {
    errorMessage: string,
    errorMessageAr: string,
    isSuccess: boolean,
    response: UserProfile,
    statusCode: number
  }

  export const addSubProfile = async ({ applicant }: { applicant: UserProfile }): Promise<SubProfile> => {

    try {
      const response = await fetchWithAuth('uap/api/Profile/UpdateSubProfile', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicant),
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Failed to add sub-profile: ${response.status} ${response.statusText}. Details: ${errorDetails}`);
      }

      const res: SubProfile = await response.json();
      return res;
    } catch (error) {
      console.error('Error adding sub-profile:', error);
      throw new Error('Failed to add sub-profile.');
    }
  };
