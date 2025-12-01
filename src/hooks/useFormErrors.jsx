import { useRef } from "react";

export default function useFormErrors() {
  const errorRefs = useRef({});      // store input refs
  const errors = useRef({});         // store validation errors

  const setErrors = (newErrors) => {
    errors.current = newErrors;
  };

  // attach refs easily in JSX
  const registerErrorRef = (field) => (el) => {
    errorRefs.current[field] = el;
  };

  // scroll to first error automatically
  const scrollToFirstError = () => {
    const firstKey = Object.keys(errors.current)[0];
    if (!firstKey) return;

    const el = errorRefs.current[firstKey];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.focus?.();
    }
  };

  return {
    errors: errors.current,
    setErrors,
    registerErrorRef,
    scrollToFirstError,
  };
}
