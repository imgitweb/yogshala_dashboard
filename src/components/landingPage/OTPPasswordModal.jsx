import React, { useState } from "react";
import InputField from "../../components/landingPage/TrainerRegister/InputField";
import { verifyOtp as apiVerifyOtp, resetPassword as apiResetPassword } from "../../apis/authApi";
import { useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../../utils/toastService";

const OTPPasswordModal = ({ visible, onClose, email, onPasswordReset }) => {
  // console.log("OTPPasswordModal email:", email);
  // console.log("OTPPasswordModal visible:", visible);
  // console.log("OTPPasswordModal onClose:", onClose);
  // console.log("OTPPasswordModal onPasswordReset:", onPasswordReset);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState(null);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
    const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState({ password: "", confirmPassword: "" });
  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(null);
  const [passwordLoading, setPasswordLoading] = useState(false);

  if (!visible) return null;


  // OTP input handlers
  const handleOtpChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtpArr = [...otp];
      newOtpArr[index] = value;
      setOtp(newOtpArr);

      if (value !== "" && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const verifyOtpHandler = async () => {
    if (!email) {
      setOtpError("Email not provided");
      showError("Email not provided");
      return;
    }

    if (otp.some((digit) => digit === "")) {
      setOtpError("Enter all 6 digits");
      showError("Enter all 6 digits");
      return;
    }

    try {
      setOtpLoading(true);
      setOtpError(null);

      const res = await apiVerifyOtp(email, otp.join(""));
      if (res?.success) {
        showSuccess("OTP verified successfully!");
        setOtpVerified(true); 
      } else {
        setOtpError(res?.message || "Invalid OTP");
        showError(res?.message || "Invalid OTP");
      }
    } catch (err) {
      setOtpError(err?.message || "Failed to verify OTP");
      showError(err?.message || "Failed to verify OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    setNewPassword({ ...newPassword, [e.target.name]: e.target.value });
  };

  const setPasswordHandler = async () => {
    if (!newPassword.password || !newPassword.confirmPassword) {
      setPasswordError("Fill all fields");
      showError("Fill all fields");
      return;
    }
    if (newPassword.password !== newPassword.confirmPassword) {
      setPasswordError("Passwords do not match");
      showError("Passwords do not match");
      return;
    }

    try {
      setPasswordLoading(true);
      setPasswordError(null);

      const res = await apiResetPassword(email, newPassword.password);
      // console.log("Password reset response:", res);
      if (res?.success) {
        setPasswordSuccess("Password successfully updated!");
        showSuccess("Password successfully updated!");
        onPasswordReset(res.message);
        setTimeout(() => {
        navigate("/auth");
      }, 500);
      } else {
        setPasswordError(res?.message || "Failed to reset password");
        showError(res?.message || "Failed to reset password");
      }
    } catch (err) {
      setPasswordError(err?.message || "Server error while resetting password");
      showError(err?.message || "Server error while resetting password");
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-200/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        {!otpVerified && (
          <>
            <h3 className="text-xl font-700 text-dark mb-4 text-center">Verify OTP</h3>
            <div className="flex justify-center gap-2 mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(e, index)}
                  maxLength={1}
                  className="w-10 h-10 text-center border rounded-md text-lg"
                  type="text"
                  inputMode="numeric"
                  disabled={otpLoading}
                />
              ))}
            </div>
            {otpError && <p className="text-red text-center mb-3">{otpError}</p>}
            <button
              onClick={verifyOtpHandler}
              className="btn btn-primary w-full py-2 hover-lift"
              disabled={otpLoading}
            >
              {otpLoading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {otpVerified && !passwordSuccess && (
          <>
            <h3 className="text-xl font-700 text-dark mb-4 text-center">Set New Password</h3>
            <InputField
              label="New Password"
              name="password"
              type="password"
              value={newPassword.password}
              onChange={handlePasswordChange}
              disabled={passwordLoading}
              required
            />
            <InputField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={newPassword.confirmPassword}
              onChange={handlePasswordChange}
              disabled={passwordLoading}
              required
            />
            {passwordError && <p className="text-red text-center mt-2">{passwordError}</p>}
            <button
              onClick={setPasswordHandler}
              className="btn btn-primary w-full py-2 mt-3 hover-lift"
              disabled={passwordLoading}
            >
              {passwordLoading ? "Updating..." : "Set Password"}
            </button>
          </>
        )}

        {passwordSuccess && <p className="text-green text-center mt-4">{passwordSuccess}</p>}
      </div>
    </div>
  );
};

export default OTPPasswordModal;
