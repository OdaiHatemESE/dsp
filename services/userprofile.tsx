import { UserProfile } from "@/config/user.modal";
import fetchWithAuth from "./fetchWithAuth";
import { useAppSelector } from "@/store/lib/hooks";


export const getUser = async (): Promise<UserProfile> => {
  try {

    const response = await fetchWithAuth('uap/api/Profile/GetById');
    const res: UserProfile = await response.json();
    return res;
  } catch (error) {

    throw new Error('Failed to fetch data');
  }
};

interface SubProfile {
  errorMessage: string,
  errorMessageAr: string,
  isSuccess: boolean,
  response: UserProfile,
  statusCode: number
}

export const addSubProfile = async ({ applicant }: { applicant: UserProfile }): Promise<SubProfile> => {
  console.log('Adding sub-profile for applicant:', applicant);

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
    console.log('Sub-profile added successfully:', res);
    return res;
  } catch (error) {
    console.error('Error adding sub-profile:', error);
    throw new Error('Failed to add sub-profile.');
  }
};
