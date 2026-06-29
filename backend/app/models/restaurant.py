from datetime import datetime
from typing import Optional

from sqlmodel import Field, SQLModel


class Restaurant(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    slug: str = Field(index=True, unique=True)
    tagline: str
    phone: str
    whatsapp_number: str
    description: str
    logo_url: Optional[str] = None
    hero_image_url: Optional[str] = None
    address: str
    city: str
    state: str
    pincode: str
    latitude: float
    longitude: float
    is_open: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
