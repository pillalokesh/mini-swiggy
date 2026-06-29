from datetime import datetime
from urllib.parse import quote

from app.core.config import settings
from app.models.order import Order, OrderItem, OrderItemOption


def build_order_message(order: Order, order_items: list[OrderItem], options_map: dict[int, list[OrderItemOption]]) -> str:
    lines = [
        f"Hello {settings.backend_store_name}, I want to place an order.",
        "",
        f"Order ID: {order.order_number}",
        f"Customer: {order.customer_name}",
        f"Phone: {order.customer_phone}",
        f"Order Type: {order.order_type}",
    ]

    if order.table_number:
        lines.append(f"Table: {order.table_number}")
    if order.delivery_address:
        lines.append(f"Address: {order.delivery_address}")
    if order.delivery_landmark:
        lines.append(f"Landmark: {order.delivery_landmark}")

    lines.append("")
    lines.append("Items:")

    for idx, item in enumerate(order_items, start=1):
        lines.append(f"{idx}. {item.item_name_snapshot} x {item.quantity}")
        for opt in options_map.get(item.id or 0, []):
            lines.append(f"   - {opt.option_name_snapshot}")

    lines.append("")
    lines.append(f"Subtotal: Rs {int(order.subtotal)}")
    if order.notes:
        lines.append(f"Notes: {order.notes}")
    lines.append(f"Time: {datetime.utcnow().isoformat()} UTC")

    return "\n".join(lines)


def build_whatsapp_url(message: str) -> str:
    number = "".join(ch for ch in settings.backend_whatsapp_number if ch.isdigit())
    return f"https://wa.me/{number}?text={quote(message)}"
