from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.admin.auth import router as admin_auth_router
from app.api.admin.menu_admin import router as admin_menu_router
from app.api.admin.orders_admin import router as admin_orders_router
from app.api.admin.settings_admin import router as admin_settings_router
from app.api.public.menu import router as public_menu_router
from app.api.public.orders import router as public_orders_router
from app.api.public.restaurant import router as public_restaurant_router
from app.core.config import settings
from app.db.seed import seed_database
from app.db.session import Session, create_db_and_tables, engine

app = FastAPI(title="Waffle Whizz API", version="1.0.0")

allowed_origins = [origin.strip() for origin in settings.backend_allowed_origins.split(",") if origin.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup() -> None:
    create_db_and_tables()
    with Session(engine) as session:
        seed_database(session)


@app.get("/health")
def health_check():
    return {"status": "ok", "service": "waffle-whizz-backend"}


app.include_router(public_restaurant_router)
app.include_router(public_menu_router)
app.include_router(public_orders_router)
app.include_router(admin_auth_router)
app.include_router(admin_menu_router)
app.include_router(admin_orders_router)
app.include_router(admin_settings_router)
