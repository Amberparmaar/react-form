import SummarySections from "./SummarySections";

export default function Step4Review({ data, onEdit }) {
  return (
    <div className="step">
      <h2 className="step__title">Review and submit</h2>
      <p className="hint">Check your details. Use Edit to change any section.</p>
      <SummarySections data={data} onEdit={onEdit} />
    </div>
  );
}