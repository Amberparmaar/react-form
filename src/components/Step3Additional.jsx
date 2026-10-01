import FormField from "./FormField";
import { STEPS } from "./formConfig";

export default function Step3Additional({ data, errors, onChange }) {
  const step = STEPS[2];
  return (
    <fieldset className="step">
      <legend>{step.title}</legend>
      <div className="grid">
        {step.fields.map((field) => (
          <FormField
            key={field.name}
            field={field}
            value={data[field.name]}
            error={errors[field.name]}
            onChange={onChange}
          />
        ))}
      </div>
    </fieldset>
  );
}