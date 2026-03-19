import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">Rento</h2>
          <p className="text-sm leading-relaxed">
            Rento helps renters and owners connect seamlessly.
            Find verified rental properties with ease and confidence.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-indigo-400 cursor-pointer">Home</li>
            <li className="hover:text-indigo-400 cursor-pointer">Properties</li>
            <li className="hover:text-indigo-400 cursor-pointer">Blogs</li>
            <li className="hover:text-indigo-400 cursor-pointer">Login</li>
          </ul>
        </div>

        {/* Owner / Renter */}
        <div>
          <h3 className="text-white font-semibold mb-4">For Users</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-indigo-400 cursor-pointer">Become Owner</li>
            <li className="hover:text-indigo-400 cursor-pointer">Add Property</li>
            <li className="hover:text-indigo-400 cursor-pointer">My Properties</li>
            <li className="hover:text-indigo-400 cursor-pointer">Profile</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
          <div className="flex gap-4">
            <span className="social-icon"><FaFacebookF /></span>
            <span className="social-icon"><FaInstagram /></span>
            <span className="social-icon"><FaTwitter /></span>
            <span className="social-icon"><FaLinkedinIn /></span>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700 text-center py-4 text-sm text-slate-400">
        © {new Date().getFullYear()} Rento. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
