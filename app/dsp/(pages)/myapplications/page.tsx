import { Application } from '@/config/application.modal';
import { cookies } from 'next/headers'; // Importing the cookies function
import ESEDataTable from '@/components/dataTable';
import Spinner from '@/components/spinner';
const MyApplicationsPage = async () => {
    let data: Application[] = [];
    let totalNumber = 0;
    let error = null;
    try {
        // Retrieve the token from the cookies
        const cookieStore = cookies();
        const token = cookieStore.get('authToken'); // Replace 'YOUR_COOKIE_NAME' with the actual cookie name
        if (!token) {
            throw new Error('No token found in cookies');
        }
        // Fetch data from the API with the Authorization header
        const res = await fetch('https://apigateway-stg.ese.gov.ae/certificates/v1/GetAllApplications?pageSize=10&pageNumber=1&statusId=0', {
            headers: {
                'Authorization': `Bearer ${token.value}` // Use the token value from cookies
            },
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch data: ${res.status}`);
        }

        const respons = await res.json();
        totalNumber = respons.totalNumber;
        data = respons.data;
    } catch (err: any) {
        error = err.message;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!data.length) {
        return <Spinner />; // Show loading component if data is empty
    }

    return (
        <div>
            <h1 className='mb-10 text-xl'>My Applications</h1>
            <ESEDataTable data={data} pageSize={10} pageId="myApplications" />
        </div>
    );
}

export default MyApplicationsPage;
