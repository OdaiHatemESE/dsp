import { UserProfile } from '@/config/user.modal';
import fetchWithAuth from '@/services/fetchWithAuth';
import { addSubProfile } from '@/services/userprofile';
import { verfiyMobile } from '@/services/verfiyEid';
import { useAppDispatch } from '@/store/lib/hooks';
import { setApplicant } from '@/store/slices/applicantSlice';
import React from 'react';
import { useState, useRef } from 'react';


interface params {
    eid: string,
    mobileNumber: string
    user?: UserProfile

}

const OTPForm: React.FC<params> = ({ eid, mobileNumber, user }) => {
    const [otp, setOtp] = useState(new Array(4).fill(''));
    const inputsRef = useRef([]);
    const dispatch = useAppDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string>();

    const handleChange = (element: any, index: any) => {
        const value = element.value.replace(/[^0-9]/g, ''); // Only allow digits
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to next input if a digit is entered
        if (value && index < otp.length - 1) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleBackspace = (element: any, index: any) => {
        if (!element.value && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        // Construct the OTP code from the inputs
        const otpCode = otp.join('');

        // Prepare the payload
        const payload = {
            emiratesId: eid,
            otpCode: otpCode,
            isMain: false,
        };

        try {
            // Send the POST request
            const response = await fetchWithAuth(
                'certificates/v1/OtpProfileActivation',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                }
            );

            // Check if the response is successful
            if (!response.ok) {
                throw new Error('Failed to validate OTP');
            }

            const data = await response.json();
            const subUser = await addSubProfile({ applicant: user ?? {} as any });
            dispatch(setApplicant(subUser.response ?? {} as UserProfile))

        } catch (error) {
            
            setError('Failed to validate OTP. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <section className='mt-5 w-50'>
            <p>Please Enter the OTP Number:</p>
            <form onSubmit={handleSubmit}>
                <div className="flex space-x-3 justify-center mb-4 w-50">
                    {otp.map((value, index) => (
                        <div className="aegov-form-control">
                            <div className='form-control-input'>
                                <input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    className="otp-input w-5 h-12 text-center text-lg border-2  border-width border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    value={value}
                                    onChange={(e) => handleChange(e.target, index)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Backspace') {
                                            handleBackspace(e.target, index);
                                        }
                                    }}
                                    ref={(el) => (inputsRef.current[index] = el)}
                                    disabled={isSubmitting}
                                />
                            </div></div>
                    ))}
                </div>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <button
                    type="submit"
                    className={`w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </section>
    )
};

export default OTPForm;
