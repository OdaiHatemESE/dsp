'use client';

import { useState } from 'react';

export default function StudyDetails() {
    const [formData, setFormData] = useState({
        plan: 1,
        emirate: '',
        academicYear: '',
        schoolGrade: '',
        schoolName: '',
        studentNumber: '',
        comments: '',
        mofaic: 'No'
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        const newErrors: any = {};

        if (!formData.plan) newErrors.plan = 'Request type is required';
        if (!formData.emirate) newErrors.emirate = 'Emirate is required';
        if (!formData.academicYear) newErrors.academicYear = 'Academic year is required';
        if (!formData.schoolGrade) newErrors.schoolGrade = 'School grade is required';
        if (!formData.schoolName) newErrors.schoolName = 'School name is required';
        if (!formData.mofaic) newErrors.mofaic = 'MOFAIC attestation choice is required';

        setErrors(newErrors);
        console.log(Object.keys(newErrors).length);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(validate())
        if (validate()) {
            console.log('Form submitted successfully', formData);
        } else {
            console.log('Form has errors');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h5>Request Type</h5>
            <p className="text-sm text-gray-500 mt-1">What type of document you request</p>
            <div className="flex flex-col md:flex-row justify-between">
                <div className="w-full mb-5 md:mb-0">
                    <div className="aegov-check-group">
                        <input
                            id="softCopy"
                            aria-describedby="softCopy-description"
                            name="plan"
                            type="radio"
                            value={formData.plan}
                            checked={formData.plan === 1}
                            onChange={handleChange}
                        />
                        <div>
                            <label htmlFor="softCopy">Soft Copy</label>
                            <p id="softCopy-description" className="text-sm text-gray-500 mt-1">
                                (We will receive the attested certification online by your email)
                            </p>
                        </div>
                    </div>
                    <div className="aegov-check-group">
                        <input
                            id="hardCopy"
                            aria-describedby="hardCopy-description"
                            name="plan"
                            type="radio"
                            value={formData.plan}
                            checked={formData.plan === 2}
                            onChange={handleChange}
                        />
                        <div>
                            <label htmlFor="hardCopy">Hard Copy</label>
                            <p id="hardCopy-description" className="text-sm text-gray-500 mt-1">
                                (You will receive the document as a hard copy and it will have
                                additional charge 15 AED delivery)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {errors.plan && <p className="text-red-500">{errors.plan}</p>}
            <hr className="mb-5 mt-5" />

            <h5>Study Details</h5>
            <p className="text-sm text-gray-500 mt-1">User Study Details</p>

            <div className="w-full mb-5">
                <div className="aegov-form-control">
                    <label htmlFor="Emirate">Emirate</label>
                    <div className="form-control-input">
                        <select id="Emirate" name="emirate" value={formData.emirate} onChange={handleChange}>
                            <option value="">Select an option</option>
                            <option value="option1">option 1</option>
                            <option value="option2">option 2</option>
                            <option value="option3">option 3</option>
                        </select>
                    </div>
                </div>
                {errors.emirate && <p className="text-red-500">{errors.emirate}</p>}
            </div>

            <div className="w-full mb-5">
                <div className="aegov-form-control">
                    <label htmlFor="academicYear">Academic year</label>
                    <div className="form-control-input">
                        <select id="academicYear" name="academicYear" value={formData.academicYear} onChange={handleChange}>
                            <option value="">Select an option</option>
                            <option value="option1">option 1</option>
                            <option value="option2">option 2</option>
                            <option value="option3">option 3</option>
                        </select>
                    </div>
                </div>
                {errors.academicYear && <p className="error-message">{errors.academicYear}</p>}
            </div>

            <div className="w-full mb-5">
                <div className="aegov-form-control control-error">
                    <label htmlFor="schoolGrade">School Grade</label>
                    <div className="form-control-input">
                        <select id="schoolGrade" name="schoolGrade" value={formData.schoolGrade} onChange={handleChange}>
                            <option value="">Select an option</option>
                            <option value="option1">option 1</option>
                            <option value="option2">option 2</option>
                            <option value="option3">option 3</option>
                        </select>
                    </div>
                    {errors.schoolGrade && <p className="error-message"><strong>Error:</strong>   <span>{errors.schoolGrade}</span> </p>}

                </div>

            </div>

            <div className="w-full mb-5">
                <div className="aegov-form-control">
                    <label htmlFor="schoolName">School Name</label>
                    <div className="form-control-input">
                        <input type="text" id="schoolName" name="schoolName" value={formData.schoolName} onChange={handleChange} />
                    </div>
                </div>
                {errors.schoolName && <p className="text-red-500">{errors.schoolName}</p>}
            </div>

            <div className="w-full mb-5">
                <div className="aegov-form-control">
                    <label htmlFor="studentNumber">Student Number <small className="text-gray-400">(Optional)</small></label>
                    <div className="form-control-input">
                        <input type="text" id="studentNumber" name="studentNumber" value={formData.studentNumber} onChange={handleChange} />
                    </div>
                </div>
            </div>

            <div className="w-full mb-5">
                <div className="aegov-form-control">
                    <label htmlFor="comments">Do you have additional comments? <small className="text-gray-400">(Optional)</small></label>
                    <div className="form-control-input">
                        <textarea id="comments" name="comments" cols={10} rows={10} value={formData.comments} onChange={handleChange}
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
                            name="mofaic"
                            type="radio"
                            value={formData.mofaic}
                            checked={formData.mofaic === 'yes'}
                            onChange={handleChange}
                        />
                        <div>
                            <label htmlFor="yesMOFAIC">Yes</label>
                            <p id="yesMOFAIC-description" className="text-sm text-gray-500 mt-1">
                                (We will receive the attested certification online by your email)
                            </p>
                        </div>
                    </div>
                    <div className="aegov-check-group">
                        <input
                            id="noMOFAIC"
                            aria-describedby="noMOFAIC-description"
                            name="mofaic"
                            type="radio"
                            value={formData.mofaic}
                            checked={formData.mofaic === 'No'}
                            onChange={handleChange}
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
            {errors.mofaic && <p className="text-red-500">{errors.mofaic}</p>}

            <div className="w-full actions mt-10 flex flex-row justify-end flex-wrap">
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
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="16"
                        />
                        <polyline
                            points="144 56 216 128 144 200"
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="16"
                        />
                    </svg>
                </button>
            </div>
        </form>
    );
}
