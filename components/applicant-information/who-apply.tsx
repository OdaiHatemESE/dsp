const whoApply:React.FC = () =>{
    return(
        <div>
               <h5>To Whom Are You Applying For ?</h5>
            <p className="text-sm text-gray-500 mt-1">
                Please Choose for who you apply this service
            </p>
            <div className="flex flex-col md:flex-row justify-between">
                <div className="w-full mb-5 md:mb-0">
                    <div className="aegov-check-group">
                        <input
                            id="Me"
                            aria-describedby="me-description"
                            name="plan"
                            type="radio"
                        />
                        <div>
                            <label>Me</label>
                            <p id="me-description" className="text-sm text-gray-500 mt-1">
                                (We will use your personal info to apply for service)
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full mb-5">
                    <div className="aegov-check-group">
                        <input
                            id="another"
                            aria-describedby="another-description"
                            name="plan"
                            type="radio"
                        />
                        <div>
                            <label  >Another Person</label>
                            <p id="another-description" className="text-sm text-gray-500 mt-1">
                                (You will enter the emirate id of the person to whom the application
                                is submitted)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="mb-5 mt-5" />

        </div>
    )
}

export default whoApply;