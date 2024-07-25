export default function Steper() {
    return (
        <nav aria-label="Progress" className="aegov-step pb-9">
            <ol role="list" className="flex items-center justify-between">
                <li className="relative w-full step-completed">
                    <div className="step-connector" aria-hidden="true" x-description="Completed Step">
                        <div className="step-connector-state"></div>
                    </div>
                    <a href="#" className="step-badge">
                        <span className="step-text-below">Step 1</span>
                    </a>
                </li>
                <li className="relative w-full step-current">

                    <div className="step-connector" aria-hidden="true" x-description="Current Step">
                        <div className="step-connector-state"></div>
                    </div>
                    <a href="#" className="step-badge" aria-current="step">
                        2
                        <span className="step-text-below">Step 2</span>
                    </a>
                </li>
                <li className="relative step-upcoming">
                    <div className="step-connector" aria-hidden="true" x-description="Upcoming Step">
                        <div className="step-connector-state"></div>
                    </div>
                    <a href="#" className="step-badge">
                        3
                        <span className="step-text-below">Step 3</span>
                    </a>
                </li>
            </ol>
        </nav>

    );
}