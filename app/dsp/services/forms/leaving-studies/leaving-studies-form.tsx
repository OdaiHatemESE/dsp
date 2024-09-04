
'use client'

import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from 'yup';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '@/store/lib/hooks';
import { setService } from '@/store/slices/serviceSlice';
import { LeavingStuidesForm, ServiceForm, ServiceStep, StudyDetailsForm } from '@/config/service.model';
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
    RequestForId: Yup.number(),
    EmirateId: Yup.string().required('Emirate is required'),
    AcademicYearId: Yup.number().required('Academic year is required'),
    GradeId: Yup.string().required('School grade is required'),
    SchoolName: Yup.string().required('School name is required'),
    StudyPeriodId: Yup.string().required('StudyPeriod is required'),
});


interface params {
    serviceId: string
}

const LeavingStudies: React.FC<params> = ({ serviceId }) => {

    const { nextStep, prevStep, addDynamicStep, removeStep } = useStepper();
    const serviceState = useAppSelector((state) => state.service.service); // Get Service State  
    const emirateId = serviceState?.applicantInformation?.emiratesId
    const applicantId = serviceState?.applicantInformation?.id;
    let updatedService = { ...serviceState, form: serviceState?.form ?? {} as LeavingStuidesForm }

    console.log(updatedService);
    const dispath = useAppDispatch();

    const [loader, setLoader] = useState<boolean>(false);
    let { lookups, isLoading, isError } = useGeneralLookups();



    const emirates = lookups?.Emirate;
    const schoolGrades = lookups?.Grade;
    const academicYearList = lookups?.AcademicYear;
    const studyPeriod = lookups?.StudyPeriod;
    const [applicationId, setApplicationId] = useState();
    const [formData, setFormData] = useState<LeavingStuidesForm>({
        RequestForId: updatedService.requestForId ?? 1,
        EmirateId: updatedService.form.EmirateId ?? updatedService.form.emirate.id,
        AcademicYearId: updatedService.form.AcademicYearId ?? updatedService.form.academicYear.id,
        GradeId: updatedService.form.GradeId ?? updatedService.form.grade.id,
        SchoolName: updatedService.form.SchoolName ?? updatedService.form.schoolName,
        SISNumber: updatedService.form.SISNumber ?? updatedService.form.sisNumber,
        Comment: updatedService.form.Comment ?? updatedService.form.comment,
        StudyPeriodId: updatedService.form.StudyPeriodId ?? updatedService.form.studyPeriod.id,
        applicationId: updatedService.applicationId ?? applicationId,
        EmiratesIDNumber: updatedService.form.EmiratesIDNumber ?? updatedService.form.EmiratesIDNumber,
        ApplicantId: updatedService.form.ApplicantId ?? applicantId,
    });

    const { register, handleSubmit, getValues, formState: { errors }, setValue } = useForm<any>({
        resolver: yupResolver(validationSchema),
        defaultValues: formData

    })







    const goPrevious = () => {
        prevStep();
    }



    const save = async (): Promise<boolean> => {
        // Capture the latest form values
        try {
            setLoader(true);
            let data = getValues();
            if (applicationId != null) {
                data = { ...data, applicationId: applicationId };
            }
            let savedStatus = false;

            // Update the formData state with the latest form values before saving
            updatedService = { ...updatedService, form: data };
            console.log(updatedService);
            dispath(setService(updatedService));
            setFormData(data);


            const res = await savaAsDraft(updatedService, []);
            if (res) {
                setFormData((prev) => ({ ...prev, applicationId: res.id }));
                setApplicationId(res.id);
                data = { ...data, applicationId: res.id };
                updatedService = { ...updatedService, form: data, applicationId: res.id };
                dispath(setService(updatedService));

                toast.success('Draft saved Successfully:' + res.id);
                savedStatus = true;

            }
            return savedStatus;
        }
        catch (error) {
            toast.error('Failed to save draft. Please try again.');
            return false;
        }



    };

    const onSubmit = async (data: any, event: any) => {
        const buttonClicked = event.nativeEvent.submitter.name
        // const service = { ...serviceState, form: data } as ServiceForm;

        // dispath(setService(service))
        if (buttonClicked == 'next') {
            const saved = await save();
            if (saved) {
                nextStep();
            }

        } else {
            prevStep();
        }

    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value === 'true' ? true : value === 'false' ? false : value,
        }));
    };





    if (isLoading) return <Spinner></Spinner>;
    if (isError) return <div>Error loading </div>;


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {loader && <Spinner></Spinner>}


            <h5>Study Details</h5>
            <p className="text-sm text-gray-500 mt-1">User Study Details</p>
            <div className="w-full mb-5">
                <div className={classNames({ "control-error": errors.EmirateId }, 'aegov-form-control')} >
                    <label htmlFor="Emirate">Emirate</label>
                    <div className="form-control-input">
                        <select id="Emirate" {...register('EmirateId')} >
                            <option value={''}>Please Select</option>
                            {emirates?.map((emr) => {
                                return <option key={emr.id} value={emr.id} >{emr.titleEn}</option>
                            })}
                        </select>
                    </div>
                    {errors.EmirateId && <span className='error-message'>{errors.EmirateId.message}</span>}
                </div>
            </div>

            <div className="w-full mb-5">
                <div className={classNames({ "control-error": errors.AcademicYearId }, 'aegov-form-control')}>
                    <label htmlFor="academicYear">Academic year</label>
                    <div className="form-control-input">
                        <select id="academicYear" {...register('AcademicYearId')} >
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
                <div className={classNames({ "control-error": errors.StudyPeriodId }, 'aegov-form-control')} >
                    <label htmlFor="schoolGrade">Study Period</label>
                    <div className="form-control-input">
                        <select id="schoolGrade" {...register('StudyPeriodId')}  >
                            <option value={''}>Please Select</option>
                            {studyPeriod?.map((period) => {
                                return <option key={period.id} value={period.id}>{period.titleEn}</option>

                            })}
                        </select>
                    </div>
                    {errors.StudyPeriodId && <span className='error-message'>{errors.StudyPeriodId.message}</span>}
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


                            placeholder="Example: I am submitting the application for a student who does not have an ID. I need a printed paper copy for use outside the country."
                        ></textarea>
                    </div>
                </div>
            </div>


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

export default LeavingStudies;