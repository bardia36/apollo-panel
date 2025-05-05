FROM node:20.12.0-alpine3.19
RUN addgroup app && adduser -S -G app app
WORKDIR /app
RUN chmod 777 /app
USER app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8090
CMD ["npm", "start"]