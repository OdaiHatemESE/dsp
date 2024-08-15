
'use client'

import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from 'yup';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '@/store/lib/hooks';
import { setService } from '@/store/slices/serviceSlice';
import { ServiceForm, StudyDetailsForm } from '@/config/service.model';
import { useRouter } from "next/navigation";
import { useStepper } from '@/components/steper/stepperProvider';
import Counter from '@/components/counter';
import { useGeneralLookups } from '@/lookups/lookupService';
import { getStudentInfo } from '@/services/getStudentInfo';
import Spinner from '@/components/spinner';
import fetchWithAuth from '@/services/fetchWithAuth';
import { UserProfile } from '@/config/user.modal';

const validationSchema = Yup.object().shape({
    requestTypeId: Yup.string(),
    numberOfCopies: Yup.string(),
    emirateId: Yup.string().required('Emirate is required'),
    academicYearId: Yup.string().required('Academic year is required'),
    gradeId: Yup.string().required('School grade is required'),
    schoolName: Yup.string().required('School name is required'),
    sisNumber: Yup.string(),
    comment: Yup.string(),
    isMofaicAttested: Yup.bool(),
    destinationCountryId: Yup.string().test(
        'is-required-if-mofaic-attested',
        'Destination country is required when MOFAIC attestation is selected',
        function (value) {
            const { IsMofaicAttested } = this.parent;
            if (IsMofaicAttested) {
                return !!value; // Return true if value is provided, false otherwise
            }
            return true; // No validation needed if IsMofaicAttested is false
        }
    ),
});



interface params {
    serviceId: string
}

