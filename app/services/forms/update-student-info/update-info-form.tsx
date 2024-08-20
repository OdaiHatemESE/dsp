'use client'
import { useStepper } from "@/components/steper/stepperProvider";
import { ServiceForm, UpdateStudentForm } from "@/config/service.model";
import { useGeneralLookups } from "@/lookups/lookupService";
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { toast } from "react-toastify";
import { savaAsDraft } from "@/services/savaAsDraft";
import { setService } from "@/store/slices/serviceSlice";





const UpdateInfoForm: React.FC = () => {
    ///// START Shared Section Between All Services  /////
    const { nextStep, prevStep, addDynamicStep, removeStep } = useStepper();
    const serviceState = useAppSelector((state) => state.service.service);
    const emirateId = serviceState?.applicantInformation?.emiratesId
    const applicantId = serviceState?.applicantInformation?.id;
    let updatedService = { ...serviceState, form: serviceState?.form ?? {} as UpdateStudentForm }
    let { lookups, isLoading, isError } = useGeneralLookups();
    const nationality = lookups?.Nationality;
    console.log('first', updatedService.applicationId);
    const dispath = useAppDispatch();

    const [applicationId, setApplicationId] = useState();
    const [formData, setFormData] = useState<UpdateStudentForm>({
        requestForId: updatedService.form.requestForId ?? 1,
        isOriginalCertificate: updatedService.form.isOriginalCertificate,
        comment: updatedService.form.comment,
        oldNationalityId: updatedService.form.oldNationalityId,
        newNationalityId: updatedService.form.newNationalityId,
        oldNationalityAr: updatedService.form.oldNationalityAr,
        oldNationalityEn: updatedService.form.oldNationalityEn,
        changeName: updatedService.form.changeName ?? false,
        changeBirthOfDate: updatedService.form.changeBirthOfDate ?? false,
        changePlaceOfBirth: updatedService.form.changePlaceOfBirth ?? false,
        changeNationality: updatedService.form.changeNationality ?? false,
        haveEmiratesId: updatedService.form.haveEmiratesId,
        nameAr: updatedService.form.nameAr,
        nameEn: updatedService.form.nameEn,
        placeOfBirthAr: updatedService.form.placeOfBirthAr,
        placeOfBirthEn: updatedService.form.placeOfBirthEn,
        birthOfDate: updatedService.form.birthOfDate, // Using string to represent the date
        emiratesIDNumber: updatedService.form.emiratesIDNumber, // Assuming this might be a number or alphanumeric
        applicantId: updatedService.form.applicantId ?? applicantId,
        applicationId: updatedService.applicationId ?? applicationId,
    });


    const goPrevious = () => {
        prevStep();
    }

    const validationSchema = Yup.object().shape({
        changeName: Yup.bool(),
        changePlaceOfBirth: Yup.bool(),
        changeBirthOfDate: Yup.bool(),
        changeNationality: Yup.bool(),

        nameAr: Yup.string().nullable().test(
            'is-required-if-changeName-true',
            'Name in Arabic is required when changeName is true',
            function (value) {
                if (this.parent.changeName === true) {
                    return !!value; // Checks if value is not empty or null
                }
                return true; // No validation error if changeName is false
            }
        ),
        nameEn: Yup.string().nullable().test(
            'is-required-if-changeName-true',
            'Name in English is required when changeName is true',
            function (value) {
                if (this.parent.changeName === true) {
                    return !!value; // Checks if value is not empty or null
                }
                return true; // No validation error if changeName is false
            }
        ),
        placeOfBirthAr: Yup.string().nullable().test(
            'is-required-if-placeOfBirthAr-true',
            'Name in Arabic is required when changeName is true',
            function (value) {
                if (this.parent.changePlaceOfBirth === true) {
                    return !!value; // Checks if value is not empty or null
                }
                return true; // No validation error if changeName is false
            }
        ),
        placeOfBirthEn: Yup.string().nullable().test(
            'is-required-if-placeOfBirthEn-true',
            'Name in English is required when changeName is true',
            function (value) {
                if (this.parent.changePlaceOfBirth === true) {
                    return !!value; // Checks if value is not empty or null
                }
                return true; // No validation error if changeName is false
            }
        ),
        birthOfDate: Yup.string().nullable().test(
            'is-required-if-placeOfBirthEn-true',
            'changeBirthOfDate changeName is true',
            function (value) {
                if (this.parent.changeBirthOfDate === true) {
                    return !!value; // Checks if value is not empty or null
                }
                return true; // No validation error if changeName is false
            }
        ),
        oldNationalityId: Yup.string().nullable().test(
            'is-required-if-placeOfBirthAr-true',
            'Name in Arabic is required when changeName is true',
            function (value) {
                if (this.parent.changeNationality === true) {
                    return !!value; // Checks if value is not empty or null
                }
                return true; // No validation error if changeName is false
            }
        ),
        newNationalityId: Yup.string().nullable().test(
            'is-required-if-placeOfBirthEn-true',
            'Name in English is required when changeName is true',
            function (value) {
                if (this.parent.changeNationality === true) {
                    return !!value; // Checks if value is not empty or null
                }
                return true; // No validation error if changeName is false
            }
        ),
    });

    const { register, handleSubmit, getValues, formState: { errors }, setValue } = useForm<UpdateStudentForm>({
        resolver: yupResolver(validationSchema),
        defaultValues: formData

    })

    const onSubmit = (data: UpdateStudentForm, event: any) => {
        const buttonClicked = event.nativeEvent.submitter.name
        const service = { ...serviceState, form: data } as ServiceForm;

        dispath(setService(service))
        if (buttonClicked == 'next') {
            save();
            // nextStep();
        } else {
            prevStep();
        }

    };
    ///// Shared Section Between All Services END  /////
    useEffect(() => {
        setValue('birthOfDate', formData.birthOfDate);
        setValue('oldNationalityId', formData.oldNationalityId);
        setValue('newNationalityId', formData.newNationalityId);
 
  

    }, [updatedService])


    const save = async () => {
        // Capture the latest form values
        let data = getValues();
        if (applicationId != null) {
            data = { ...data, applicationId: applicationId }
        }
        updatedService = { ...updatedService, form: data }
        setFormData(data);
        const res = await savaAsDraft(updatedService, []);
        if (res) {
            setFormData((prev) => {
                return { ...prev, applicationId: res.id }
            })
            setApplicationId(res.id);
            updatedService = { ...updatedService, applicationId: res.id }
            dispath(setService(updatedService));
            toast.success('Draft saved Successfully:' + res.id);
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


    return (
        <div className="update-info-form">
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Name Change */}
                <div className="mb-6">
                    <label className="block font-semibold mb-2">
                        Do You Want To Change Your Name?
                    </label>
                    <div className="flex items-center space-x-4 mb-2">
                        <div className="aegov-check-item flex items-center">
                            <input
                                id="changeNameYes"
                                type="radio"
                                className="mr-2"
                                value="true"
                                {...register('changeName')}
                                checked={formData.changeName.toString() == "true"}
                                onChange={handleRadioChange}

                            />
                            <label htmlFor="changeNameYes">Yes</label>
                        </div>
                        <div className="aegov-check-item flex items-center">
                            <input
                                id="changeNameNo"
                                type="radio"
                                value="false"
                                {...register('changeName')}
                                checked={formData.changeName.toString() == "false"}
                                onChange={handleRadioChange}
                            />
                            <label htmlFor="changeNameNo">No</label>
                        </div>
                    </div>

                    {formData.changeName.toString() == "true" && (
                        <div className="mt-5">
                            <div className={classNames({ "control-error": errors.nameAr }, 'aegov-form-control mb-5')}>
                                <label htmlFor="nameAr">Name (Arabic)</label>
                                <div className="form-control-input">
                                    <input
                                        type="text"
                                        id="nameAr"
                                        placeholder="اسمك"
                                        {...register("nameAr")}

                                        className="block w-full p-2 border border-gray-300 rounded"
                                    />

                                </div>
                                {errors.nameAr && (
                                    <p className="error-message">
                                        {errors.nameAr.message}
                                    </p>
                                )}
                            </div>
                            <div className={classNames({ "control-error": errors.nameEn }, 'aegov-form-control')}>
                                <label htmlFor="nameEnglish">Name (English)</label>
                                <div className="form-control-input">
                                    <input
                                        type="text"
                                        id="nameEnglish"
                                        placeholder="Your name"
                                        {...register("nameEn")}
                                        className="block w-full p-2 border border-gray-300 rounded"
                                    />

                                </div>
                                {errors.nameEn && (
                                    <p className="error-message">
                                        {errors.nameEn.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                {/* Place of Birth Change */}
                <div className="mb-6">
                    <label className="block font-semibold mb-2">
                        Do You Want To Change Your Place Of Birth?
                    </label>
                    <div className="flex items-center space-x-4 mb-2">
                        <div className="aegov-check-item flex items-center">
                            <input
                                id="changePlaceYes"
                                type="radio"

                                value="true"
                                {...register('changePlaceOfBirth')}
                                checked={formData.changePlaceOfBirth.toString() == "true"}
                                onChange={handleRadioChange}
                                className="mr-2"
                            />
                            <label htmlFor="changePlaceYes">Yes</label>
                        </div>
                        <div className="aegov-check-item flex items-center">
                            <input
                                id="changePlaceNo"
                                type="radio"
                                value="false"
                                {...register('changePlaceOfBirth')}
                                checked={formData.changePlaceOfBirth.toString() == "false"}
                                onChange={handleRadioChange}
                                className="mr-2"
                            />
                            <label htmlFor="changePlaceNo">No</label>
                        </div>
                    </div>
                    {formData.changePlaceOfBirth.toString() == "true" && (
                        <div className="mt-2">
                            <div className={classNames({ "control-error": errors.placeOfBirthAr }, 'aegov-form-control mb-5')}>
                                <label htmlFor="placeArabic">Place of Birth (Arabic)</label>
                                <div className="form-control-input">
                                    <input
                                        type="text"
                                        id="placeOfBirthAr"
                                        placeholder="مكان ولادتك"
                                        {...register("placeOfBirthAr")}
                                        className="block w-full p-2 border border-gray-300 rounded"
                                    />

                                </div>
                                {errors.placeOfBirthAr && (
                                    <p className="error-message">
                                        {errors.placeOfBirthAr.message}
                                    </p>
                                )}
                            </div>
                            <div className={classNames({ "control-error": errors.placeOfBirthEn }, 'aegov-form-control')}>
                                <label htmlFor="placeEnglish">Place of Birth (English)</label>
                                <div className="form-control-input">
                                    <input
                                        type="text"
                                        id="placeOfBirthEn"
                                        placeholder="Your place of birth"
                                        {...register("placeOfBirthEn")}
                                        className="block w-full p-2 border border-gray-300 rounded"
                                    />

                                </div>
                                {errors.placeOfBirthEn && (
                                    <p className="error-message">
                                        {errors.placeOfBirthEn.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                {/* Date of Birth Change */}
                <div className="mb-6">
                    <label className="block font-semibold mb-2">
                        Do You Want To Change Your Date of Birth?
                    </label>
                    <div className="flex items-center space-x-4 mb-2">
                        <div className="aegov-check-item flex items-center">
                            <input
                                id="changeBirthYes"
                                type="radio"
                                value="true"
                                {...register('changeBirthOfDate')}
                                checked={formData.changeBirthOfDate.toString() == "true"}
                                onChange={handleRadioChange}
                                className="mr-2"
                            />
                            <label htmlFor="changeBirthYes">Yes</label>
                        </div>
                        <div className="aegov-check-item flex items-center">
                            <input
                                id="changeBirthNo"
                                type="radio"
                                value="false"
                                {...register('changeBirthOfDate')}
                                checked={formData.changeBirthOfDate.toString() == "false"}
                                onChange={handleRadioChange}
                                className="mr-2"
                            />
                            <label htmlFor="changeBirthNo">No</label>
                        </div>
                    </div>
                    {formData.changeBirthOfDate.toString() == "true" && (
                        <div className="mt-2">
                            <div className={classNames({ "control-error": errors.birthOfDate }, 'aegov-form-control')}>
                                <label htmlFor="birthOfDate">Date of Birth</label>
                                <div className="form-control-input">
                                    <input
                                        type="date"
                                        id="birthOfDate"
                                        {...register("birthOfDate")}
                                        className="block w-full p-2 border border-gray-300 rounded"
                                    />
                                </div>
                                {errors.birthOfDate && (
                                    <p className="error-message">
                                        {errors.birthOfDate.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                {/* Nationality Change */}
                <div className="mb-6">
                    <label className="block font-semibold mb-2">
                        Do You Want To Change Your Nationality?
                    </label>
                    <div className="flex items-center space-x-4 mb-2">
                        <div className="aegov-check-item flex items-center">
                            <input
                                id="changeNationalityYes"
                                type="radio"
                                value="true"
                                {...register('changeNationality')}
                                checked={formData.changeNationality.toString() == "true"}
                                onChange={handleRadioChange}
                                className="mr-2"
                            />
                            <label htmlFor="changeNationalityYes">Yes</label>
                        </div>
                        <div className="aegov-check-item flex items-center">
                            <input
                                id="changeNationalityNo"
                                type="radio"
                                value="false"
                                {...register('changeNationality')}
                                checked={formData.changeNationality.toString() == "false"}
                                onChange={handleRadioChange}
                                className="mr-2"
                            />
                            <label htmlFor="changeNationalityNo">No</label>
                        </div>
                    </div>
                    {formData.changeNationality.toString() == "true" && (
                        <div className="mt-5">
                            <div className={classNames({ "control-error": errors.oldNationalityId }, 'aegov-form-control mb-5')}>
                                <label htmlFor="oldNationalityId">Old Nationality</label>
                                <div className="form-control-input">
                                    <select
                                        id="oldNationalityId"
                                        {...register("oldNationalityId")}
                                        className="block w-full p-2 border border-gray-300 rounded"
                                    ><option value={""}>Please Select</option>

                                        {nationality?.map((nationality) => (
                                            <option key={nationality.id} value={nationality.id}>
                                                {nationality.titleEn}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {errors.oldNationalityId && (
                                    <p className="error-message">
                                        {errors.oldNationalityId.message}
                                    </p>
                                )}
                            </div>
                            <div className={classNames({ "control-error": errors.newNationalityId }, 'aegov-form-control')}>
                                <label htmlFor="newNationalityId">New Nationality</label>
                                <div className="form-control-input">
                                    <select
                                        id="newNationalityId"
                                        {...register("newNationalityId")}
                                        className="block w-full p-2 border border-gray-300 rounded">

                                        <option value={""}>Please Select</option>
                                        {nationality?.map((nationality) => (

                                            <option key={nationality.id} value={nationality.id}
                                            >
                                                {nationality.titleEn}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {errors.newNationalityId && (
                                    <p className="error-message">
                                        {errors.newNationalityId.message}
                                    </p>
                                )}
                            </div>

                        </div>
                    )}
                </div>
                {/* Actions */}
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
                        <button className="aegov-btn btn-lg" type="button" name="saveAsDraft"  >
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
        </div>
    )
};

export default UpdateInfoForm;