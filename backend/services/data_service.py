import csv
from pathlib import Path

DATA_FILE = Path(__file__).parent.parent / "data" / "data.csv"


def load_csv() -> list[dict]:
    if not DATA_FILE.exists():
        raise FileNotFoundError(f"Data file not found: {DATA_FILE}")

    rows = []
    with DATA_FILE.open(newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            rows.append(
                {
                    "sl_no": int(row["sl.no"]),
                    "frequency_hz": float(row["frequency_hz"]),
                    "em_x": float(row["x"]),
                    "em_y": float(row["y"]),
                    "em_z": float(row["z"]),
                }
            )
    return rows
