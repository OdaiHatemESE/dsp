'use client';

import StudentGrid from "@/components/parents/studentGrid";
import { useAppSelector } from "@/store/lib/hooks";


export default function Home() {
  const userDetails = useAppSelector((state)=>state.user.user);
  const emirateId = userDetails?.emiratesId;
  const userName = userDetails?.fullNameAr;

  console.log(emirateId);
  return (
    <>
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between bg-blue-100 p-8 rounded-lg my-6">
          <div className="flex-1 pr-0 md:pr-8 mb-6 md:mb-0">
            <h1 className="text-3xl font-semibold mb-6">مرحبا بك, {userName}</h1>
            <p className="text-base mb-6">
              معًا، نعمل على خلق بيئة آمنة وداعمة لأطفالنا. يُرجى مراجعة وتوقيع ميثاق الشراكة بين  المدرسة وولي الامر  لمساعدتنا في الحفاظ على هذه القيم
            </p>
            <button className="px-6 py-2 text-white bg-green-500 hover:bg-green-600 rounded-md">
              يرجى المراجعة والتوقيع
            </button>
          </div>
          <div className="">
            {/* Add your image or icon here */}
            <img src="parent.svg" alt="School Community" className="max-w-full h-[200px] rounded-lg" />
          </div>

        </div>

        <StudentGrid  />
      </div>
    </>
  );
}
