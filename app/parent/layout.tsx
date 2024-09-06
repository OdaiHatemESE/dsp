
'use client';
import ParentHeader from "@/components/parents/parentHeader"
import Spinner from "@/components/spinner";
import { useAppDispatch } from "@/store/lib/hooks";
import { setStudentsList } from "@/store/slices/parent/studentsSlick";
import { useEffect, useState } from "react";
import { Direction } from "react-data-table-component"


export default function parentLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispath = useAppDispatch();

  useEffect(() => {
    fetch('/students.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log(response);
        return response.json();
      })
      .then((data) => {
        dispath(setStudentsList(data))
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner />;
  if (error) return <div>Error: {error.message}</div>;


  return (
    <div>
      <ParentHeader />

      {children}

      </div>
  )

}