# Usa una imagen oficial de Node.js como imagen base
FROM node:18-alpine

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el package.json y el package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Genera el cliente de Prisma
RUN npx prisma generate

# Compila la aplicación NestJS
RUN npm run build

# Expone el puerto en el que la aplicación se ejecutará

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start:prod"]
