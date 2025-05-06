FROM node:20.12.0-alpine3.19 as buildEnv
RUN addgroup app && adduser -S -G app app
WORKDIR /app
RUN chmod 777 /app
USER app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.25.2-alpine-slim
COPY --from=buildEnv /app/build /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf