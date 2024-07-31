import { UserProfile } from "@/config/user.modal";
import fetchWithAuth from "./fetchWithAuth";


export const getUser = async (): Promise<UserProfile> => {
  try {
    
    const response = await fetchWithAuth('uap/api/Profile/GetById');
    const res: UserProfile = await response.json();
    return res;
  } catch (error) {

    throw new Error('Failed to fetch data');
  }
};

 