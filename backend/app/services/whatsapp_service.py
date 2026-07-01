from datetime import datetime
from urllib.parse import quote

from app.core.config import settings
from app.models.order import Order, OrderItem, OrderItemOption


def _normalize_whatsapp_number(raw: str) -> str:
    digits = "".join(ch for ch in raw if ch.isdigit())
    # Default to India country code when a local 10-digit number is provided.
    if len(digits) == 10:
        return f"91{digits}"
    return digits


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
    if order.latitude is not None and order.longitude is not None:
        lines.append(f"Customer Location: https://maps.google.com/?q={order.latitude},{order.longitude}")
    elif order.delivery_address:
        lines.append(f"Address Map: https://www.google.com/maps/search/?api=1&query={quote(order.delivery_address)}")

    lines.append("")
    lines.append("Items:")

    for idx, item in enumerate(order_items, start=1):
        lines.append(f"{idx}. {item.item_name_snapshot} x {item.quantity} (Rs {int(item.line_total)})")
        selected_options = options_map.get(item.id or 0, [])
        for opt in selected_options:
            lines.append(f"   - {opt.option_name_snapshot} (+Rs {int(opt.option_price_snapshot)})")

    if not order_items:
        lines.append("No items captured. Please verify order details.")

    lines.append("")
    lines.append(f"Subtotal: Rs {int(order.subtotal)}")
    lines.append(f"Total: Rs {int(order.total_amount)}")
    if order.notes:
        lines.append(f"Notes: {order.notes}")
    lines.append(f"Time: {datetime.utcnow().isoformat()} UTC")

    return "\n".join(lines)


def build_whatsapp_url(message: str, whatsapp_number: str | None = None) -> str:
    number_source = whatsapp_number or settings.backend_whatsapp_number
    number = _normalize_whatsapp_number(number_source)
    return f"https://wa.me/{number}?text={quote(message)}"
