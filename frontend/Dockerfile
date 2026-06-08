FROM node:24-alpine AS builder

WORKDIR /app

# install deps (prefer lockfile, fall back to install)
COPY package*.json ./
RUN npm ci || npm install

# copy source and build
COPY . .
RUN npm run build

FROM nginx:stable-alpine

# copy build output to nginx html dir
COPY --from=builder /app/dist /usr/share/nginx/html

# nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

