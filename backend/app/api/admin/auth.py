from fastapi import APIRouter

router = APIRouter(prefix="/api/admin/auth", tags=["admin-auth"])


@router.post("/login")
def admin_login():
    return {"message": "Admin auth scaffold ready", "token": "placeholder-token"}
