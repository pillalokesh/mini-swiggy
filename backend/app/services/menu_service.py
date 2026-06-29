from sqlmodel import Session, select

from app.models.menu import Category, MenuItem, MenuItemOption


def get_categories(session: Session) -> list[Category]:
    return list(session.exec(select(Category).where(Category.is_active == True).order_by(Category.sort_order)))


def get_menu_items(session: Session) -> list[MenuItem]:
    return list(session.exec(select(MenuItem).where(MenuItem.is_available == True).order_by(MenuItem.sort_order)))


def get_item_by_slug(session: Session, slug: str) -> MenuItem | None:
    return session.exec(select(MenuItem).where(MenuItem.slug == slug)).first()


def get_options_for_item(session: Session, item_id: int) -> list[MenuItemOption]:
    return list(session.exec(select(MenuItemOption).where(MenuItemOption.menu_item_id == item_id).order_by(MenuItemOption.sort_order)))


def get_options_by_ids(session: Session, option_ids: list[int]) -> list[MenuItemOption]:
    if not option_ids:
        return []
    return list(session.exec(select(MenuItemOption).where(MenuItemOption.id.in_(option_ids))))
