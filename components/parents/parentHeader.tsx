const ParentHeader: React.FC = () => {
    return (
        <header className=" shadow-md mb-10 py-1">
            <nav className="container bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                <div className="flex flex-wrap justify-between items-center flex-row-reverse">
                    <div className="flex justify-start items-center flex-row-reverse">
                        <a href="#" className="flex mr-4">
                            <img src="https://www.moe.gov.ae/SiteAssets/face%20lift/assets/images/moe-logo-ar.svg" className="mr-3 h-14" alt="MOE Logo" />
                        </a>
                    </div>
                    <div><a>تسجيل الخروج</a></div>
                </div>
            </nav>
        </header>
    );
}

export default ParentHeader;