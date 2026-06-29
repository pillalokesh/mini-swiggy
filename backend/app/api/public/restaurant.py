from fastapi import APIRouter, Depends
from sqlmodel import Session

from app.db.session import get_session
from app.schemas.restaurant import RestaurantOut
from app.services.restaurant_service import get_restaurant

router = APIRouter(prefix="/api/public/restaurant", tags=["public-restaurant"])


@router.get("", response_model=RestaurantOut)
def read_restaurant(session: Session = Depends(get_session)):
    restaurant = get_restaurant(session)
    return RestaurantOut.model_validate(restaurant)
