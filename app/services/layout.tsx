import Breadcrumbs from "@/components/breadcrumb";
import Steper from "@/components/steper";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (

        <section className="container">
            <Breadcrumbs />
            <Steper />
            {children}
        </section>
    );
}