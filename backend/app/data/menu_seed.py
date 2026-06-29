RESTAURANT_SEED = {
    "name": "Waffle Whizz",
    "slug": "waffle-whizz",
    "tagline": "Where Every Bite is a Waffle Wonder...",
    "phone": "9492520198",
    "whatsapp_number": "9492520198",
    "description": "Premium local waffle and brownie brand for direct ordering.",
    "address": "Main Road, Dessert Lane",
    "city": "Hyderabad",
    "state": "Telangana",
    "pincode": "500001",
    "latitude": 17.3850,
    "longitude": 78.4867,
    "logo_url": "",
    "hero_image_url": "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=1400&q=80"
}

CATEGORY_SEED = [
    {"name": "Waffle Puff", "slug": "waffle-puff", "sort_order": 1},
    {"name": "Waffle Stick", "slug": "waffle-stick", "sort_order": 2},
    {"name": "Ice Cream Waffles", "slug": "ice-cream-waffles", "sort_order": 3},
    {"name": "Brownies", "slug": "brownies", "sort_order": 4},
    {"name": "Specials", "slug": "specials", "sort_order": 5}
]


def _item(name, price, cat, sort_order, bestseller=False, badge_text=None, short_desc="Signature dessert", full_desc="Rich and indulgent.", image_prompt=""):
    base_slug = name.lower().replace("&", "and").replace(" ", "-").replace("--", "-")
    slug = f"{cat}-{base_slug}"
    return {
        "name": name,
        "slug": slug,
        "price": float(price),
        "category_slug": cat,
        "sort_order": sort_order,
        "is_bestseller": bestseller,
        "badge_text": badge_text,
        "short_description": short_desc,
        "full_description": full_desc,
        "image_prompt": image_prompt,
        "image_url": "https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?auto=format&fit=crop&w=900&q=80"
    }


MENU_ITEMS_SEED = [
    _item("Dark Fantasy", 39, "waffle-puff", 1, True, short_desc="Classic dark chocolate puff", image_prompt="Chocolate stuffed waffle puff closeup"),
    _item("Milk Fantasy", 39, "waffle-puff", 2, short_desc="Creamy milk chocolate puff"),
    _item("White Fantasy", 45, "waffle-puff", 3),
    _item("Dark & Milk", 45, "waffle-puff", 4),
    _item("Dark & White", 45, "waffle-puff", 5),
    _item("Triple Chocolate", 55, "waffle-puff", 6, True),
    _item("Crunchy Oreo", 55, "waffle-puff", 7),
    _item("Crunchy KitKat", 60, "waffle-puff", 8),
    _item("Gems with Milk", 60, "waffle-puff", 9),
    _item("Gems with Dark", 60, "waffle-puff", 10),
    _item("Dry Fruits", 70, "waffle-puff", 11),
    _item("Dark Fantasy", 69, "waffle-stick", 1, True, short_desc="Crunchy stick with dark chocolate"),
    _item("Milk Fantasy", 69, "waffle-stick", 2),
    _item("White Fantasy", 75, "waffle-stick", 3),
    _item("Dark & Milk", 75, "waffle-stick", 4),
    _item("Dark & White", 75, "waffle-stick", 5),
    _item("Triple Chocolate", 85, "waffle-stick", 6, True),
    _item("Crunchy Oreo", 85, "waffle-stick", 7),
    _item("Crunchy KitKat", 90, "waffle-stick", 8),
    _item("Gems with Milk", 90, "waffle-stick", 9),
    _item("Gems with Dark", 90, "waffle-stick", 10),
    _item("Dry Fruits", 100, "waffle-stick", 11),
    _item("Single Waffle", 80, "ice-cream-waffles", 1, True, full_desc="Triangle waffle slice, chocolate spread, brownie bits, 1 scoop vanilla."),
    _item("Double Waffle", 120, "ice-cream-waffles", 2, True, full_desc="Two triangle waffles, extra drizzle, brownie bits, 2 scoops.", badge_text="Popular"),
    _item("Dark Chocolate", 60, "brownies", 1, True),
    _item("Milk Chocolate", 60, "brownies", 2),
    _item("White Chocolate", 70, "brownies", 3),
    _item("Dark & Milk", 70, "brownies", 4),
    _item("Dark & White", 70, "brownies", 5),
    _item("Triple Chocolate", 80, "brownies", 6, True),
    _item("Crunchy Oreo", 80, "brownies", 7),
    _item("Crunchy KitKat", 90, "brownies", 8),
    _item("Gems with Milk", 90, "brownies", 9),
    _item("Gems with Dark", 90, "brownies", 10),
    _item("Dry Fruits", 100, "brownies", 11),
    _item("Nutella Loaded", 110, "brownies", 12, True, badge_text="Chef Pick"),
    _item("Almond Brownie", 130, "brownies", 13, badge_text="Premium"),
    _item("Special Naughty Nutella", 120, "specials", 1, True, badge_text="Special"),
    _item("Almond Cake", 220, "specials", 2, badge_text="Special")
]

OPTION_RULES = {
    "ice-cream-waffles-single-waffle": [{"name": "Extra Chocolate", "option_type": "addon", "price_delta": 10}],
    "ice-cream-waffles-double-waffle": [{"name": "Extra Chocolate", "option_type": "addon", "price_delta": 10}],
    "brownies-dark-chocolate": [{"name": "Extra Chocolate", "option_type": "addon", "price_delta": 20}],
    "brownies-milk-chocolate": [{"name": "Extra Chocolate", "option_type": "addon", "price_delta": 20}],
    "brownies-white-chocolate": [{"name": "Extra Chocolate", "option_type": "addon", "price_delta": 20}],
    "brownies-nutella-loaded": [{"name": "Extra Chocolate", "option_type": "addon", "price_delta": 20}]
}
