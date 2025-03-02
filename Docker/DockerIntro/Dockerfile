FROM node:23.9.0

WORKDIR /app

RUN npm install -g typescript

COPY package* ./
COPY ./prisma .

RUN npm install
RUN npx prisma generate

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]