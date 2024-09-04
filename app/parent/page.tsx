import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto p-4">

      <div className="flex flex-wrap bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="w-full md:w-1/4 flex flex-col items-center">
          <img className="rounded-full w-24 h-24 mb-4" src="path-to-image.jpg" alt="Profile Picture" />
          <h2 className="text-xl font-bold mb-2">Muhammad Nabil</h2>
          <p className="text-gray-500 mb-2">muhammad@gmail.com</p>
          <p className="text-gray-500">+965 12 356 7809</p>
        </div>
        <div className="w-full md:w-3/4 flex flex-col md:flex-row justify-between items-center">
          <div className="bg-green-100 text-green-600 font-bold p-4 rounded-lg mb-4 md:mb-0">
            <p>KD 2000</p>
            <p>Total fee outstanding</p>
          </div>
          <div className="text-center">
            <p className="text-gray-700 mb-2">We are here to help and answer any question you might have. We look forward to hearing from you.</p>
            <button className="bg-green-500 text-white px-4 py-2 rounded">Contact Us</button>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-center">
          <p className="text-lg font-semibold">Profiles</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-center">
          <p className="text-lg font-semibold">Fee Payment</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-center">
          <p className="text-lg font-semibold">Academics</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-center">
          <p className="text-lg font-semibold">Attendance</p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Outstanding Fee</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap flex items-center">
                  <img className="h-10 w-10 rounded-full" src="path-to-student-image.jpg" alt="Asim Muhammad" />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Asim Muhammad</div>
                      <div className="text-sm text-gray-500">ST57390277</div>
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Year 1</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">The English Academy</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">KD 1020</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
