import Footer from "@/components/footer"
import Header from "@/components/header"


export default function eservicesLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="container">
        {children}
      </main>
      <Footer />
    </>
  )

}