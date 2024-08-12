
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
import Counter from '@/components/counter';


const validationSchema = Yup.object().shape({
    RequestTypeId: Yup.string(),
    NumberOfCopies:Yup.string(),
    EmirateSchoolId: Yup.string().required('Emirate is required'),
    AcademicYearId: Yup.string().required('Academic year is required'),
    GradeId: Yup.string().required('School grade is required'),
    SchoolName: Yup.string().required('School name is required'),
    SISNumber: Yup.string(),
    Comment: Yup.string(),
    IsMofaicAttested: Yup.boolean()
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
    const [count, setCount] = useState<number>();
 

    const [formData, setFormData] = useState<StudyDetailsForm>({
        RequestTypeId: updatedService.form.RequestTypeId ?? 1,
        NumberOfCopies: count ?? 0,
        EmirateSchoolId: updatedService.form.EmirateSchoolId,
        AcademicYearId: updatedService.form.AcademicYearId,
        GradeId: updatedService.form.GradeId,
        SchoolName: updatedService.form.SchoolName,
        SISNumber: updatedService.form.SISNumber,
        Comment: updatedService.form.Comment,
        IsMofaicAttested: updatedService.form.IsMofaicAttested ?? false,
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: formData

    })




    const goPrevious = () => {
        prevStep();
    }

    const handleCount = (count: number) => {
        console.log(count);
        setCount(count)
    }

    const handleClick = (event:any) =>{
    
            const id = event.target.id;
            console.log(id);
            switch (id) {
                case 'yesMOFAIC':
                     
                    setFormData((prev) => ({
                        ...prev,
                        IsMofaicAttested: true
                    }));
                    break;
                case 'noMOFAIC':
                    
                    setFormData((prev) => ({
                        ...prev,
                        IsMofaicAttested: false
                    }));
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
    const onSubmit = (data: any, event: any) => {
        // console.clear();
        // //  console.log('Form submitted:', data);
        const buttonClicked = event.nativeEvent.submitter.name
        const service = { ...serviceState, form: data } as ServiceForm;

        dispath(setService(service))
        setFormData(data);
        if (buttonClicked == 'next') {
            nextStep();
        } else {
            prevStep();
        }

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
                            aria-describedby= "softCopy-description"
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
                            <option value="">Select...</option>
                            <option value="option1">option 1</option>
                            <option value="option2">option 2</option>
                            <option value="option3">option 3</option>
                        </select>
                    </div>
                    {errors.EmirateSchoolId && <span className='error-message'>{errors.EmirateSchoolId.message}</span>}
                </div>
            </div>

            <div className="w-full mb-5">
                <div className={classNames({ "control-error": errors.AcademicYearId }, 'aegov-form-control')}>
                    <label htmlFor="academicYear">Academic year</label>
                    <div className="form-control-input">
                        <select id="academicYear" {...register('AcademicYearId')} >
                            <option value="">Select...</option>
                            <option value="option1">option 1</option>
                            <option value="option2">option 2</option>
                            <option value="option3">option 3</option>
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
                            <option value="">Select...</option>
                            <option value="option1">option 1</option>
                            <option value="option2">option 2</option>
                            <option value="option3">option 3</option>
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
                            checked={formData.IsMofaicAttested==true}
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
                            checked={formData.IsMofaicAttested==false}
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
            {errors.IsMofaicAttested && <span>{errors.IsMofaicAttested.message}</span>}

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
                <button className="aegov-btn btn-lg" type="submit" name="next">
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