FROM node:20-alpine

WORKDIR /app

# Kopieer package bestanden en installeer dependencies
COPY package*.json ./
RUN npm install

# Kopieer de rest van de code
COPY . .

EXPOSE 5173

# Start de ontwikkelomgeving en luister extern (nodig voor Docker)
CMD ["npm", "run", "dev", "--", "--host"]