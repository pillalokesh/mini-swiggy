from fastapi import APIRouter

router = APIRouter(prefix="/api/admin/menu", tags=["admin-menu"])


@router.get("")
def admin_get_menu():
    return {"message": "Menu admin scaffold ready"}


@router.post("")
def admin_create_menu_item():
    return {"message": "Create menu item scaffold ready"}


@router.put("/{item_id}")
def admin_update_menu_item(item_id: int):
    return {"message": f"Update menu item scaffold ready for {item_id}"}
