
function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-800 p-6">
      <div className="text-center">
        <h1 className="text-3xl lg:text-6xl font-bold mb-6">
          Worried your next deal's IT/ops risk is hidden?
        </h1>
        <p className="prose prose-sm md:prose mb-8 mx-auto">
          Get a 1-page execution risk snapshot<br />in under 5 minutes.
        </p>
        <form className="space-y-6">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full max-w-xs md:max-w-md mx-auto px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="w-full md:w-auto mx-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
          >
            Continue
          </button>
        </form>
      </div>
    </section>
  )
}

export default HeroSection
