FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build --omit=dev
WORKDIR /app/dist
CMD [ "node", "main.js" ]
EXPOSE 3000

