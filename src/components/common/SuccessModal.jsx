import React from "react";

const SuccessModal = ({ open, onClose, email }) => {
  if (!open) return null;

  return (
   <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex justify-center items-center z-50">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 text-center relative animate-fadeIn">

        {/* Success Icon */}
        <div className="mx-auto mb-4 flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M5 13l4 4L19 7" />
          </svg>
        </div>
        {/* Registration Successful!
Thank you for signing up as a trainer on YogShala.ai.
We’ve captured your details, and our team will get back to you shortly.
Meanwhile, feel free to explore YogShala and stay inspired! */}




        <h2 className="text-2xl font-bold text-primary mb-2">
         Registration Successful! 🎉
        </h2>

        <p className="text-gray-600 mt-2 leading-relaxed">
          Thank you <strong>for signing up </strong> as a trainer on YogShala.ai.
          <br /><br />
          We’ve captured your details, and our team will get back to you shortly.
          <br />
          {/* <strong className="text-dark">{email}</strong> */}
          <br /><br />
        Meanwhile, feel free to explore YogShala and stay inspired!
        </p>

        <button
          onClick={onClose}
          className="mt-6 w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition">
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
