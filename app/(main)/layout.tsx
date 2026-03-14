import Navbar from "@/components/Navbar"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-[#141414] min-h-screen">
      <Navbar />
      {children}
    </div>
  )
}