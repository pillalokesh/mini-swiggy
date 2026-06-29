from fastapi import APIRouter

router = APIRouter(prefix="/api/admin/orders", tags=["admin-orders"])


@router.get("")
def admin_get_orders():
    return {"message": "Orders admin scaffold ready"}
