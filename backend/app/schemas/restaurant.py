from pydantic import BaseModel


class RestaurantOut(BaseModel):
    name: str
    slug: str
    tagline: str
    phone: str
    whatsapp_number: str
    address: str
    city: str
    state: str
    pincode: str
    latitude: float
    longitude: float
