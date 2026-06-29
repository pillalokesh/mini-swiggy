# Waffle Whizz Platform

Production-style full-stack foundation for Waffle Whizz, a premium dessert-first direct ordering experience designed for mobile QR users.

Brand:
- Name: Waffle Whizz
- Tagline: Where Every Bite is a Waffle Wonder...
- Domain target: lokeshwaffle.in

## Product Scope

Implemented now:
- Next.js App Router frontend with mobile-first premium storefront
- FastAPI backend with seeded restaurant/menu/order data
- Menu browsing, product detail, cart, checkout, order success flows
- WhatsApp order message URL generation after order creation
- Contact map sections and checkout map integration placeholder
- Admin route scaffolds
- Dockerfiles + environment templates for ECS deployment readiness

## Tech Stack

Frontend:
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand

Backend:
- FastAPI
- SQLModel
- Pydantic
- SQLite default for local; PostgreSQL-ready via env

Infra compatibility:
- Container-first
- ALB/ECS compatible ports (`frontend:3000`, `backend:8000`)
- Health endpoint: `/health`

## Folder Structure

- `frontend/` Next.js app
- `backend/` FastAPI app
- `infra/` Terraform stack and modules
- `.github/workflows/` CI/CD workflows
- `deploy/task-definitions/` ECS task templates

## Frontend Routes

Public:
- `/`
- `/menu`
- `/menu/[slug]`
- `/cart`
- `/checkout`
- `/order/success`
- `/about`
- `/contact`

Admin scaffold:
- `/admin`
- `/admin/menu`
- `/admin/orders`
- `/admin/settings`

## Backend APIs

Public:
- `GET /api/public/restaurant`
- `GET /api/public/menu`
- `GET /api/public/menu/categories`
- `GET /api/public/menu/items/{slug}`
- `POST /api/public/orders`
- `GET /api/public/orders/{order_number}`

Admin scaffold:
- `POST /api/admin/auth/login`
- `GET /api/admin/menu`
- `POST /api/admin/menu`
- `PUT /api/admin/menu/{item_id}`
- `GET /api/admin/orders`
- `PUT /api/admin/settings`

Health:
- `GET /health`

## Seeded Data

Restaurant seed includes:
- name: Waffle Whizz
- slug: waffle-whizz
- tagline: Where Every Bite is a Waffle Wonder...
- phone: 9492520198
- whatsapp_number: 9492520198
- domain reference: lokeshwaffle.in

Menu categories seeded:
- Waffle Puff
- Waffle Stick
- Ice Cream Waffles
- Brownies
- Specials

All requested menu items and baseline customization options are seeded in:
- `backend/app/data/menu_seed.py`

## WhatsApp Order Flow

1. User checks out from frontend.
2. Backend creates order + order items + option snapshots.
3. Backend generates order number (`WW-000001` pattern).
4. Backend creates structured WhatsApp message payload.
5. Frontend redirects to success page with WhatsApp CTA URL.

## Environment Variables

Frontend (`frontend/.env.example`):
- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_STORE_LATITUDE`
- `NEXT_PUBLIC_STORE_LONGITUDE`

Backend (`backend/.env.example`):
- `BACKEND_DATABASE_URL`
- `BACKEND_ALLOWED_ORIGINS`
- `BACKEND_WHATSAPP_NUMBER`
- `BACKEND_STORE_NAME`
- `BACKEND_STORE_LATITUDE`
- `BACKEND_STORE_LONGITUDE`

## Local Development

Backend:
1. `cd backend`
2. `python -m venv .venv`
3. `.venv\\Scripts\\activate`
4. `pip install -r requirements.txt`
5. `uvicorn app.main:app --reload --port 8000`

Frontend:
1. `cd frontend`
2. `npm install`
3. `npm run dev`

## Docker

Backend:
- `docker build -t waffle-whizz-backend ./backend`
- `docker run -p 8000:8000 waffle-whizz-backend`

Frontend:
- `docker build -t waffle-whizz-frontend ./frontend`
- `docker run -p 3000:3000 waffle-whizz-frontend`

## AWS ECS Readiness Notes

- Frontend expects API base URL via `NEXT_PUBLIC_API_BASE_URL`
- Backend uses env-only configuration (no hardcoded localhost assumptions)
- Both services expose stable container ports
- Works behind ALB path routing (`/api/*` to backend)

## AI Visual Prompt Strategy

Prompt metadata maintained in:
- `frontend/lib/image-prompts.ts`
- `backend/app/data/menu_seed.py` (`image_prompt` per item)

This allows future AI-generated food visual replacement without changing schema.

## Future Roadmap

- Payment gateway integration
- Delivery distance/fee rules
- Real admin auth and role-based access
- Multi-branch support
- Offer banners and campaign scheduler
- Full analytics dashboard
