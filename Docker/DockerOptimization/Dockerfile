# FROM ubuntu:latest

# RUN apt-get update && apt-get install -y curl

# RUN apt-get update && \
#     apt-get install -y curl && \
#     curl -sl https://deb.nodesource.com/setup_22.x | bash - && \
#     apt-get install -y nodejs

# WORKDIR /app

# COPY . .

# RUN npm install
# RUN npm build

# EXPOSE 3000

# CMD [ "npm" , "start" ]

#----------------------------------------------------------------------

# FROM node:22.13-alpine3.21

# WORKDIR /app

# COPY package.json package.json
# COPY package-lock.json package-lock.json
# COPY tsconfig.json tsconfig.json

# RUN npm install

# COPY . .

# RUN npm run build

# RUN rm -rf src/
# RUN rm -rf tsconfig.json

# EXPOSE 3000

# CMD [ "npm" , "start" ]

#-------------------------------------------------------Multistage Docker

FROM node:22.13-alpine3.21 AS builder

WORKDIR /build

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY tsconfig.json tsconfig.json

RUN npm install

COPY . .

RUN npm run build

FROM node:22.13-alpine3.21 AS runner

WORKDIR /app

COPY --from=builder /build/node_modules node_modules/
COPY --from=builder /build/package.json package.json
COPY --from=builder /build/package-lock.json package-lock.json
COPY --from=builder /build/dist/ dist/

EXPOSE 3000

CMD [ "npm" , "start" ]