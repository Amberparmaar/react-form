import { useState } from "react";
import Step1Personal from "./Step1Personal";
import Step2Address from "./Step2Address";
import Step3Additional from "./Step3Additional";
import Step4Review from "./Step4Review";
import Success from "./Success";
import { STEPS, initialFormData, validateStep } from "./formConfig";

export default function MultiStepForm() {
  
  const [formData, setFormData] = useState(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Field change handle karne ka aasan tarika
  const handleChange = (section, name, value) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [name]: value,
      },
    });

    // Error ko clear karna
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  // Next step par jaane ke liye
  const handleNext = () => {
    const stepKey = STEPS[currentStep].key;
    const stepErrors = validateStep(stepKey, formData[stepKey]);

    // Agar errors hain toh simple handle karein
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setErrors({});
    setCurrentStep(currentStep + 1);
  };

  // Previous step par jaane ke liye
  const handlePrevious = () => {
    setErrors({});
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Edit button par click karne se us step par wapas jana
  const handleEdit = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  // Form final Submit karna
  const handleSubmit = (e) => {
    e.preventDefault();

    // Agar last step (Review) par hain toh submit karo
    if (currentStep === 3) {
      setIsSubmitted(true);
    } else {
      handleNext();
    }
  };

  // Reset/Start New Form
  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
    setCurrentStep(0);
    setIsSubmitted(false);
  };

  // Agar submit ho chuka hai toh Success screen dikhao
  if (isSubmitted) {
    return <Success data={formData} onReset={handleReset} />;
  }

  return (
    <form className="card" onSubmit={handleSubmit} noValidate>
      <header className="card__header">
        <h1>Application form</h1>
        <ol className="stepper" aria-label="Progress">
          {[...STEPS.map((s) => s.short), "Review"].map((label, index) => (
            <li
              key={label}
              className={
                index === currentStep
                  ? "is-current"
                  : index < currentStep
                    ? "is-done"
                    : ""
              }
            >
              <span className="stepper__dot">
                {index < currentStep ? "✓" : index + 1}
              </span>
              <span className="stepper__label">{label}</span>
            </li>
          ))}
        </ol>
      </header>

      {/* Basic Step Display logic */}
      {currentStep === 0 && (
        <Step1Personal
          data={formData.personal}
          errors={errors}
          onChange={(name, value) => handleChange("personal", name, value)}
        />
      )}

      {currentStep === 1 && (
        <Step2Address
          data={formData.address}
          errors={errors}
          onChange={(name, value) => handleChange("address", name, value)}
        />
      )}

      {currentStep === 2 && (
        <Step3Additional
          data={formData.additional}
          errors={errors}
          onChange={(name, value) => handleChange("additional", name, value)}
        />
      )}

      {currentStep === 3 && <Step4Review data={formData} onEdit={handleEdit} />}

      {/* Form Action Buttons */}
      <div className="actions">
        <button
          type="button"
          className="btn"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          Previous
        </button>

        <button type="submit" className="btn btn--primary">
          {currentStep === 3 ? "Submit" : "Next"}
        </button>
      </div>
    </form>
  );
}
