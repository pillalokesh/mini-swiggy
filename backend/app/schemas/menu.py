from typing import List, Optional

from pydantic import BaseModel


class CategoryOut(BaseModel):
    id: int
    name: str
    slug: str
    sort_order: int


class MenuOptionOut(BaseModel):
    id: int
    name: str
    option_type: str
    price_delta: float
    is_required: bool


class MenuItemOut(BaseModel):
    id: int
    category_id: int
    name: str
    slug: str
    short_description: str
    full_description: str
    price: float
    image_url: str
    image_prompt: Optional[str] = None
    is_veg: bool
    is_bestseller: bool
    is_available: bool
    badge_text: Optional[str] = None
    options: List[MenuOptionOut] = []
