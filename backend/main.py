import csv
import os
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI(title="Effective Mass API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(","),
    allow_methods=["GET"],
    allow_headers=["*"],
)

DATA_FILE = Path(__file__).parent / "data" / "data.csv"


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


@app.get("/api/effective-mass")
def get_effective_mass():
    try:
        data = load_csv()
    except FileNotFoundError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except (ValueError, KeyError) as e:
        raise HTTPException(status_code=500, detail=f"Error parsing CSV: {e}")

    return {"data": data}


@app.get("/health")
def health():
    return {"status": "ok"}
