from fastapi import APIRouter, HTTPException

from services.data_service import load_csv

router = APIRouter()


@router.get("/api/effective-mass")
def get_effective_mass():
    try:
        data = load_csv()
    except FileNotFoundError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except (ValueError, KeyError) as e:
        raise HTTPException(status_code=500, detail=f"Error parsing CSV: {e}")

    return {"data": data}


@router.get("/health")
def health():
    return {"status": "ok"}
