
'use client'

import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from 'yup';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '@/store/lib/hooks';
import { setService } from '@/store/slices/serviceSlice';
import { ServiceForm, ServiceStep, StudyDetailsForm } from '@/config/service.model';
import { useRouter } from "next/navigation";
import { useStepper } from '@/components/steper/stepperProvider';
import Counter from '@/components/counter';
import { useGeneralLookups } from '@/lookups/lookupService';
import { getStudentInfo } from '@/services/getStudentInfo';
import Spinner from '@/components/spinner';
import fetchWithAuth from '@/services/fetchWithAuth';
import { UserProfile } from '@/config/user.modal';
import { savaAsDraft } from '@/services/savaAsDraft';
import { toast, ToastOptions } from 'react-toastify';
import ShippingAddress from '@/components/shipping-address';

const validationSchema = Yup.object().shape({
    requestTypeId: Yup.number(),
    numberOfCopies: Yup.number(),
    emirateSchoolId: Yup.string().required('Emirate is required'),
    academicYearId: Yup.number().required('Academic year is required'),
    gradeId: Yup.string().required('School grade is required'),
    schoolName: Yup.string().required('School name is required'),
    isMofaicAttested: Yup.bool(),
    destinationCountryId: Yup.number().nullable().test(
        'is-required-if-mofaic-attested',
        'Destination country is required when MOFAIC attestation is selected',
        function (value) {
            const { isMofaicAttested } = this.parent;
            if (isMofaicAttested) {
                return value !== null && value !== undefined; // Validate only if isMofaicAttested is true
            }
            return true; // No validation needed if isMofaicAttested is false
        }
    ),
});


interface params {
    serviceId: string
}

