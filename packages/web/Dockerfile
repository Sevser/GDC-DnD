# first stage builds vue
FROM node:16-alpine as build-production
WORKDIR /build
COPY . /build
COPY ./.env.prod ./.env
ENV ASSET_URL=/apps/dnd-web
RUN yarn
RUN yarn build

FROM node:16-alpine as build-development
WORKDIR /build
COPY . /build
COPY ./.env.develop ./.env
RUN yarn
RUN yarn build


FROM node:16-alpine as development-stage
WORKDIR /app/
COPY . /app/
COPY --from=build-development /build/dist/ /app/dist/
COPY --from=build-development /build/node_modules/ /app/node_modules/

EXPOSE 8080
CMD [ "yarn", "preview", "--port=8080" ]

FROM node:16-alpine as production-stage
WORKDIR /app/
COPY . /app/
COPY --from=build-production /build/dist/ /app/dist/
COPY --from=build-production /build/node_modules/ /app/node_modules/

EXPOSE 8080
CMD [ "yarn", "preview", "--port=8080" ]