import { useEffectiveMass } from "./hooks/useEffectiveMass";
import { EffectiveMassChart } from "./components/EffectiveMassChart";
import "./index.css";

export default function App() {
  const { data, loading, error } = useEffectiveMass();

  if (loading) return <p className="status">Loading...</p>;
  if (error) return <p className="status error">Error: {error}</p>;

  return (
    <div className="container">
      <h1>Effective Mass vs Frequency</h1>
      <EffectiveMassChart data={data} />
    </div>
  );
}
