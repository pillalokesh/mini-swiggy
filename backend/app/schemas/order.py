from datetime import datetime
from typing import List, Literal, Optional

from pydantic import BaseModel, Field


class OrderCreateItem(BaseModel):
    menu_item_id: int
    quantity: int = Field(ge=1)
    option_ids: List[int] = []


class OrderCreate(BaseModel):
    customer_name: str
    customer_phone: str = Field(pattern=r"^(?:\+91)?[6-9]\d{9}$")
    order_type: Literal["dine-in", "takeaway", "delivery"]
    table_number: Optional[str] = None
    delivery_address: Optional[str] = None
    delivery_landmark: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    notes: Optional[str] = None
    items: List[OrderCreateItem]


class OrderResponse(BaseModel):
    order_number: str
    whatsapp_url: str
    total_amount: float


class OrderDetails(BaseModel):
    order_number: str
    customer_name: str
    customer_phone: str
    order_type: str
    subtotal: float
    total_amount: float
    status: str
    created_at: datetime
