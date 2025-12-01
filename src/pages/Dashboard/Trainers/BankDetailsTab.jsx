import React, { useState, useEffect } from "react";

import { updateBankDetails } from "../../../apis/trainerApi"; // make sure this exists
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slices/authSlice";
import { getCurrentUser } from "../../../apis/authApi";
import { Edit, Save, X } from "lucide-react";

const BankDetailsTab = ({ data }) => {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [bankInfo, setBankInfo] = useState({
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
    upiId: "",
  });

  useEffect(() => {
    if (data) {
      setBankInfo({
        accountHolderName: data.accountHolderName || "",
        accountNumber: data.accountNumber || "",
        ifscCode: data.ifscCode || "",
        bankName: data.bankName || "",
        upiId: data.upiId || "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBankInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await updateBankDetails(bankInfo);
      const updatedTrainer = await getCurrentUser();
      dispatch(setUser(updatedTrainer));
      setBankInfo({
        accountHolderName: updatedTrainer.bank.accountHolderName || "",
        accountNumber: updatedTrainer.bank.accountNumber || "",
        ifscCode: updatedTrainer.bank.ifscCode || "",
        bankName: updatedTrainer.bank.bankName || "",
        upiId: updatedTrainer.bank.upiId || "",
      });
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update bank info:", err);
      alert("Failed to update bank info");
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-600 text-lg text-dark">Bank Account </h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-primary px-3 py-2 text-white rounded-full flex items-center gap-2 text-sm font-600 hover:bg-primary/80"
        >
          {isEditing ? (
            <>
              <X size={16} /> Cancel
            </>
          ) : (
            <>
              <Edit size={16} /> Edit
            </>
          )}
        </button>
      </div>

      <div className="bg-offwhite p-6 rounded-xl border border-light space-y-4">
        <div>
          <label className="text-xs font-500 text-muted">Account Holder Name</label>
          {isEditing ? (
            <input
              type="text"
              name="accountHolderName"
              value={bankInfo.accountHolderName}
              onChange={handleChange}
              className="w-full border border-light rounded-md p-2 text-dark"
            />
          ) : (
            <p className="text-dark font-600">{bankInfo.accountHolderName}</p>
          )}
        </div>

        <div>
          <label className="text-xs font-500 text-muted">Account Number</label>
          {isEditing ? (
            <input
              type="text"
              name="accountNumber"
              value={bankInfo.accountNumber}
              onChange={handleChange}
              className="w-full border border-light rounded-md p-2 text-dark"
            />
          ) : (
            <p className="text-dark font-600">{bankInfo.accountNumber}</p>
          )}
        </div>

        <div>
          <label className="text-xs font-500 text-muted">IFSC Code</label>
          {isEditing ? (
            <input
              type="text"
              name="ifscCode"
              value={bankInfo.ifscCode}
              onChange={handleChange}
              className="w-full border border-light rounded-md p-2 text-dark"
            />
          ) : (
            <p className="text-dark font-600">{bankInfo.ifscCode}</p>
          )}
        </div>

        <div>
          <label className="text-xs font-500 text-muted">Bank Name</label>
          {isEditing ? (
            <input
              type="text"
              name="bankName"
              value={bankInfo.bankName}
              onChange={handleChange}
              className="w-full border border-light rounded-md p-2 text-dark"
            />
          ) : (
            <p className="text-dark font-600">{bankInfo.bankName}</p>
          )}
        </div>

        <div>
          <label className="text-xs font-500 text-muted">UPI ID</label>
          {isEditing ? (
            <input
              type="text"
              name="upiId"
              value={bankInfo.upiId}
              onChange={handleChange}
              className="w-full border border-light rounded-md p-2 text-dark"
            />
          ) : (
            <p className="text-dark font-600">{bankInfo.upiId}</p>
          )}
        </div>

        {isEditing && (
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSave}
              className="btn btn-primary flex items-center gap-2"
            >
              <Save size={16} /> Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BankDetailsTab;
