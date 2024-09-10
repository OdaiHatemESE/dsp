
'use client';
import ParentHeader from "@/components/parents/parentHeader"
import Spinner from "@/components/spinner";
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks";
import { setStudentsList } from "@/store/slices/parent/studentsSlick";
import { RequestOptions } from "https";
import { useEffect, useState } from "react";
import { Direction } from "react-data-table-component"
import { toast } from "react-toastify";


export default function parentLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useAppSelector((state) => state.user.user);
  // const emirateID = user?.emiratesId;
  const [emirateID, setEmirateId] = useState<string>('784197794927968');
  const dispath = useAppDispatch();
  // // Set up your Authorization header with Basic Auth
  // const username = '@Idh2024@';
  // const password = 'Key816273041';

  // const authString = `Basic ${btoa(`${username}:${password}`)}`;
  // console.log(authString)
  // const myHeaders = new Headers();
  // myHeaders.append("Authorization", authString);

  // const requestOptions: RequestInit = {
  //   method: "GET",
  //   headers: myHeaders,
  //   redirect: "follow"
  // };

  // useEffect(() => {
  //   fetch('https://idh.ese.gov.ae/idhapi/api/PaShip/' + emirateID, requestOptions)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //       console.log('odai');
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       dispath(setStudentsList(data));  // Ensure the action is dispatched correctly
  //       setLoading(false);
  //       console.log('ssssss');
  //     })
  //     .catch((error) => {
  //       alert(error);
  //       setError(error);
  //       setLoading(false);
  //     });
  // }, [emirateID]);  // Add emirateID as a dependency

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/get-students?id=' + emirateID); // Passing `123` as a query parameter
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await res.json();
        dispath(setStudentsList(result));  // Ensure the action is dispatched correctly
        setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [emirateID]);




  const handleEID = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    setEmirateId(event.target.value)

  }
  if (loading) return <Spinner />;
  if (error) toast.error(error.message);


  return (
    <div>
      <ParentHeader />
      <> <input type="text" className="border " name="eid" onChange={handleEID} />
        {children}
      </>
    </div>
  )

}