FROM node:14

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

RUN node init-db.js

EXPOSE 3000

CMD ["npm", "start"]
