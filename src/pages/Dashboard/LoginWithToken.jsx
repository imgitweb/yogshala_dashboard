import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, fetchUser, setUser } from "../../redux/slices/authSlice";

const LoginWithToken = () => {
  const [params] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  useEffect(() => {
    const urlToken = params.get("token");
    const localToken = localStorage.getItem("token");

    if (urlToken) {
      localStorage.setItem("token", urlToken);
      dispatch(setToken(urlToken));

      dispatch(fetchUser()).then((res) => {
        if (!res?.payload) {
          setError("Invalid or expired token.");
          return;
        }

        const user = res.payload;
        dispatch(setUser(user));

        redirectByRole(user.role);
      });

      return;
    }

    if (localToken) {
      dispatch(setToken(localToken));

      dispatch(fetchUser()).then((res) => {
        if (!res?.payload) {
          localStorage.removeItem("token");
          setError("Session expired. Please login again.");
          return;
        }

        const user = res.payload;
        dispatch(setUser(user));

        redirectByRole(user.role);
      });

      return;
    }

    window.location.href = import.meta.env.VITE_FRONTEND_URL;

  }, []);

  const redirectByRole = (role) => {
    if (role === "Student") navigate("/dashboard");
    else if (role === "Trainer") navigate("/trainer");
    else if (role === "Admin") navigate("/admin");
    else setError("Unauthorized access.");
  };

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-red-600 text-lg font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center text-lg font-semibold">
      Authenticating... Please wait.
    </div>
  );
};

export default LoginWithToken;
