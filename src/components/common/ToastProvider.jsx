// src/components/common/ToastProvider.jsx
import React from "react";
import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
  return (
    <Toaster
      position="top-left"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: {
          background: "var(--bg-primary)",   // Dark purple background
          color: "var(--text-white)",     // White text
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 600,
          borderRadius: "0.75rem",
          padding: "12px 16px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        },
        success: {
          iconTheme: {
            primary: "var(--accent-green)",
            secondary: "var(--text-white)",
          },
        },
        error: {
          iconTheme: {
            primary: "var(--accent-red)",
            secondary: "var(--text-white)",
          },
        },
      }}
    />
  );
};

export default ToastProvider;