const StudyDetails: React.FC<params> = ({ serviceId }) => {
    const { nextStep, prevStep } = useStepper();
    const router = useRouter();


    const serviceState = useAppSelector((state) => state.service.service); // Get Service State  
    console.log(serviceState?.form);
    const emirateId = serviceState?.applicantInformation?.emiratesId
    const applicantId = serviceState?.applicantInformation?.id;
    alert(applicantId)
    let updatedService = { ...serviceState, form: serviceState?.form ?? {} as StudyDetailsForm }

    
    const dispath = useAppDispatch();
    const [count, setCount] = useState<number>();




    const { lookups, isLoading, isError } = useGeneralLookups();
    const { studentInfo, isLoadingInfo, isErrorInfo } = getStudentInfo(emirateId ?? '');


    const emirates = lookups?.Emirate;
    const schoolGrades = lookups?.Grade;
    const academicYearList = lookups?.AcademicYear;
    const moficCountriesList = lookups?.NationalityMofaic;
   
 
    const [formData, setFormData] = useState<StudyDetailsForm>({
        
        requestTypeId: updatedService.form.requestTypeId ?? 1,
        numberOfCopies: updatedService.form.numberOfCopies  ,
        emirateId: updatedService.form.emirateId,
        academicYearId: updatedService.form.academicYearId,
        gradeId: updatedService.form.gradeId,
        schoolName: updatedService.form.schoolName,
        sisNumber: updatedService.form.sisNumber,
        comment: updatedService.form.comment,
        isMofaicAttested: updatedService.form.isMofaicAttested ?? false,
        destinationCountryId: updatedService.form.destinationCountryId,
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



    useEffect(() => {
        if (studentInfo && lookups) {
            // Handle student information if necessary
           
            if (studentInfo.studentNumber) {
                let updatedFormData: StudyDetailsForm = {
                    ...formData,
                    sisNumber: formData.sisNumber ?? studentInfo.studentNumber,
                    emirateId: formData.emirateId ?? studentInfo.emirateId,
                    schoolName: formData.schoolName ?? studentInfo.schoolNameEn,
                    gradeId: formData.gradeId ?? studentInfo.gradeId
                };


                setValue('sisNumber', updatedFormData.sisNumber);
                setValue('emirateId', updatedFormData.emirateId);
                setValue('schoolName', updatedFormData.schoolName);
                setValue('gradeId', updatedFormData.gradeId);

                // Dispatch the updated service to the store
                const updatedService = { ...serviceState, form: updatedFormData } as ServiceForm;
                dispath(setService(updatedService));
            }
        }
    }, [studentInfo, lookups]);


     



    const [IsMofaicAttested, setIsMofaicAttested] = useState<boolean>(false);
    const [showMofic,setshowMofic]=useState<boolean>(true);
    const { register, handleSubmit, getValues, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: formData

    })




    const goPrevious = () => {
        prevStep();
    }

    const handleCount = (count: number) => {

        setCount(count)
    }

    const handleClick = (event: any) => {

        const id = event.target.id;

        switch (id) {
            case 'yesMOFAIC':

                setFormData((prev) => ({
                    ...prev,
                    IsMofaicAttested: true
                }));
                setIsMofaicAttested(true)
                break;
            case 'noMOFAIC':

                setFormData((prev) => ({
                    ...prev,
                    IsMofaicAttested: false
                }));
                setIsMofaicAttested(false)
                break;
            case 'softCopy':

                setFormData((prev) => ({
                    ...prev,
                    RequestTypeId: 1
                }));
                break;
            case 'hardCopy':

                setFormData((prev) => ({
                    ...prev,
                    RequestTypeId: 2
                }));
                break;
            default:
                break;
        }


    }

    const savaAsDraft = async () => {
        // Capture the latest form values
        const data = getValues();
       
        // Update the formData state with the latest form values before saving
        const updatedService = { ...serviceState, form: data } as ServiceForm;
        dispath(setService(updatedService));

        const form = new FormData();
       /// form.append('applicationId', data.applicationId || '');
        // Append key-value pairs to the FormData object
        Object.keys(data).forEach((key) => {
            form.append(key, data[key]?.toString() || '');
            
        });
        console.log(data);

     
        try {
            const response = await fetchWithAuth('certificates/v1/SaveAsDraft', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
                body: form,
            });

            if (!response.ok) {
                throw new Error('Failed to post data');
            }

            const result = await response.json();
            console.log('Data posted successfully:', result);
        } catch (error) {
            console.error('Error saving draft:', error);
        }
    };

    const onSubmit = (data: any, event: any) => {

        const buttonClicked = event.nativeEvent.submitter.name
        const service = { ...serviceState, form: data } as ServiceForm;

        dispath(setService(service))
        if (buttonClicked == 'next') {
            nextStep();
        } else {
            prevStep();
        }

    };


    if (isLoading || isLoadingInfo) return <Spinner></Spinner>;
    if (isError || isErrorInfo) return <div>Error loading </div>;


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h5>Request Type</h5>
            <p className="text-sm text-gray-500 mt-1">What type of document you request</p>
            <div className="flex flex-col md:flex-row justify-between">
                <div className="w-full mb-5 md:mb-0">
                    <div className="aegov-check-group">
                        <input
                            id="softCopy"
                            aria-describedby="softCopy-description"
                            type="radio"
                            value={1}
                            onClick={handleClick}
                            checked={formData.requestTypeId == 1}
                            {...register('requestTypeId')} />
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
                            value={2}
                            onClick={handleClick}
                            checked={formData.requestTypeId == 2}
                            {...register('requestTypeId')} />
                        <div>
                            <label htmlFor="hardCopy">Hard Copy</label>
                            <p id="hardCopy-description" className="text-sm text-gray-500 mt-1">
                                (You will receive the document as a hard copy and it will have additional charge 15 AED delivery)
                            </p>
                            {formData.requestTypeId == 2 && <Counter onCountChange={handleCount} />}
                        </div>
                    </div>
                </div>
            </div>
            {errors.requestTypeId && <span className='error-message'>{errors.requestTypeId.message}</span>}
            <hr className="mb-5 mt-5" />

            <h5>Study Details</h5>
            <p className="text-sm text-gray-500 mt-1">User Study Details</p>
            <div className="w-full mb-5">
                <div className={classNames({ "control-error": errors.emirateId }, 'aegov-form-control')} >
                    <label htmlFor="Emirate">Emirate</label>
                    <div className="form-control-input">
                        <select id="Emirate" {...register('emirateId')} >
                            <option value={''}>Please Select</option>
                            {emirates?.map((emr) => {
                                return <option key={emr.id} value={emr.id} >{emr.titleEn}</option>
                            })}
                        </select>
                    </div>
                    {errors.emirateId && <span className='error-message'>{errors.emirateId.message}</span>}
                </div>
            </div>

            <div className="w-full mb-5">
                <div className={classNames({ "control-error": errors.academicYearId }, 'aegov-form-control')}>
                    <label htmlFor="academicYear">Academic year</label>
                    <div className="form-control-input">
                        <select id="academicYear" {...register('academicYearId',
                            {
                                onChange(event) {
                                    const selectedValue = event.target.value;
                                    setFormData((prev)=>{
                                        return {...prev, academicYearId:selectedValue, AcademicYearName:selectedValue}
                                    })
                                    if(selectedValue>96){
                                        setshowMofic(true)
                                    }else{
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
                            value={formData.comment}

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
                                    value={true}
                                    onClick={handleClick}
                                    checked={formData.isMofaicAttested === true}
                                    {...register('isMofaicAttested')}
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
                                    onClick={handleClick}
                                    value={false}
                                    checked={formData.isMofaicAttested === false}
                                    {...register('isMofaicAttested')}
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
                    {formData.isMofaicAttested && (
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
                    <button className="aegov-btn btn-lg" type="button" name="saveAsDraft" onClick={savaAsDraft}>
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