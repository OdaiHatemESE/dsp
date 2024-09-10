'use client';
import React, { useEffect, useState } from 'react';
import StudentRecord from './student.modal';
import { useAppDispatch, useAppSelector } from '@/store/lib/hooks';
import { setStudentsList } from '@/store/slices/parent/studentsSlick';
import Link from 'next/link';
import useGeneratePDF from '@/services/parent/useGeneratePDF';

const StudentGrid = () => {
  const studentList = useAppSelector((state) => state.student.student)
  console.log('odai',studentList);
  const [students, setStudents] = useState<StudentRecord[]>(studentList ?? []);

  useEffect(()=>{
    setStudents(studentList ?? []);
  },[studentList])


  return (
    <div className="mt-4">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">

              <th className="border border-gray-200 px-4 py-2 hidden md:table-cell">رقم الطالب</th>
              <th className="border border-gray-200 px-4 py-2">اسم الطالب</th>
              <th className="border border-gray-200 px-4 py-2">هل تم التوقيع</th>
              <th className="border border-gray-200 px-4 py-2">اجراءات</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.StudentNumber} className="hover:bg-gray-50">

                <td className="border border-gray-200 px-4 py-2 hidden md:table-cell">{student.StudentNumber}</td>
                <td className="border border-gray-200 px-4 py-2">{student.Name}</td>
                <td className="border border-gray-200 px-4 py-2">
                  {student.isSigned == true ? 'نعم' : 'لا'}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {student.isSigned !=  true &&
                    <Link href={`/parent/sign-conduct/${student.StudentNumber}`} className="aegov-btn btn-outline">Sign</Link>}
                  {student.isSigned ==  true &&
                    <button type='button' className='aegov-btn btn-outline' onClick={() => useGeneratePDF(student, '/Methaq.pdf', '/Alexandria-font.ttf')} >Download</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentGrid;
