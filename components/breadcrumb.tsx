export default function Breadcrumbs() {
    return (
        <div className="mt-5 mb-5">
            <nav aria-label="Breadcrumb" className="aegov-breadcrumb with-seperator">
                <ol>
                    <li><a href="#">Home</a></li>
                    <li><a href="#" title="Media centre">Services</a></li>
                    <li><span aria-current="page">A really long page name that must be affected.</span></li>
                </ol>
            </nav>

        </div>
    );
}