
'use client';
import ParentHeader from "@/components/parents/parentHeader"
import Spinner from "@/components/spinner";
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks";
import { setStudentsList } from "@/store/slices/parent/studentsSlick";
import { RequestOptions } from "https";
import { useEffect, useState } from "react";
import { Direction } from "react-data-table-component"


export default function parentLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useAppSelector((state) => state.user.user);
  const emirateID = user?.emiratesId;
  const dispath = useAppDispatch();
  // Set up your Authorization header with Basic Auth
  const username = '@Idh2024@';
  const password = 'Key816273041';

  const authString = `Basic ${btoa(`${username}:${password}`)}`;
  console.log(authString  )
  const myHeaders = new Headers();
  myHeaders.append("Authorization", authString);

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  useEffect(() => {
    fetch('https://idh.ese.gov.ae/idhapi/api/PaShip/' + emirateID, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        dispath(setStudentsList(data));  // Ensure the action is dispatched correctly
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setLoading(false);
      });
  }, [emirateID]);  // Add emirateID as a dependency

  if (loading) return <Spinner />;
  if (error) return <div>Error: {error.message}</div>;


  return (
    <div>
      <ParentHeader />

      {children}

    </div>
  )

}