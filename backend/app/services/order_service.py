from datetime import datetime

from sqlmodel import Session, select

from app.models.menu import MenuItem
from app.models.order import Order, OrderItem, OrderItemOption
from app.schemas.order import OrderCreate
from app.services.menu_service import get_options_by_ids
from app.services.whatsapp_service import build_order_message, build_whatsapp_url


def _next_order_number(session: Session) -> str:
    total = session.exec(select(Order)).all()
    return f"WW-{len(total) + 1:06d}"


def _normalize_customer_phone(phone: str) -> str:
    digits = "".join(ch for ch in phone if ch.isdigit())
    if len(digits) == 12 and digits.startswith("91"):
        return digits[2:]
    if len(digits) == 10:
        return digits
    return digits


def create_order(
    session: Session,
    payload: OrderCreate,
    restaurant_id: int,
    restaurant_whatsapp_number: str | None = None,
):
    subtotal = 0.0
    order_items_to_create: list[OrderItem] = []
    options_to_create: list[tuple[int, list[OrderItemOption]]] = []

    for entry in payload.items:
        menu_item = session.get(MenuItem, entry.menu_item_id)
        if not menu_item:
            raise ValueError(f"Invalid menu_item_id: {entry.menu_item_id}")

        selected_options = get_options_by_ids(session, entry.option_ids)
        option_cost = sum(opt.price_delta for opt in selected_options)
        line_total = (menu_item.price + option_cost) * entry.quantity
        subtotal += line_total

        order_item = OrderItem(
            order_id=0,
            menu_item_id=menu_item.id or 0,
            item_name_snapshot=menu_item.name,
            base_price_snapshot=menu_item.price,
            quantity=entry.quantity,
            line_total=line_total,
        )
        order_items_to_create.append(order_item)
        options_to_create.append(
            (
                len(order_items_to_create) - 1,
                [
                    OrderItemOption(
                        order_item_id=0,
                        option_name_snapshot=opt.name,
                        option_price_snapshot=opt.price_delta,
                    )
                    for opt in selected_options
                ],
            )
        )

    order = Order(
        order_number=_next_order_number(session),
        restaurant_id=restaurant_id,
        customer_name=payload.customer_name,
        customer_phone=_normalize_customer_phone(payload.customer_phone),
        order_type=payload.order_type,
        table_number=payload.table_number,
        delivery_address=payload.delivery_address,
        delivery_landmark=payload.delivery_landmark,
        latitude=payload.latitude,
        longitude=payload.longitude,
        notes=payload.notes,
        subtotal=subtotal,
        delivery_fee=0,
        total_amount=subtotal,
        status="placed",
        whatsapp_status="pending",
        updated_at=datetime.utcnow(),
    )
    session.add(order)
    session.commit()
    session.refresh(order)

    created_items: list[OrderItem] = []
    for idx, item in enumerate(order_items_to_create):
        item.order_id = order.id or 0
        session.add(item)
        session.commit()
        session.refresh(item)
        created_items.append(item)

        _, option_rows = options_to_create[idx]
        for option in option_rows:
            option.order_item_id = item.id or 0
            session.add(option)
        session.commit()

    options_map: dict[int, list[OrderItemOption]] = {}
    for item in created_items:
        options = list(
            session.exec(select(OrderItemOption).where(OrderItemOption.order_item_id == (item.id or 0)))
        )
        options_map[item.id or 0] = options

    message = build_order_message(order, created_items, options_map)
    whatsapp_url = build_whatsapp_url(message, restaurant_whatsapp_number)

    order.whatsapp_status = "ready"
    order.updated_at = datetime.utcnow()
    session.add(order)
    session.commit()

    return order, whatsapp_url
