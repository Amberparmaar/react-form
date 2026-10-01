// Beginners ke liye easy controlled input component
export default function FormField({ field, value, error, onChange }) {
  const name = field.name;
  const label = field.label;
  const type = field.type;
  const placeholder = field.placeholder;
  const options = field.options;

  const inputClassName = "control" + (error ? " control--error" : "");

  let input;

  if (type === "select") {
    input = (
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className={inputClassName}
      >
        <option value="">Select…</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  } else if (type === "textarea") {
    input = (
      <textarea
        id={name}
        name={name}
        value={value}
        rows={4}
        maxLength={300}
        placeholder={placeholder}
        onChange={(e) => onChange(name, e.target.value)}
        className={inputClassName}
      />
    );
  } else {
    input = (
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(name, e.target.value)}
        className={inputClassName}
      />
    );
  }

  return (
    <div
      className={`field${type === "textarea" || name === "address" ? " field--wide" : ""}`}
    >
      <label htmlFor={name}>{label}</label>
      {input}
      {error && (
        <p className="field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
