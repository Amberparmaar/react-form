import { STEPS } from "./formConfig";

export default function SummarySections({ data, onEdit }) {
  return (
    <div className="summary">
      {STEPS.map((step, index) => (
        <section className="summary__section" key={step.key}>
          <header>
            <h3>{step.title}</h3>
            {onEdit && (
              <button
                type="button"
                className="btn btn--small"
                onClick={() => onEdit(index)}
              >
                Edit
              </button>
            )}
          </header>
          <dl>
            {step.fields.map((field) => (
              <div
                key={field.name}
                className={field.type === "textarea" ? "summary__row summary__row--wide" : "summary__row"}
              >
                <dt>{field.label}</dt>
                <dd>{data[step.key][field.name] || "—"}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}