from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from app.db.session import get_session
from app.models.order import Order
from app.models.restaurant import Restaurant
from app.schemas.order import OrderCreate, OrderDetails, OrderResponse
from app.services.order_service import create_order

router = APIRouter(prefix="/api/public/orders", tags=["public-orders"])


@router.post("", response_model=OrderResponse)
def place_order(payload: OrderCreate, session: Session = Depends(get_session)):
    restaurant = session.exec(select(Restaurant)).first()
    if not restaurant:
        raise HTTPException(status_code=500, detail="Restaurant not configured")

    order, whatsapp_url = create_order(session, payload, restaurant.id or 0)
    return OrderResponse(order_number=order.order_number, whatsapp_url=whatsapp_url, total_amount=order.total_amount)


@router.get("/{order_number}", response_model=OrderDetails)
def get_order(order_number: str, session: Session = Depends(get_session)):
    order = session.exec(select(Order).where(Order.order_number == order_number)).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return OrderDetails(**order.model_dump())
