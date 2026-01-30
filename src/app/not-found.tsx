export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-medical-light">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-medical-primary mb-4">404</h1>
        <p className="text-xl text-medical-text mb-8">Page not found</p>
        <a
          href="/"
          className="bg-medical-primary text-white px-6 py-3 rounded-md hover:bg-medical-dark transition-colors inline-block"
        >
          Go back home
        </a>
      </div>
    </div>
  )
}
