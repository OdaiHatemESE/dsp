
const UpdateInfoForm: React.FC = () => {
    return (
        <div className="update-info-form">Update</div>
    )
};

export default UpdateInfoForm;


// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import * as Yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";

// interface FormData {
//     nameArabic: string;
//     nameEnglish: string;
//     placeArabic: string;
//     placeEnglish: string;
//     dob: string;
//     nationalityFrom: string;
//     nationalityTo: string;
// }

// const validationSchema = Yup.object().shape({
//     nameChange: Yup.bool(),
//     nameArabic: Yup.string().when("nameChange", (nameChange, schema) =>
//         nameChange ? Yup.string().required() : schema
//     ), 
//     nameEnglish: Yup.string().when("nameChange", {
//         is: true,
//         then: Yup.string().required("Name in English is required"),
//     }),
//     placeArabic: Yup.string().when("placeOfBirthChange", {
//         is: true,
//         then: Yup.string()
//             .required("Place of Birth in Arabic is required")
//             .matches(/^[\u0600-\u06FF\s]*$/, "Please enter Arabic text only."),
//     }),
//     placeEnglish: Yup.string().when("placeOfBirthChange", {
//         is: true,
//         then: Yup.string().required("Place of Birth in English is required"),
//     }),
//     dob: Yup.string().when("dateOfBirthChange", {
//         is: true,
//         then: Yup.string().required("Date of Birth is required"),
//     }),
//     nationalityFrom: Yup.string().when("nationalityChange", {
//         is: true,
//         then: Yup.string().required("Current nationality is required"),
//     }),
//     nationalityTo: Yup.string().when("nationalityChange", {
//         is: true,
//         then: Yup.string().required("New nationality is required"),
//     }),
// });

