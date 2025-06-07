export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="font-serif text-xl font-bold text-white">BiotechOps</span>
            </div>
            <p className="text-sm">
              Institutional-grade biotech intelligence for sophisticated investors and analysts.
            </p>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  Risk Assessment
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Portfolio Analysis
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Market Intelligence
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  API Access
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  Research Reports
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Market Insights
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2024 BiotechOps. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
