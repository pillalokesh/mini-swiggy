FROM python:3.12-slim AS base
WORKDIR /app

# Placeholder backend for infrastructure bootstrap and health checks.
RUN pip install --no-cache-dir fastapi uvicorn
RUN printf 'from fastapi import FastAPI\napp=FastAPI()\n@app.get("/health")\ndef health():\n    return {"status":"ok"}\n@app.get("/api/ping")\ndef ping():\n    return {"message":"pong"}\n' > /app/main.py

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
