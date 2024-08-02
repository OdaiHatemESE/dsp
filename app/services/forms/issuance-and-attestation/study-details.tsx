
'use client'

import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from 'yup';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '@/store/lib/hooks';
import { setService } from '@/store/slices/serviceSlice';
import { ServiceForm, StudyDetailsForm } from '@/config/service.model';
import { useRouter } from "next/navigation";
import { useStepper } from '@/components/steper/stepperProvider';


const validationSchema = Yup.object().shape({
    plan: Yup.string(),
    Emirate: Yup.string().required('Emirate is required'),
    academicYear: Yup.string().required('Academic year is required'),
    schoolGrade: Yup.string().required('School grade is required'),
    schoolName: Yup.string().required('School name is required'),
    studentNumber: Yup.string(),
    comments: Yup.string(),
    MOFAIC: Yup.string().required('MOFAIC attestation choice is required'),
});

console.log(validationSchema);

interface params {
    serviceId: string
}

const StudyDetails: React.FC<params> = ({ serviceId }) => {
    const { nextStep, prevStep } = useStepper();
    const router = useRouter();

    const serviceState = useAppSelector((state) => state.service.service);
    console.log(serviceState);
    let updatedService = { ...serviceState, form: serviceState?.form ?? {} as StudyDetailsForm }
    console.log(updatedService.form)
    const dispath = useAppDispatch();


    const [formData, setFormData] = useState<StudyDetailsForm>({
        plan: updatedService.form.plan ?? "1",
        Emirate: updatedService.form.Emirate,
        academicYear: updatedService.form.academicYear,
        schoolGrade: updatedService.form.schoolGrade,
        schoolName: updatedService.form.schoolName,
        studentNumber: updatedService.form.studentNumber,
        comments: updatedService.form.comments,
        MOFAIC: updatedService.form.MOFAIC ?? 'No',
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: formData

    })




    const goPrevious = () => {
        prevStep();
    }


    const onSubmit = (data: any) => {
        // console.clear();
        // //  console.log('Form submitted:', data);
        const service = { ...serviceState, form: data } as ServiceForm;
        dispath(setService(service))
        setFormData(data);
        nextStep();
    };

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
                            value={"1"}
                            checked={formData.plan == "1"}
                            {...register('plan')} />
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
                            value={"2"}
                            checked={formData.plan == "2"}
                            {...register('plan')} />
                        <div>
                            <label htmlFor="hardCopy">Hard Copy</label>
                            <p id="hardCopy-description" className="text-sm text-gray-500 mt-1">
                                (You will receive the document as a hard copy and it will have additional charge 15 AED delivery)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {errors.plan && <span className='error-message'>{errors.plan.message}</span>}
            <hr className="mb-5 mt-5" />

            <h5>Study Details</h5>
            <p className="text-sm text-gray-500 mt-1">User Study Details</p>
            <div className="w-full mb-5">
                <div className={classNames({ "control-error": errors.Emirate }, 'aegov-form-control')} >
                    <label htmlFor="Emirate">Emirate</label>
                    <div className="form-control-input">
                        <select id="Emirate" {...register('Emirate')} >
                            <option value="">Select...</option>
                            <option value="option1">option 1</option>
                            <option value="option2">option 2</option>
                            <option value="option3">option 3</option>
                        </select>
                    </div>
                    {errors.Emirate && <span className='error-message'>{errors.Emirate.message}</span>}
                </div>
            </div>

            <div className="w-full mb-5">
                <div className={classNames({ "control-error": errors.academicYear }, 'aegov-form-control')}>
                    <label htmlFor="academicYear">Academic year</label>
                    <div className="form-control-input">
                        <select id="academicYear" {...register('academicYear')} >
                            <option value="">Select...</option>
                            <option value="option1">option 1</option>
                            <option value="option2">option 2</option>
                            <option value="option3">option 3</option>
                        </select>
                    </div>
                    {errors.academicYear && <span className='error-message'>{errors.academicYear.message}</span>}
                </div>
            </div>

            <div className="w-full mb-5">
                <div className={classNames({ "control-error": errors.schoolGrade }, 'aegov-form-control')} >
                    <label htmlFor="schoolGrade">School Grade</label>
                    <div className="form-control-input">
                        <select id="schoolGrade" {...register('schoolGrade')}  >
                            <option value="">Select...</option>
                            <option value="option1">option 1</option>
                            <option value="option2">option 2</option>
                            <option value="option3">option 3</option>
                        </select>
                    </div>
                    {errors.schoolGrade && <span className='error-message'>{errors.schoolGrade.message}</span>}
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
                        <input type="text" id="studentNumber" {...register('studentNumber')} />
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
                            {...register('comments')}
                            cols={10}
                            rows={10}
                            value={formData.comments}

                            placeholder="Example: I am submitting the application for a student who does not have an ID. I need a printed paper copy for use outside the country."
                        ></textarea>
                    </div>
                </div>
            </div>

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
                            value={formData.MOFAIC}
                            {...register('MOFAIC')}
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
                            value={formData.MOFAIC}
                            {...register('MOFAIC')}
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
            {errors.MOFAIC && <span>{errors.MOFAIC.message}</span>}

            <div className="w-full actions mt-10 flex flex-row justify-between flex-wrap">
                <button className="aegov-btn btn-lg" type="button" onClick={goPrevious}>

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
                <button className="aegov-btn btn-lg" type="submit">
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
        </form>
    )
}

export default StudyDetails;