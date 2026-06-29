from sqlmodel import Session, select

from app.models.restaurant import Restaurant


def get_restaurant(session: Session) -> Restaurant:
    restaurant = session.exec(select(Restaurant)).first()
    if not restaurant:
        raise ValueError("Restaurant not seeded")
    return restaurant
