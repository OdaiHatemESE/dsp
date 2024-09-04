'use client';


import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Step 1: Define Yup validation schema
const validationSchema = Yup.object().shape({
    rows: Yup.array()
        .of(
            Yup.object().shape({
                label: Yup.string().required('Label is required'),
                select1: Yup.string().required('Select 1 is required'),
                select2: Yup.string().required('Select 2 is required'),
                input: Yup.string().required('Input is required'),
            })
        )
        .min(1, 'At least one row is required')
        .max(12, 'No more than 12 rows are allowed'),
});

const AcademicSequenceCertificateForm = () => {
    // Step 2: Set up useForm with yupResolver
    const { control, handleSubmit, watch } = useForm({
        defaultValues: {
            rows: [{ label: '', select1: '', select2: '', input: '' }],
        },
        resolver: yupResolver(validationSchema),
    });

    // useFieldArray to dynamically manage rows
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'rows',
    });

    const onSubmit = (data) => {
        console.log('Form Data:', data);
        alert('done')
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-5 gap-5 p-5 items-end">
                {fields.map((field, index) => (
                    <React.Fragment key={field.id}>
                        <Controller
                            name={`rows[${index}].label`}
                            control={control}
                            render={({ field, fieldState }) => (
                                <>
                                    <div className="aegov-form-control">
                                        <label htmlFor="first_name">First Name</label>
                                        <div className="form-control-input">
                                            <input
                                                type="text"
                                                className={`border   ${fieldState.invalid ? 'border-red-500' : ''
                                                    }`}
                                                placeholder={`Label ${index + 1}`}
                                                {...field}
                                            />
                                            {fieldState.error && (
                                                <p className="text-red-500">{fieldState.error.message}</p>
                                            )}
                                        </div>
                                    </div>

                                </>
                            )}
                        />
                        <Controller
                            name={`rows[${index}].select1`}
                            control={control}
                            render={({ field, fieldState }) => (
                                <>

                                    <div className="aegov-form-control">
                                        <label htmlFor="opt1">Select an option</label>
                                        <div className="form-control-input">
                                            <select
                                                className={`   ${fieldState.invalid ? 'border-red-500' : ''
                                                    }`}
                                                {...field}
                                            >
                                                <option value="">Select an option</option>
                                                <option value="Option 1">Option 1</option>
                                                <option value="Option 2">Option 2</option>
                                            </select>
                                            {fieldState.error && (
                                                <p className="text-red-500">{fieldState.error.message}</p>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        />
                        <Controller
                            name={`rows[${index}].select2`}
                            control={control}
                            render={({ field, fieldState }) => (
                                <>

                                    <div className="aegov-form-control">
                                        <label htmlFor="opt1">Select an option</label>
                                        <div className="form-control-input">
                                            <select
                                                className={`   ${fieldState.invalid ? 'border-red-500' : ''
                                                    }`}
                                                {...field}
                                            >
                                                <option value="">Select an option</option>
                                                <option value="Option 1">Option 1</option>
                                                <option value="Option 2">Option 2</option>
                                            </select>
                                            {fieldState.error && (
                                                <p className="text-red-500">{fieldState.error.message}</p>
                                            )}
                                        </div>
                                    </div>

                                </>
                            )}
                        />
                        <Controller
                            name={`rows[${index}].input`}
                            control={control}
                            render={({ field, fieldState }) => (
                                <>
                                    <div className="aegov-form-control">
                                        <label htmlFor="first_name">First Name</label>
                                        <div className="form-control-input">
                                            <input
                                                type="text"
                                                className={`border rounded p-2 ${fieldState.invalid ? 'border-red-500' : ''
                                                    }`}
                                                placeholder={`Label ${index + 1}`}
                                                {...field}
                                            />
                                            {fieldState.error && (
                                                <p className="text-red-500">{fieldState.error.message}</p>
                                            )}
                                        </div>
                                    </div>

                                </>
                            )}
                        />
                       
                            <button
                                type="button"
                                className="h-12 w-full bg-red-500 text-white p-1 rounded hover:bg-blue-700"
                                onClick={() => remove(index)}
                                disabled={fields.length === 1}
                            >
                                Delete
                            </button>
                            

                       
                    </React.Fragment>
                    
                ))}
            </div>
            <button
                                type="button"
                                className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
                                onClick={() => append({ label: '', select1: '', select2: '', input: '' })}
                                disabled={fields.length >= 12}
                            >
                                Add Row
                            </button>
        </form>
    );
};



export default AcademicSequenceCertificateForm;
