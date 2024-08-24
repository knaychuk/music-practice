export default function ProtectedLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col items-center">
      {children}
    </div>
  )
}