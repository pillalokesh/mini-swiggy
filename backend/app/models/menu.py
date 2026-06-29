from datetime import datetime
from typing import Optional

from sqlmodel import Field, SQLModel


class Category(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    restaurant_id: int = Field(index=True)
    name: str
    slug: str = Field(index=True)
    sort_order: int = 0
    is_active: bool = True


class MenuItem(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    restaurant_id: int = Field(index=True)
    category_id: int = Field(index=True)
    name: str
    slug: str = Field(index=True, unique=True)
    short_description: str
    full_description: str
    price: float
    compare_price: Optional[float] = None
    image_url: str
    image_prompt: Optional[str] = None
    is_veg: bool = True
    is_bestseller: bool = False
    is_available: bool = True
    badge_text: Optional[str] = None
    sort_order: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class MenuItemOption(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    menu_item_id: int = Field(index=True)
    name: str
    option_type: str
    price_delta: float = 0
    is_required: bool = False
    sort_order: int = 0
