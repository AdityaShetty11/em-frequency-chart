import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

export function EffectiveMassChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="frequency_hz"
          type="number"
          domain={[(dataMin) => dataMin - 20, "dataMax"]}
          label={{ value: "Frequency (Hz)", position: "insideBottom", offset: -10 }}
        />
        <YAxis
          label={{ value: "Effective Mass (kg)", angle: -90, position: "insideLeft", offset: 10 }}
        />
        <Tooltip formatter={(val) => val.toExponential(3)} />
        <Legend verticalAlign="top" />
        <ReferenceLine
          x={43.9}
          stroke="#888"
          strokeDasharray="6 3"
          label={{ value: "Mode 1 (43.9 Hz)", position: "insideTopRight", fontSize: 12 }}
        />
        <Line type="monotone" dataKey="em_x" name="EM-X" stroke="#e63946" dot={false} />
        <Line type="monotone" dataKey="em_y" name="EM-Y" stroke="#2a9d8f" dot={false} />
        <Line type="monotone" dataKey="em_z" name="EM-Z" stroke="#457b9d" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
