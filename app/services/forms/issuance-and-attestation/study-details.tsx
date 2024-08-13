
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
    RequestTypeId: Yup.string(),
    NumberOfCopies: Yup.string(),
    EmirateSchoolId: Yup.string().required('Emirate is required'),
    AcademicYearId: Yup.string().required('Academic year is required'),
    GradeId: Yup.string().required('School grade is required'),
    SchoolName: Yup.string().required('School name is required'),
    SISNumber: Yup.string(),
    Comment: Yup.string(),
    IsMofaicAttested: Yup.bool(),
    DestinationCountryId: Yup.string().test(
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
    const emirateId = serviceState?.applicantInformation?.emiratesId
    const applicantId = serviceState?.applicantInformation?.id;
    let updatedService = { ...serviceState, form: serviceState?.form ?? {} as StudyDetailsForm }

    const dispath = useAppDispatch();
    const [count, setCount] = useState<number>();




    const { lookups, isLoading, isError } = useGeneralLookups();
    const { studentInfo, isLoadingInfo, isErrorInfo } = getStudentInfo(emirateId ?? '');


    const emirates = lookups?.Emirate;
    const schoolGrades = lookups?.Grade;
    const academicYearList = lookups?.AcademicYear;
    const moficCountriesList = lookups?.NationalityMofaic;


    console.log('RENDER -- - - - - - - - - - -- ')
    console.log(updatedService.form)

    const [formData, setFormData] = useState<StudyDetailsForm>({
        RequestTypeId: updatedService.form.RequestTypeId ?? 1,
        NumberOfCopies: count,
        EmirateSchoolId: updatedService.form.EmirateSchoolId,
        AcademicYearId: updatedService.form.AcademicYearId,
        GradeId: updatedService.form.GradeId,
        SchoolName: updatedService.form.SchoolName,
        SISNumber: updatedService.form.SISNumber,
        Comment: updatedService.form.Comment,
        IsMofaicAttested: updatedService.form.IsMofaicAttested ?? false,
        DestinationCountryId: updatedService.form.DestinationCountryId,
        SourceChannel: updatedService.form.SourceChannel,
        HouseNumber: updatedService.form.HouseNumber,
        ApplicationId: updatedService.form.ApplicationId,
        StreetNumber: updatedService.form.StreetNumber,
        IsLastStep: updatedService.form.IsLastStep,
        RegionId: updatedService.form.RegionId,
        RelationshipId: updatedService.form.RelationshipId,
        RequestForId: updatedService.requestForId,
        EmiratesIDNumber: updatedService.form.EmiratesIDNumber,
        PayButton: updatedService.form.PayButton ?? false,
        EmirateId: updatedService.form.EmirateId,
        ApplicantId: updatedService.form.ApplicantId ?? applicantId,
    });



    useEffect(() => {
        if (studentInfo && lookups) {
            // Handle student information if necessary
            console.log('effect')
            if (studentInfo.studentNumber) {
                let updatedFormData: StudyDetailsForm = {
                    ...formData,
                    SISNumber: formData.SISNumber ?? studentInfo.studentNumber,
                    EmirateSchoolId: formData.EmirateSchoolId ?? studentInfo.emirateId,
                    SchoolName: formData.SchoolName ?? studentInfo.schoolNameEn,
                    GradeId: formData.GradeId ?? studentInfo.gradeId
                };


                setValue('SISNumber', updatedFormData.SISNumber);
                setValue('EmirateSchoolId', updatedFormData.EmirateSchoolId);
                setValue('SchoolName', updatedFormData.SchoolName);
                setValue('GradeId', updatedFormData.GradeId);

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
        console.log('odai', data);
        // Update the formData state with the latest form values before saving
        const updatedService = { ...serviceState, form: data } as ServiceForm;
        dispath(setService(updatedService));

        const form = new FormData();

        // Append key-value pairs to the FormData object
        Object.keys(data).forEach((key) => {
            form.append(key, data[key]?.toString() || '');
        });

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
                            checked={formData.RequestTypeId == 1}
                            {...register('RequestTypeId')} />
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
                            checked={formData.RequestTypeId == 2}
                            {...register('RequestTypeId')} />
                        <div>
                            <label htmlFor="hardCopy">Hard Copy</label>
                            <p id="hardCopy-description" className="text-sm text-gray-500 mt-1">
                                (You will receive the document as a hard copy and it will have additional charge 15 AED delivery)
                            </p>
                            {formData.RequestTypeId == 2 && <Counter onCountChange={handleCount} />}
                        </div>
                    </div>
                </div>
            </div>
            {errors.RequestForId && <span className='error-message'>{errors.RequestForId.message}</span>}
            <hr className="mb-5 mt-5" />

            <h5>Study Details</h5>
            <p className="text-sm text-gray-500 mt-1">User Study Details</p>
            <div className="w-full mb-5">
                <div className={classNames({ "control-error": errors.EmirateSchoolId }, 'aegov-form-control')} >
                    <label htmlFor="Emirate">Emirate</label>
                    <div className="form-control-input">
                        <select id="Emirate" {...register('EmirateSchoolId')} >
                            <option value={''}>Please Select</option>
                            {emirates?.map((emr) => {
                                return <option key={emr.id} value={emr.id} >{emr.titleEn}</option>
                            })}
                        </select>
                    </div>
                    {errors.EmirateSchoolId && <span className='error-message'>{errors.EmirateSchoolId.message}</span>}
                </div>
            </div>

            <div className="w-full mb-5">
                <div className={classNames({ "control-error": errors.AcademicYearId }, 'aegov-form-control')}>
                    <label htmlFor="academicYear">Academic year</label>
                    <div className="form-control-input">
                        <select id="academicYear" {...register('AcademicYearId',
                            {
                                onChange(event) {
                                    const selectedValue = event.target.value;
                                    setFormData((prev)=>{
                                        return {...prev, AcademicYearId:selectedValue, AcademicYearName:selectedValue}
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
                    {errors.AcademicYearId && <span className='error-message'>{errors.AcademicYearId.message}</span>}
                </div>
            </div>

            <div className="w-full mb-5">
                <div className={classNames({ "control-error": errors.GradeId }, 'aegov-form-control')} >
                    <label htmlFor="schoolGrade">School Grade</label>
                    <div className="form-control-input">
                        <select id="schoolGrade" {...register('GradeId')}  >
                            <option value={''}>Please Select</option>
                            {schoolGrades?.map((grade) => {
                                return <option key={grade.id} value={grade.id}>{grade.titleEn}</option>

                            })}
                        </select>
                    </div>
                    {errors.GradeId && <span className='error-message'>{errors.GradeId.message}</span>}
                </div>
            </div>

            <div className="w-full mb-5">
                <div className={classNames({ "control-error": errors.SchoolName }, 'aegov-form-control')}>
                    <label htmlFor="schoolName">School Name</label>
                    <div className="form-control-input">
                        <input type="text" id="schoolName" {...register('SchoolName')} />
                    </div>
                    {errors.SchoolName && <span className='error-message'>{errors.SchoolName.message}</span>}
                </div>
            </div>

            <div className="w-full mb-5">
                <div className="aegov-form-control">
                    <label htmlFor="studentNumber">
                        Student Number <small className="text-gray-400">(Optional)</small>
                    </label>
                    <div className="form-control-input">
                        <input type="text" id="studentNumber" {...register('SISNumber')} />
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
                            {...register('Comment')}
                            cols={10}
                            rows={10}
                            value={formData.Comment}

                            placeholder="Example: I am submitting the application for a student who does not have an ID. I need a printed paper copy for use outside the country."
                        ></textarea>
                    </div>
                </div>
            </div>
                       
            {formData.RequestTypeId == 1 && showMofic && (
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
                                    checked={formData.IsMofaicAttested === true}
                                    {...register('IsMofaicAttested')}
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
                                    checked={formData.IsMofaicAttested === false}
                                    {...register('IsMofaicAttested')}
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
                    {formData.IsMofaicAttested && (
                        <div className="w-full mb-5">
                            <div className={classNames({ "control-error": errors.DestinationCountryId }, 'aegov-form-control')} >
                                <label htmlFor="schoolGrade">Select country to attest for</label>
                                <div className="form-control-input">
                                    <select id="schoolGrade" {...register('DestinationCountryId')}  >
                                        <option value={''}>Please Select</option>
                                        {moficCountriesList?.map((country) => (
                                            <option key={country.id} value={country.id}>{country.countryName}</option>
                                        ))}
                                    </select>
                                </div>
                                {errors.DestinationCountryId && <span className='error-message'>{errors.DestinationCountryId.message}</span>}
                            </div>
                        </div>
                    )}
                    {errors.IsMofaicAttested && <span>{errors.IsMofaicAttested.message}</span>}
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