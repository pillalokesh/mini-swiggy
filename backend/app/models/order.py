from datetime import datetime
from typing import Optional

from sqlmodel import Field, SQLModel


class Order(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    order_number: str = Field(index=True, unique=True)
    restaurant_id: int = Field(index=True)
    customer_name: str
    customer_phone: str
    order_type: str
    table_number: Optional[str] = None
    delivery_address: Optional[str] = None
    delivery_landmark: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    notes: Optional[str] = None
    subtotal: float
    delivery_fee: float = 0
    total_amount: float
    status: str = "placed"
    whatsapp_status: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class OrderItem(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    order_id: int = Field(index=True)
    menu_item_id: int
    item_name_snapshot: str
    base_price_snapshot: float
    quantity: int
    line_total: float


class OrderItemOption(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    order_item_id: int = Field(index=True)
    option_name_snapshot: str
    option_price_snapshot: float
