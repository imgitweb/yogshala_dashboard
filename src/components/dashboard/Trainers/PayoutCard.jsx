import React from "react";
import { Banknote } from "lucide-react";

const PayoutCard = ({ balance }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
    <div>
      <h3 className="font-semibold text-lg text-gray-800 mb-2">Request Payout</h3>
      <p className="text-sm text-gray-500 mb-6">Apne available balance ko bank account mein transfer karen.</p>
      <div className="bg-indigo-50 p-4 rounded-lg text-center mb-6">
        <p className="text-sm text-indigo-700 font-medium">Available Balance</p>
        <p className="text-4xl font-bold text-indigo-900 mt-1">₹{balance.toLocaleString("en-IN")}</p>
      </div>
    </div>
    <button className="w-full bg-indigo-500 text-white font-semibold py-3 rounded-lg hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2">
      <Banknote size={18} /> Request Payout
    </button>
  </div>
);

export default PayoutCard;
