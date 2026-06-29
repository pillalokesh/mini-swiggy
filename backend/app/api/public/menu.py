from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from app.db.session import get_session
from app.schemas.menu import CategoryOut, MenuItemOut, MenuOptionOut
from app.services.menu_service import (
    get_categories,
    get_item_by_slug,
    get_menu_items,
    get_options_for_item,
)

router = APIRouter(prefix="/api/public/menu", tags=["public-menu"])


@router.get("", response_model=list[MenuItemOut])
def read_menu(session: Session = Depends(get_session)):
    items = get_menu_items(session)
    response = []
    for item in items:
        options = get_options_for_item(session, item.id or 0)
        response.append(
            MenuItemOut(
                **item.model_dump(),
                options=[MenuOptionOut(**option.model_dump()) for option in options],
            )
        )
    return response


@router.get("/categories", response_model=list[CategoryOut])
def read_categories(session: Session = Depends(get_session)):
    categories = get_categories(session)
    return [CategoryOut(**category.model_dump()) for category in categories]


@router.get("/items/{slug}", response_model=MenuItemOut)
def read_menu_item(slug: str, session: Session = Depends(get_session)):
    item = get_item_by_slug(session, slug)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    options = get_options_for_item(session, item.id or 0)
    return MenuItemOut(
        **item.model_dump(),
        options=[MenuOptionOut(**option.model_dump()) for option in options],
    )
