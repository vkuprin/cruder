FROM node:14-slim AS build

COPY package*.json src/

WORKDIR /src

RUN npm install

COPY .. .

RUN npm run build

FROM build AS test

RUN npm run test

FROM build AS integration

RUN npm run integration

FROM test AS prune

RUN npm prune --production --verbose

FROM node:14-slim AS dev

RUN apt-get update && apt-get install -y procps

WORKDIR /src

FROM node:14-slim

WORKDIR /src

COPY --from=prune /src/node_modules node_modules

COPY --from=build /src/build build
COPY --from=build /src/package.json .

ENTRYPOINT [ "npm" ]
CMD [ "run", "start" ]
