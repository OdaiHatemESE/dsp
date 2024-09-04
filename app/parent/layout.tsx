import Footer from "@/components/footer"
import Header from "@/components/header"


export default function parentLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <>
        <div className="min-h-screen flex">
   
    <aside className="w-64 bg-blue-900 text-white">
      <div className="p-4">
        <img src="logo.png" alt="Logo" className="mb-6" />
        <nav>
          <ul>
            <li className="mb-4"><a href="#" className="flex items-center"><span className="mr-2">🏠</span> Dashboard</a></li>
            <li className="mb-4"><a href="#" className="flex items-center"><span className="mr-2">👤</span> Child's Profile</a></li>
            <li className="mb-4"><a href="#" className="flex items-center"><span className="mr-2">📚</span> Academics</a></li>
            <li className="mb-4"><a href="#" className="flex items-center"><span className="mr-2">🎯</span> Activities</a></li>
            <li className="mb-4"><a href="#" className="flex items-center"><span className="mr-2">💳</span> Fees</a></li>
            <li className="mb-4"><a href="#" className="flex items-center"><span className="mr-2">📜</span> Requests</a></li>
            <li className="mb-4"><a href="#" className="flex items-center"><span className="mr-2">🔖</span> Policies</a></li>
            <li className="mb-4"><a href="#" className="flex items-center"><span className="mr-2">❓</span> Help</a></li>
            <li className="mb-4"><a href="#" className="flex items-center"><span className="mr-2">👤</span> My Profile</a></li>
          </ul>
        </nav>
      </div>
    </aside>

 
    <main className="flex-1 p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Welcome Back, Michael!</h1>
        <div className="flex items-center">
          <button className="text-white bg-blue-500 px-4 py-2 rounded mr-2">Apply for Leave</button>
          <button className="text-white bg-blue-500 px-4 py-2 rounded">Raise a Request</button>
          <img src="profile.jpg" alt="Profile" className="ml-4 w-10 h-10 rounded-full" />
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
 
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Attendance</h2>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <span className="text-3xl mr-2">06</span>
              <span>Sun</span>
            </div>
            <span>Today</span>
          </div>
          <div className="h-24 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold">20% Attendance</span>
          </div>
        </div>

      
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Fee Reminder</h2>
          <p>Total Outstanding: <span className="font-bold text-red-500">AED 1600.50</span></p>
        </div>

    
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Assignments</h2>
          <ul>
            <li className="flex justify-between mb-2">
              <span>Algebra and arithmetic Assignments</span>
              <span className="text-sm text-gray-500">05 Aug 2020</span>
            </li>
         
          </ul>
        </div>
      </section>

      <section className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Reports</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
       
          <div>
            <h3 className="font-bold mb-2">Academic Reports</h3>
            <ul>
              <li className="mb-2"><a href="#" className="text-blue-500">Term 1 Report</a></li>
        
            </ul>
          </div>
 
          <div>
            <h3 className="font-bold mb-2">Performance</h3>
            <ul>
              <li className="mb-2"><a href="#" className="text-blue-500">Term 1 Report</a></li>
              
            </ul>
          </div>
        </div>
      </section>
    </main>
  </div>

    </>
  )

}