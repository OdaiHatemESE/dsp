import Breadcrumbs from "@/components/breadcrumb"

export default function innerLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <main className="container">
        <Breadcrumbs serviceId=""/>
        {children}
      </main>
    )
  }