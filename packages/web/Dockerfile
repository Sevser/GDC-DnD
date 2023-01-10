# first stage builds vue
FROM node:16-alpine as build-stage
WORKDIR /build
COPY . /build
RUN yarn
RUN yarn build

# second stage copies the static dist files and Node server files
FROM node:16-alpine as production-stage
WORKDIR /app/
COPY . /app/
COPY --from=build-stage /build/dist/ /app/dist/
COPY --from=build-stage /build/node_modules/ /app/node_modules/

# open port 3000 and run Node server
EXPOSE 8080
CMD [ "yarn", "preview", "--port=8080" ]