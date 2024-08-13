import useSWR from 'swr';
import { generalLookups } from './lookups.modal';


export const genearalLookups = async (): Promise<generalLookups> => {
    const response = await fetch('https://apigateway-stg.ese.gov.ae/certificates/GetLookups');
    const res: generalLookups = await response.json();
    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }
    return res;
  };


  export const useGeneralLookups = () => {
    const { data, error } = useSWR('generalLookups', genearalLookups);
    return {
        lookups: data,
      isLoading: !error && !data,
      isError: error,
    };
  };