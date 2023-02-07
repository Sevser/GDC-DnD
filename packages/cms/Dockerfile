# first stage builds vue
FROM node:16-alpine as build-stage
WORKDIR /build
COPY . /build
RUN apk add --no-cache git
RUN npm i
RUN yarn build

# second stage copies the static dist files and Node server files
FROM node:16-alpine as production-stage
WORKDIR /app/
COPY . /app/
COPY --from=build-stage /build/node_modules/ /app/node_modules/
COPY --from=build-stage /build/.cache /app/.cache

EXPOSE 8090
CMD [ "yarn", "start" ]