// const UpdateInfoForm: React.FC = () => {
//     const [nameChange, setNameChange] = useState<boolean>(false);
//     const [placeOfBirthChange, setPlaceOfBirthChange] = useState(false);
//     const [dateOfBirthChange, setDateOfBirthChange] = useState(false);
//     const [nationalityChange, setNationalityChange] = useState(false);

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm<FormData>({
//         resolver: yupResolver(validationSchema),
//     });

//     const countries = [
//         "United Arab Emirates",
//         "Saudi Arabia",
//         "Jordan",
//         "Egypt",
//         "Lebanon",
//         "Kuwait",
//         "Qatar",
//         "Bahrain",
//         "Oman",
//         "Morocco",
//     ]; // Add more countries as needed

//     const onSubmit = (data: FormData) => {
//         console.log(data);
//     };

//     return (
//         <div className="p-4">
//             <h2 className="text-2xl font-bold mb-6">Form</h2>

//             <form onSubmit={handleSubmit(onSubmit)}>
//                 {/* Name Change */}
//                 <div className="mb-6">
//                     <label className="block font-semibold mb-2">
//                         Do You Want To Change Your Name?
//                     </label>
//                     <div className="flex items-center space-x-4 mb-2">
//                         <div className="aegov-check-item flex items-center">
//                             <input
//                                 id="changeNameYes"
//                                 type="radio"
//                                 name="nameChange"
//                                 value="yes"
//                                 checked={nameChange === true}
//                                 onChange={() => setNameChange(true)}
//                                 className="mr-2"
//                             />
//                             <label htmlFor="changeNameYes">Yes</label>
//                         </div>
//                         <div className="aegov-check-item flex items-center">
//                             <input
//                                 id="changeNameNo"
//                                 type="radio"
//                                 name="nameChange"
//                                 value="no"
//                                 checked={nameChange === false}
//                                 onChange={() => setNameChange(false)}
//                                 className="mr-2"
//                             />
//                             <label htmlFor="changeNameNo">No</label>
//                         </div>
//                     </div>

//                     {nameChange && (
//                         <div className="mt-2">
//                             <div className="aegov-form-control mb-2">
//                                 <label htmlFor="nameArabic">Name (Arabic)</label>
//                                 <div className="form-control-input">
//                                     <input
//                                         type="text"
//                                         id="nameArabic"
//                                         placeholder="اسمك"
//                                         {...register("nameArabic")}
//                                         className="block w-full p-2 border border-gray-300 rounded"
//                                     />
//                                     {errors.nameArabic && (
//                                         <p className="text-red-500 text-sm mt-1">
//                                             {errors.nameArabic.message}
//                                         </p>
//                                     )}
//                                 </div>
//                             </div>
//                             <div className="aegov-form-control">
//                                 <label htmlFor="nameEnglish">Name (English)</label>
//                                 <div className="form-control-input">
//                                     <input
//                                         type="text"
//                                         id="nameEnglish"
//                                         placeholder="Your name"
//                                         {...register("nameEnglish")}
//                                         className="block w-full p-2 border border-gray-300 rounded"
//                                     />
//                                     {errors.nameEnglish && (
//                                         <p className="text-red-500 text-sm mt-1">
//                                             {errors.nameEnglish.message}
//                                         </p>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 {/* Place of Birth Change */}
//                 <div className="mb-6">
//                     <label className="block font-semibold mb-2">
//                         Do You Want To Change Your Place Of Birth?
//                     </label>
//                     <div className="flex items-center space-x-4 mb-2">
//                         <div className="aegov-check-item flex items-center">
//                             <input
//                                 id="changePlaceYes"
//                                 type="radio"
//                                 name="placeChange"
//                                 value="yes"
//                                 checked={placeOfBirthChange === true}
//                                 onChange={() => setPlaceOfBirthChange(true)}
//                                 className="mr-2"
//                             />
//                             <label htmlFor="changePlaceYes">Yes</label>
//                         </div>
//                         <div className="aegov-check-item flex items-center">
//                             <input
//                                 id="changePlaceNo"
//                                 type="radio"
//                                 name="placeChange"
//                                 value="no"
//                                 checked={placeOfBirthChange === false}
//                                 onChange={() => setPlaceOfBirthChange(false)}
//                                 className="mr-2"
//                             />
//                             <label htmlFor="changePlaceNo">No</label>
//                         </div>
//                     </div>
//                     {placeOfBirthChange && (
//                         <div className="mt-2">
//                             <div className="aegov-form-control mb-2">
//                                 <label htmlFor="placeArabic">Place of Birth (Arabic)</label>
//                                 <div className="form-control-input">
//                                     <input
//                                         type="text"
//                                         id="placeArabic"
//                                         placeholder="مكان ولادتك"
//                                         {...register("placeArabic")}
//                                         className="block w-full p-2 border border-gray-300 rounded"
//                                     />
//                                     {errors.placeArabic && (
//                                         <p className="text-red-500 text-sm mt-1">
//                                             {errors.placeArabic.message}
//                                         </p>
//                                     )}
//                                 </div>
//                             </div>
//                             <div className="aegov-form-control">
//                                 <label htmlFor="placeEnglish">Place of Birth (English)</label>
//                                 <div className="form-control-input">
//                                     <input
//                                         type="text"
//                                         id="placeEnglish"
//                                         placeholder="Your place of birth"
//                                         {...register("placeEnglish")}
//                                         className="block w-full p-2 border border-gray-300 rounded"
//                                     />
//                                     {errors.placeEnglish && (
//                                         <p className="text-red-500 text-sm mt-1">
//                                             {errors.placeEnglish.message}
//                                         </p>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 {/* Date of Birth Change */}
//                 <div className="mb-6">
//                     <label className="block font-semibold mb-2">
//                         Do You Want To Change Your Date Of Birth?
//                     </label>
//                     <div className="flex items-center space-x-4 mb-2">
//                         <div className="aegov-check-item flex items-center">
//                             <input
//                                 id="changeDOBYes"
//                                 type="radio"
//                                 name="dobChange"
//                                 value="yes"
//                                 checked={dateOfBirthChange === true}
//                                 onChange={() => setDateOfBirthChange(true)}
//                                 className="mr-2"
//                             />
//                             <label htmlFor="changeDOBYes">Yes</label>
//                         </div>
//                         <div className="aegov-check-item flex items-center">
//                             <input
//                                 id="changeDOBNo"
//                                 type="radio"
//                                 name="dobChange"
//                                 value="no"
//                                 checked={dateOfBirthChange === false}
//                                 onChange={() => setDateOfBirthChange(false)}
//                                 className="mr-2"
//                             />
//                             <label htmlFor="changeDOBNo">No</label>
//                         </div>
//                     </div>
//                     {dateOfBirthChange && (
//                         <div className="mt-2">
//                             <div className="aegov-form-control">
//                                 <label htmlFor="dob">Date of Birth</label>
//                                 <div className="form-control-input">
//                                     <input
//                                         type="date"
//                                         id="dob"
//                                         {...register("dob")}
//                                         className="block w-full p-2 border border-gray-300 rounded"
//                                     />
//                                     {errors.dob && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 {/* Nationality Change */}
//                 <div className="mb-6">
//                     <label className="block font-semibold mb-2">
//                         Do You Want To Change Your Nationality?
//                     </label>
//                     <div className="flex items-center space-x-4 mb-2">
//                         <div className="aegov-check-item flex items-center">
//                             <input
//                                 id="changeNationalityYes"
//                                 type="radio"
//                                 name="nationalityChange"
//                                 value="yes"
//                                 checked={nationalityChange === true}
//                                 onChange={() => setNationalityChange(true)}
//                                 className="mr-2"
//                             />
//                             <label htmlFor="changeNationalityYes">Yes</label>
//                         </div>
//                         <div className="aegov-check-item flex items-center">
//                             <input
//                                 id="changeNationalityNo"
//                                 type="radio"
//                                 name="nationalityChange"
//                                 value="no"
//                                 checked={nationalityChange === false}
//                                 onChange={() => setNationalityChange(false)}
//                                 className="mr-2"
//                             />
//                             <label htmlFor="changeNationalityNo">No</label>
//                         </div>
//                     </div>
//                     {nationalityChange && (
//                         <div className="mt-2">
//                             <div className="aegov-form-control mb-2">
//                                 <label htmlFor="nationalityFrom">Nationality From</label>
//                                 <div className="form-control-input">
//                                     <select
//                                         id="nationalityFrom"
//                                         {...register("nationalityFrom")}
//                                         className="block w-full p-2 border border-gray-300 rounded"
//                                     >
//                                         {countries.map((country, index) => (
//                                             <option key={index} value={country}>
//                                                 {country}
//                                             </option>
//                                         ))}
//                                     </select>
//                                     {errors.nationalityFrom && (
//                                         <p className="text-red-500 text-sm mt-1">
//                                             {errors.nationalityFrom.message}
//                                         </p>
//                                     )}
//                                 </div>
//                             </div>
//                             <div className="aegov-form-control">
//                                 <label htmlFor="nationalityTo">Nationality To</label>
//                                 <div className="form-control-input">
//                                     <select
//                                         id="nationalityTo"
//                                         {...register("nationalityTo")}
//                                         className="block w-full p-2 border border-gray-300 rounded"
//                                     >
//                                         {countries.map((country, index) => (
//                                             <option key={index} value={country}>
//                                                 {country}
//                                             </option>
//                                         ))}
//                                     </select>
//                                     {errors.nationalityTo && (
//                                         <p className="text-red-500 text-sm mt-1">
//                                             {errors.nationalityTo.message}
//                                         </p>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 <button
//                     type="submit"
//                     className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
//                 >
//                     Submit
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default UpdateInfoForm;
