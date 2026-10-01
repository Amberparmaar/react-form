// Initial shape of the shared form data
export const initialFormData = {
  personal: { fullName: "", email: "", phone: "", dob: "" },
  address: { country: "", city: "", address: "", postalCode: "" },
  additional: { gender: "", occupation: "", experience: "", about: "" },
};

export const STEPS = [
  {
    key: "personal",
    title: "Personal information",
    short: "Personal",
    fields: [
      { name: "fullName", label: "Full name", type: "text", placeholder: "Jane Doe" },
      { name: "email", label: "Email", type: "email", placeholder: "jane@example.com" },
      { name: "phone", label: "Phone number", type: "tel", placeholder: "+92 300 1234567" },
      { name: "dob", label: "Date of birth", type: "date" },
    ],
  },
  {
    key: "address",
    title: "Address information",
    short: "Address",
    fields: [
      { name: "country", label: "Country", type: "text", placeholder: "Pakistan" },
      { name: "city", label: "City", type: "text", placeholder: "Karachi" },
      { name: "address", label: "Address", type: "text", placeholder: "Street, house or flat number" },
      { name: "postalCode", label: "Postal code", type: "text", placeholder: "75500" },
    ],
  },
  {
    key: "additional",
    title: "Additional information",
    short: "Additional",
    fields: [
      {
        name: "gender",
        label: "Gender",
        type: "select",
        options: ["Female", "Male"],
      },
      { name: "occupation", label: "Occupation", type: "text", placeholder: "Software engineer" },
      {
        name: "experience",
        label: "Experience",
        type: "select",
        options: ["Less than 1 year", "1–3 years", "3–5 years", "5–10 years", "10+ years"],
      },
      { name: "about", label: "About yourself", type: "textarea", placeholder: "A few sentences about you…" },
    ],
  },
];

// Simple validation function for beginners
export function validateStep(stepKey, values) {
  const errors = {};

  // Find the step object
  let step;
  if (stepKey === "personal") step = STEPS[0];
  if (stepKey === "address") step = STEPS[1];
  if (stepKey === "additional") step = STEPS[2];

  // 1) Check if required fields are empty
  for (let i = 0; i < step.fields.length; i++) {
    const field = step.fields[i];
    const fieldValue = values[field.name];

    if (!fieldValue || fieldValue.trim() === "") {
      errors[field.name] = field.label + " is required.";
    }
  }

  // 2) Simple format checks for specific fields
  if (stepKey === "personal") {
    // Email check (simple includes check)
    if (!errors.email) {
      if (!values.email.includes("@") || !values.email.includes(".")) {
        errors.email = "Enter a valid email address.";
      }
    }

    // Phone check
    if (!errors.phone) {
      if (values.phone.length < 7 || values.phone.length > 15) {
        errors.phone = "Enter a valid phone number (7–15 digits).";
      }
    }

    // Date of birth check
    if (!errors.dob) {
      const selectedDate = new Date(values.dob);
      const today = new Date();
      if (selectedDate > today) {
        errors.dob = "Date of birth can't be in the future.";
      }
    }
  }

  if (stepKey === "additional") {
    // About length check
    if (!errors.about) {
      if (values.about.trim().length < 10) {
        errors.about = "Write at least 10 characters.";
      }
    }
  }

  return errors;
}