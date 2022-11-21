FROM node:16

WORKDIR /app

COPY package*.json .

RUN npm install

RUN npm i -g prisma

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]
