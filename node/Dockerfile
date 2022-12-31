FROM node:16-alpine

RUN mkdir -p /app
WORKDIR /app

COPY . .

RUN npm ci

CMD ["node", "/app/index.js"]
