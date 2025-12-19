import React, { useState } from "react";
import InputField from "../../../components/landingPage/TrainerRegister/InputField";
import InputRow from "../../../components/landingPage/TrainerRegister/InputRow";
import { Save, Plus, Trash2 } from "lucide-react";

import { addBulkFaqApi } from "../../../apis/adminApi";
import { showError, showSuccess } from "../../../utils/toastService";

const AddFaqforBot = () => {
  const [saving, setSaving] = useState(false);

  const [faqs, setFaqs] = useState([
    { question: "", answer: "" },
  ]);

  // ----------------------------
  // HANDLERS
  // ----------------------------
  const updateFaq = (index, key, value) => {
    const updated = [...faqs];
    updated[index][key] = value;
    setFaqs(updated);
  };

  const addFaqRow = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const removeFaqRow = (index) => {
    if (faqs.length === 1) return;
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  // ----------------------------
  // VALIDATION
  // ----------------------------
  const validateForm = () => {
    for (let i = 0; i < faqs.length; i++) {
      if (!faqs[i].question.trim() || faqs[i].question.length < 5) {
        showError(`FAQ ${i + 1}: Question is too short`);
        return false;
      }
      if (!faqs[i].answer.trim() || faqs[i].answer.length < 5) {
        showError(`FAQ ${i + 1}: Answer is too short`);
        return false;
      }
    }
    return true;
  };

  // ----------------------------
  // SUBMIT
  // ----------------------------
  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setSaving(true);

      const payload = {
        faqs: faqs.map((f) => ({
          question: f.question.trim(),
          answer: f.answer.trim(),
        })),
      };

      const res = await addBulkFaqApi(payload);

      showSuccess(
        res.message || `${faqs.length} FAQs added successfully!`
      );

      setFaqs([{ question: "", answer: "" }]);
    } catch (err) {
      showError(err?.message || "Failed to add FAQs");
    } finally {
      setSaving(false);
    }
  };

  // ----------------------------
  // UI
  // ----------------------------
  return (
    <div className="min-h-screen font-sans">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-800 text-dark mb-1">
          Add Multiple FAQs
        </h1>
        <p className="text-muted">
          Admin can add multiple chatbot FAQs at once.
        </p>
      </div>

      {/* Card */}
      <div className="bg-light p-8 rounded-2xl shadow-md border border-light animate-fade-in max-w-8xl">
        <div className="flex flex-col gap-8">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-light rounded-xl p-5 bg-offwhite relative"
            >
              <div className="absolute top-4 right-4">
                {faqs.length > 1 && (
                  <button
                    onClick={() => removeFaqRow(index)}
                    className="text-red hover-scale"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>

              <h3 className="text-sm font-700 text-muted mb-3">
                FAQ #{index + 1}
              </h3>

              <InputRow>
                <InputField
                  as="textarea"
                  label="Question"
                  placeholder="e.g. Yogshala kya hai?"
                  value={faq.question}
                  onChange={(e) =>
                    updateFaq(index, "question", e.target.value)
                  }
                />
              </InputRow>

              <InputRow>
                <InputField
                  as="textarea"
                  label="Answer"
                  placeholder="e.g. Yogshala ek yoga aur wellness platform hai..."
                  value={faq.answer}
                  onChange={(e) =>
                    updateFaq(index, "answer", e.target.value)
                  }
                />
              </InputRow>
            </div>
          ))}

          {/* Add More */}
          <button
            onClick={addFaqRow}
            className="btn btn-outline flex items-center gap-2 w-fit"
          >
            <Plus size={18} /> Add More FAQ
          </button>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={saving}
              className={`btn btn-primary flex items-center gap-2 ${
                saving ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {saving ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save size={18} />
              )}
              {saving
                ? "Saving FAQs..."
                : `Save ${faqs.length} FAQs`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFaqforBot;
