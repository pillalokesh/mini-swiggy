from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    backend_database_url: str = "sqlite:///./waffle_whizz.db"
    backend_allowed_origins: str = "http://localhost:3000"
    backend_whatsapp_number: str = "9492520198"
    backend_store_name: str = "Waffle Whizz"
    backend_store_latitude: float = 17.3850
    backend_store_longitude: float = 78.4867


settings = Settings()
