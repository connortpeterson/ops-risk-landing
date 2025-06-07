import Footer from './Footer'

function SecurityPolicy() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white pb-16">
      <main className="max-w-md w-full space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-4">Security Policy</h1>
        <p className="text-gray-700 text-lg text-center">We take security seriously. Our current safeguards include:</p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Encryption of data in transit and at rest</li>
          <li>Regular vulnerability assessments and patch management</li>
          <li>Role-based access controls for all sensitive systems</li>
          <li>Continuous monitoring of infrastructure</li>
        </ul>
      </main>
      <Footer />
    </div>
  )
}

export default SecurityPolicy