const StudyDetails: React.FC<params> = ({ serviceId }) => {
    
    const { nextStep, prevStep, addDynamicStep, removeStep } = useStepper();
    const router = useRouter();
    const serviceState = useAppSelector((state) => state.service.service); // Get Service State  
    const emirateId = serviceState?.applicantInformation?.emiratesId
    const applicantId = serviceState?.applicantInformation?.id;
    let updatedService = { ...serviceState, form: serviceState?.form ?? {} as StudyDetailsForm }
    const dispath = useAppDispatch();
    const [count, setCount] = useState<number>(updatedService.form.numberOfCopies ?? 0);
    const [loader, setLoader] = useState<boolean>(false);
    let { lookups, isLoading, isError } = useGeneralLookups();
    const { studentInfo, isLoadingInfo, isErrorInfo } = getStudentInfo(emirateId ?? '');
    const [showMofic, setshowMofic] = useState<boolean>(true);

    const emirates = lookups?.Emirate;
    const schoolGrades = lookups?.Grade;
    const academicYearList = lookups?.AcademicYear;
    const moficCountriesList = lookups?.NationalityMofaic;
   
    const [formData, setFormData] = useState<StudyDetailsForm>({
        requestTypeId: updatedService.form.requestTypeId ?? 1,
        numberOfCopies: updatedService.form.numberOfCopies,
        emirateId: updatedService.form.emirateSchoolId,
        emirateSchoolId: updatedService.form.emirateSchoolId ?? updatedService.form.emirateId,
        academicYearId: updatedService.form.academicYearId,
        gradeId: updatedService.form.gradeId,
        schoolName: updatedService.form.schoolName,
        sisNumber: updatedService.form.sisNumber,
        comment: updatedService.form.comment,
        isMofaicAttested: updatedService.form.isMofaicAttested ?? false,
        destinationCountryId: updatedService.form.destinationCountryId ?? null,
        sourceChannel: updatedService.form.sourceChannel,
        houseNumber: updatedService.form.houseNumber,
        applicationId: updatedService.applicationId,
        streetNumber: updatedService.form.streetNumber,
        isLastStep: updatedService.form.isLastStep,
        regionId: updatedService.form.regionId,
        relationshipId: updatedService.form.relationshipId,
        requestForId: updatedService.requestForId,
        emiratesIdNumber: updatedService.form.emiratesIdNumber,
        payButton: updatedService.form.payButton ?? false,
        applicantId: updatedService.form.applicantId ?? applicantId,
    });

    const { register, handleSubmit, getValues, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: formData

    })


    useEffect(() => {
        formData.numberOfCopies = count;
        if (studentInfo && lookups) {
            // Handle student information if necessary
            if (studentInfo.studentNumber) {
                let updatedFormData: StudyDetailsForm = {
                    ...formData,
                    sisNumber: formData.sisNumber ?? studentInfo.studentNumber,
                    emirateSchoolId: formData.emirateSchoolId ?? formData.emirateId ?? studentInfo.emirateId,
                    schoolName: formData.schoolName ?? studentInfo.schoolNameEn,
                    gradeId: formData.gradeId ?? studentInfo.gradeId
                };

                setCount(updatedFormData.numberOfCopies ?? 0)

                setValue('sisNumber', updatedFormData.sisNumber);
                setValue('emirateSchoolId', updatedFormData.emirateSchoolId);
                setValue('schoolName', updatedFormData.schoolName);
                setValue('gradeId', updatedFormData.gradeId);

                // Dispatch the updated service to the store
                const updatedService = { ...serviceState, form: updatedFormData } as ServiceForm;
                dispath(setService(updatedService));
            }
        }
    }, [studentInfo, lookups, count]);



   

    const goPrevious = () => {
        prevStep();
    }

    const handleCount = (count: number) => {
        setCount(count)
    }



    const save = async () => {
        // Capture the latest form values
        setLoader(true);
        let data = getValues();
        let isMofaicAttestedString = data.isMofaicAttested?.toString();
        let isMofaicAttestedBoolen: any = isMofaicAttestedString === 'true' ? true : isMofaicAttestedString === 'false' ? false : isMofaicAttestedString;
        // Update the formData state with the latest form values before saving
        data = { ...data, numberOfCopies: count, isMofaicAttested: isMofaicAttestedBoolen };
        let updatedService = { ...serviceState, form: data } as ServiceForm;
        dispath(setService(updatedService));
        const res = await savaAsDraft(updatedService, []);
        if (res) {
            setLoader(false);
            toast.success('Draft saved Successfully');

        }
        updatedService = { ...updatedService, applicationId: res.id }
        dispath(setService(updatedService));



    };

    const onSubmit = (data: any, event: any) => {
        const buttonClicked = event.nativeEvent.submitter.name
        const service = { ...serviceState, form: data } as ServiceForm;

        dispath(setService(service))
        if (buttonClicked == 'next') {
            save();
            nextStep();
        } else {
            prevStep();
        }

    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        console.log(value);
        setFormData((prev) => ({
            ...prev,
            [name]: value === 'true' ? true : value === 'false' ? false : value,
        }));
    };

 

   

    if (isLoading || isLoadingInfo) return <Spinner></Spinner>;
    if (isError || isErrorInfo) return <div>Error loading </div>;


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {loader && <Spinner></Spinner>}
            <h5>Request Type</h5>
            <p className="text-sm text-gray-500 mt-1">What type of document you request</p>
            <div className="flex flex-col md:flex-row justify-between">
                <div className="w-full mb-5 md:mb-0">
                    <div className="aegov-check-group">
                        <input
                            id="softCopy"
                            aria-describedby="softCopy-description"
                            type="radio"
                            value="1"
                            checked={formData.requestTypeId?.toString() === "1"}
                            {...register('requestTypeId')}
                            onChange={handleRadioChange} />
                        <div>
                            <label htmlFor="softCopy">Soft Copy</label>
                            <p id="softCopy-description" className="text-sm text-gray-500 mt-1">
                                (We will receive the attested certification online by your email)
                            </p>
                        </div>
                    </div>
                </div>

                <div className="w-full mb-5">
                    <div className="aegov-check-group">
                        <input
                            id="hardCopy"
                            aria-describedby="hardCopy-description"
                            type="radio"
                            value="2"
                            checked={formData.requestTypeId?.toString() === "2"}
                            {...register('requestTypeId')}
                            onChange={handleRadioChange}
                        />
                        <div>
                            <label htmlFor="hardCopy">Hard Copy</label>
                            <p id="hardCopy-description" className="text-sm text-gray-500 mt-1">
                                (You will receive the document as a hard copy and it will have additional charge 15 AED delivery)
                            </p>
                            {formData.requestTypeId == 2 && <Counter odai={count} onCountChange={handleCount} />}
                        </div>
                    </div>
                </div>
            </div>
            {errors.requestTypeId && <span className='error-message'>{errors.requestTypeId.message}</span>}
            <hr className="mb-5 mt-5" />

            <h5>Study Details</h5>
            <p className="text-sm text-gray-500 mt-1">User Study Details</p>
            <div className="w-full mb-5">
                <div className={classNames({ "control-error": errors.emirateSchoolId }, 'aegov-form-control')} >
                    <label htmlFor="Emirate">Emirate</label>
                    <div className="form-control-input">
                        <select id="Emirate" {...register('emirateSchoolId')} >
                            <option value={''}>Please Select</option>
                            {emirates?.map((emr) => {
                                return <option key={emr.id} value={emr.id} >{emr.titleEn}</option>
                            })}
                        </select>
                    </div>
                    {errors.emirateSchoolId && <span className='error-message'>{errors.emirateSchoolId.message}</span>}
                </div>
            </div>

            <div className="w-full mb-5">
                <div className={classNames({ "control-error": errors.academicYearId }, 'aegov-form-control')}>
                    <label htmlFor="academicYear">Academic year</label>
                    <div className="form-control-input">
                        <select id="academicYear" {...register('academicYearId',
                            {
                                onChange(event) {
                                    console.log('odai');
                                    const selectedValue = event.target.value;
                                    setFormData((prev) => {
                                        return { ...prev, academicYearId: selectedValue, AcademicYearName: selectedValue }
                                    })
                                    if (selectedValue > 96) {
                                        setshowMofic(true)
                                    } else {
                                        setshowMofic(false);
                                    }
                                },
                            }
                        )} >
                            <option value={''}>Please Select</option>
                            {academicYearList?.map((year) => {
                                return <option key={year.id} value={year.id}>{year.titleEn}</option>
                            })}
                        </select>

                    </div>
                    {errors.academicYearId && <span className='error-message'>{errors.academicYearId.message}</span>}
                </div>
            </div>

            <div className="w-full mb-5">
                <div className={classNames({ "control-error": errors.gradeId }, 'aegov-form-control')} >
                    <label htmlFor="schoolGrade">School Grade</label>
                    <div className="form-control-input">
                        <select id="schoolGrade" {...register('gradeId')}  >
                            <option value={''}>Please Select</option>
                            {schoolGrades?.map((grade) => {
                                return <option key={grade.id} value={grade.id}>{grade.titleEn}</option>

                            })}
                        </select>
                    </div>
                    {errors.gradeId && <span className='error-message'>{errors.gradeId.message}</span>}
                </div>
            </div>

            <div className="w-full mb-5">
                <div className={classNames({ "control-error": errors.schoolName }, 'aegov-form-control')}>
                    <label htmlFor="schoolName">School Name</label>
                    <div className="form-control-input">
                        <input type="text" id="schoolName" {...register('schoolName')} />
                    </div>
                    {errors.schoolName && <span className='error-message'>{errors.schoolName.message}</span>}
                </div>
            </div>

            <div className="w-full mb-5">
                <div className="aegov-form-control">
                    <label htmlFor="studentNumber">
                        Student Number <small className="text-gray-400">(Optional)</small>
                    </label>
                    <div className="form-control-input">
                        <input type="text" id="studentNumber" {...register('sisNumber')} />
                    </div>
                </div>
            </div>

            <div className="w-full mb-5">
                <div className="aegov-form-control">
                    <label htmlFor="comments">
                        Do you have additional comments? <small className="text-gray-400">(Optional)</small>
                    </label>
                    <div className="form-control-input">
                        <textarea
                            id="comments"
                            {...register('comment')}
                            cols={10}
                            rows={10}


                            placeholder="Example: I am submitting the application for a student who does not have an ID. I need a printed paper copy for use outside the country."
                        ></textarea>
                    </div>
                </div>
            </div>

            {formData.requestTypeId == 1 && showMofic && (
                <>
                    <hr className="mb-5 mt-5" />
                    <h5>Attest the academic certificate from MOFAIC</h5>
                    <p className="text-sm text-gray-500 mt-1">Do you want to attest the academic certificate from MOFAIC?</p>
                    <div className="flex flex-col md:flex-row justify-between">
                        <div className="w-full mb-5 md:mb-0">
                            <div className="aegov-check-group">
                                <input
                                    id="yesMOFAIC"
                                    aria-describedby="yesMOFAIC-description"
                                    type="radio"
                                    {...register('isMofaicAttested')}
                                    value={true}
                                    checked={formData.isMofaicAttested == true}
                                    onChange={handleRadioChange}


                                />
                                <div>
                                    <label htmlFor="yesMOFAIC">Yes</label>
                                    <p id="yesMOFAIC-description" className="text-sm text-gray-500 mt-1">
                                        (We will receive the attested certification online by your email)
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full mb-5">
                            <div className="aegov-check-group">
                                <input
                                    id="noMOFAIC"
                                    aria-describedby="noMOFAIC-description"
                                    type="radio"

                                    {...register('isMofaicAttested')}
                                    value={false}
                                    checked={formData.isMofaicAttested == false}
                                    onChange={handleRadioChange}
                                />
                                <div>
                                    <label htmlFor="noMOFAIC">No</label>
                                    <p id="noMOFAIC-description" className="text-sm text-gray-500 mt-1">
                                        (You will receive the document as a hard copy and it will have additional charge 15 AED delivery)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>


                    {formData.isMofaicAttested === true && (

                        <div className="w-full mb-5">

                            <div className={classNames({ "control-error": errors.destinationCountryId }, 'aegov-form-control')} >
                                <label htmlFor="schoolGrade">Select country to attest for</label>
                                <div className="form-control-input">
                                    <select id="schoolGrade" {...register('destinationCountryId')}  >
                                        <option value={''}>Please Select</option>
                                        {moficCountriesList?.map((country) => (
                                            <option key={country.id} value={country.id}>{country.countryName}</option>
                                        ))}
                                    </select>
                                </div>
                                {errors.destinationCountryId && <span className='error-message'>{errors.destinationCountryId.message}</span>}
                            </div>
                        </div>
                    )}
                    {errors.isMofaicAttested && <span>{errors.isMofaicAttested.message}</span>}
                </>
            )}

            <div className="w-full actions mt-10 flex flex-row justify-between flex-wrap">
                <button className="aegov-btn btn-lg" type="submit" name="prev" >

                    <svg
                        className="rtl:-scale-x-100 rotate-180"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 256"
                    >
                        <rect width="256" height="256" fill="none" />
                        <line
                            x1="40"
                            y1="128"
                            x2="216"
                            y2="128"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="16"
                        />
                        <polyline
                            points="144 56 216 128 144 200"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="16"
                        />
                    </svg>

                    Previous
                </button>
                <div>
                    <button className="aegov-btn btn-lg" type="button" name="saveAsDraft" onClick={save}>
                        Sava as draft

                    </button>
                    <button className="aegov-btn btn-lg ml-5" type="submit" name="next">
                        Next
                        <svg
                            className="rtl:-scale-x-100"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 256 256"
                        >
                            <rect width="256" height="256" fill="none" />
                            <line
                                x1="40"
                                y1="128"
                                x2="216"
                                y2="128"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="16"
                            />
                            <polyline
                                points="144 56 216 128 144 200"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="16"
                            />
                        </svg>
                    </button>

                </div>

            </div>
        </form>
    )
}

export default StudyDetails;