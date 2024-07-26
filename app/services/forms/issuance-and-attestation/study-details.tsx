export default function StudyDetails() {
    return (
        <form>
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
                        />
                        <div>
                            <label htmlFor="">Soft Copy</label>
                            <p id="softCopy-description" className="text-sm text-gray-500 mt-1">
                                (We will recive the attesed certification online by your email)
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full mb-5">
                    <div className="aegov-check-group">
                        <input
                            id="hardCopy"
                            aria-describedby="hardCopy-description"
                            name="plan"
                            type="radio"
                        />
                        <div>
                            <label htmlFor="plan02">Hard Copy</label>
                            <p id="hardCopy-description" className="text-sm text-gray-500 mt-1">
                                (You will receive the document as a hard copy and it will have
                                additional charge 15 AED delivery)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="mb-5 mt-5" />

            <h5>Study Details</h5>
            <p className="text-sm text-gray-500 mt-1">User Study Details</p>

            <div className="w-full mb-5">
                <div className="aegov-form-control">
                    <label htmlFor="Emirate">Emirate</label>
                    <div className="form-control-input">
                        <select id="Emirate" name="Emirate">
                            <option>option 1</option>
                            <option>option 2</option>
                            <option>option 3</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="w-full mb-5">
                <div className="aegov-form-control">
                    <label htmlFor="academicYear">Academic year</label>
                    <div className="form-control-input">
                        <select id="academicYear" name="academicYear">
                            <option>option 1</option>
                            <option>option 2</option>
                            <option>option 3</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="w-full mb-5">
                <div className="aegov-form-control">
                    <label htmlFor="schoolGrade">School Grade</label>
                    <div className="form-control-input">
                        <select id="schoolGrade" name="schoolGrade">
                            <option>option 1</option>
                            <option>option 2</option>
                            <option>option 3</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="w-full mb-5">
                <div className="aegov-form-control">
                    <label htmlFor="schoolName">School Name</label>
                    <div className="form-control-input">
                        <input type="text" id="schoolName" name="schoolName" />
                    </div>
                </div>
            </div>
            <div className="w-full mb-5">
                <div className="aegov-form-control">
                    <label htmlFor="studentNumber"
                    >Student Number <small className="text-gray-400">(Optional)</small>
                    </label>
                    <div className="form-control-input">
                        <input type="text" id="studentNumber" name="studentNumber" />
                    </div>
                </div>
            </div>
            <div className="w-full mb-5">
                <div className="aegov-form-control">
                    <label htmlFor="comments"
                    >Do you have additional comments?
                        <small className="text-gray-400">(Optional)</small>
                    </label>
                    <div className="form-control-input">
                        <textarea id="comments" name="comments"
                            cols={10}
                            rows={10}
                            placeholder="Example: I am submitting the application for a student who does not have an ID. I need a printed paper copy for use outside the country."
                        ></textarea>
                    </div>
                </div>
            </div>
            <hr className="mb-5 mt-5" />
            <h5>Attest the academic certificate from MOFAIC</h5>
            <p className="text-sm text-gray-500 mt-1">Do you want to attest the academic certificate from MOFAIC?
                ?</p>
            <div className="flex flex-col md:flex-row justify-between">
                <div className="w-full mb-5 md:mb-0">
                    <div className="aegov-check-group">
                        <input
                            id="yesMOFAIC"
                            aria-describedby="yesMOFAIC-description"
                            name="plan"
                            type="radio"
                        />
                        <div>
                            <label htmlFor="">Yes</label>
                            <p id="yesMOFAIC-description" className="text-sm text-gray-500 mt-1">
                                (We will recive the attesed certification online by your email)
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full mb-5">
                    <div className="aegov-check-group">
                        <input
                            id="noMOFAIC"
                            aria-describedby="noMOFAIC-description"
                            name="plan"
                            type="radio"
                        />
                        <div>
                            <label htmlFor="plan02">No</label>
                            <p id="noMOFAIC-description" className="text-sm text-gray-500 mt-1">
                                (You will receive the document as a hard copy and it will have
                                additional charge 15 AED delivery)
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full actions mt-10 flex flex-row justify-end flex-wrap">
                <button className="aegov-btn btn-lg" type="button">
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