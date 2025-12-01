import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import InputField from "../../../components/landingPage/TrainerRegister/InputField";
import FullPageLoader from "../../../components/common/FullPageLoader";
import useFullPageLoader from "../../../hooks/useFullPageLoader";
import { showSuccess, showError } from "../../../utils/toastService";

const AdminLoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, token } = useSelector((state) => state.auth);
  const localToken = localStorage.getItem("token");

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [pageError, setPageError] = useState(null);

  const { loading: loaderVisible, showLoader, hideLoader } = useFullPageLoader();

  /* ---------------------------------------------
        🔥 Auto Redirect If Token Already Exists
  --------------------------------------------- */
  useEffect(() => {
    if (localToken) {
      navigate(`/auth/login-with-token?token=${localToken}`);
    }
  }, [localToken, navigate]);

  const handleInputChange = useCallback((key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setPageError("Please enter both email and password");
      showError("Please enter both email and password");
      return;
    }

    try {
      showLoader();

      const res = await dispatch(
        login({
          email: formData.email,
          password: formData.password,
        })
      ).unwrap();

      if (res.user.role !== "Admin") {
        showError("Only admins can log in here");
        return;
      }

      showSuccess("Admin login successful!");

      navigate(`/auth/login-with-token?token=${res.token}`);

    } catch (err) {
      const msg = err?.message || "Login failed";
      setPageError(msg);
      showError(msg);

    } finally {
      hideLoader();
    }
  };

  return (
    <div className="bg-offwhite py-16 flex items-center justify-center h-screen relative">

      <FullPageLoader visible={loaderVisible || loading} />

      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-dark">
            Admin <span className="text-primary">Login</span>
          </h1>
          <p className="text-muted mt-2">Access your admin dashboard securely.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <InputField
            id="email"
            label="Email Address"
            type="email"
            placeholder="admin@example.com"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />

          <InputField
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
          />

          <button
            type="submit"
            className="btn btn-primary w-full mt-6"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {pageError && (
            <p className="text-red text-center mt-3">{pageError}</p>
          )}
        </form>

        <div className="text-center mt-6 text-sm text-muted">
          <p>Only authorized admins can access this panel.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
