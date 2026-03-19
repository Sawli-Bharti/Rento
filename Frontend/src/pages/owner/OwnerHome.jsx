import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaFileUpload, FaCheckCircle } from "react-icons/fa";
import { useAuth } from "../../resource";

function OwnerHome() {
  const navigate = useNavigate();
  
  return (
    <div className="bg-slate-50 min-h-screen">

      {/* ================= HERO SECTION ================= */}
      <section className="h-screen bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
          
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              List, Rent or Sell <br /> Your Property with Confidence
            </h1>
            <p className="mt-5 text-indigo-100 text-lg">
              Rento helps verified owners rent or sell properties faster with
              complete transparency and trust.
            </p>

            <div className="mt-8 flex gap-4 flex-wrap">
              <button
                onClick={() => navigate("/owner/signup")}
                className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50"
              >
                Start as Owner
              </button>
              
            </div>
          </div>

          {/* Right visual placeholder */}
          <div className="hidden md:block">
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur">
              <p className="text-xl font-semibold">
                ✔ Trusted by Renters & Buyers
              </p>
              <p className="mt-2 text-indigo-100">
                Verified owners • Secure listings • Faster deals
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-slate-800">
          How It Works
        </h2>
        <p className="text-center text-slate-500 mt-2">
          Get started in just 3 simple steps
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <FaHome className="text-indigo-600 text-4xl mx-auto" />
            <h3 className="mt-4 font-semibold text-lg">
              Become an Owner
            </h3>
            <p className="text-slate-500 text-sm mt-2">
              Create your owner account to start listing properties.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center">
            <FaFileUpload className="text-indigo-600 text-4xl mx-auto" />
            <h3 className="mt-4 font-semibold text-lg">
              Complete KYC
            </h3>
            <p className="text-slate-500 text-sm mt-2">
              Upload ID and property documents for verification.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center">
            <FaCheckCircle className="text-indigo-600 text-4xl mx-auto" />
            <h3 className="mt-4 font-semibold text-lg">
              List & Earn
            </h3>
            <p className="text-slate-500 text-sm mt-2">
              Rent or sell your property with verified leads.
            </p>
          </div>

        </div>
      </section>

      {/* ================= TRUST SECTION ================= */}
      <section className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-2xl font-bold text-indigo-600">100%</h3>
            <p className="text-slate-600 mt-1">Verified Owners</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-indigo-600">Fast</h3>
            <p className="text-slate-600 mt-1">Property Listing Approval</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-indigo-600">Secure</h3>
            <p className="text-slate-600 mt-1">Trusted by Renters</p>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-14 text-center">
          <h2 className="text-3xl font-bold">
            Ready to List Your Property?
          </h2>
          <p className="mt-3 text-indigo-100">
            Join verified owners and start earning today.
          </p>
          <button
            onClick={() => navigate("/owner/signup")}
            className="mt-6 bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50"
          >
            Add Property Now
          </button>
        </div>
      </section>

    </div>
  );
}

export default OwnerHome;
