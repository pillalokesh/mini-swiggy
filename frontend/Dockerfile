FROM node:20-alpine AS base
WORKDIR /app

# Placeholder image for infrastructure bootstrap and CI/CD validation.
RUN printf '{"name":"frontend-placeholder","version":"1.0.0"}' > package.json
RUN npm install --omit=dev serve
RUN mkdir -p /app/public
RUN printf '<!doctype html><html><body><h1>Frontend Placeholder</h1></body></html>' > /app/public/index.html

EXPOSE 3000
CMD ["npx", "serve", "-s", "public", "-l", "3000"]
