FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . .
RUN npm run build

FROM nginx:stable
COPY default.conf /etc/nginx/conf.d
COPY --from=build /app/dist/frontend/ /usr/share/nginx/html
EXPOSE 80