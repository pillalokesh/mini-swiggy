from fastapi import APIRouter

router = APIRouter(prefix="/api/admin/settings", tags=["admin-settings"])


@router.put("")
def admin_update_settings():
    return {"message": "Settings admin scaffold ready"}
