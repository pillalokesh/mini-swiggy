from sqlmodel import Session, select

from app.data.menu_seed import CATEGORY_SEED, MENU_ITEMS_SEED, OPTION_RULES, RESTAURANT_SEED
from app.models.menu import Category, MenuItem, MenuItemOption
from app.models.restaurant import Restaurant


def seed_database(session: Session):
    existing_restaurant = session.exec(select(Restaurant)).first()
    if existing_restaurant:
        return

    restaurant = Restaurant(**RESTAURANT_SEED)
    session.add(restaurant)
    session.commit()
    session.refresh(restaurant)

    category_map: dict[str, int] = {}
    for category_data in CATEGORY_SEED:
        category = Category(restaurant_id=restaurant.id or 0, **category_data)
        session.add(category)
        session.commit()
        session.refresh(category)
        category_map[category.slug] = category.id or 0

    for item_data in MENU_ITEMS_SEED:
        item_payload = dict(item_data)
        category_slug = item_payload.pop("category_slug")
        item = MenuItem(
            restaurant_id=restaurant.id or 0,
            category_id=category_map[category_slug],
            **item_payload,
        )
        session.add(item)
        session.commit()
        session.refresh(item)

        for idx, option in enumerate(OPTION_RULES.get(item.slug, []), start=1):
            session.add(
                MenuItemOption(
                    menu_item_id=item.id or 0,
                    sort_order=idx,
                    is_required=False,
                    **option,
                )
            )
        session.commit()
