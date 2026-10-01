import SummarySections from "./SummarySections";

export default function Success({ data, onReset }) {
  return (
    <div className="card">
      <div className="stamp stamp--pressed">Received</div>
      <div className="success" role="status">
        <h2>Application submitted</h2>
        <p>Thanks, {data.personal.fullName}. Here is exactly what we received.</p>
      </div>
      <SummarySections data={data} />
      <div className="actions actions--end">
        <button type="button" className="btn" onClick={onReset}>
          Start a new form
        </button>
      </div>
    </div>
  );
}