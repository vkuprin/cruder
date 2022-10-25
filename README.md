## Client Docs (cd client)
#### Install dependencies
Should be yarn version 3.2.0 (yarn set version berry)
```
$ yarn install
```

#### Running local dev server
```
$ yarn dev
```

### Build Setup

```
$ yarn build
```

Build should be outputted to `dist/` folder

After that we can check production version with `yarn preview`

### Main Tech stack

* React
* React-router
* React-Context
* Vite.js
* Typescript
* Ant Design
* In plans (react-query) for client browser caching

## Server Docs (cd server)
#### Install dependencies
```
$ yarn install
$ Install Docker dependencies
$ docker-compose up -d
```

#### Running local dev server. Do it only after you successfully run docker-compose database
```
$ yarn start
```