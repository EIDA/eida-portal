# Quickstart
## Config of eida-portal-backend
n/a
## Config of eida-portal-frontend
Some basic settings are stored in `src/eida-portal-frontend/src/environments/environment.ts`.
## To build the eida-portal-backend docker image
```
$ cd eida-portal-backend/
$ docker build -t eida/backend .
$ docker run -p 49160:3000 -d eida/backend
```
## To build the eida-portal-frontend docker image
```
$ cd eida-portal-frontend/
$ docker build -t eida/frontend .
$ docker run -p 49161:4200 -d eida/frontend
```
## Docker-compose
```
$ cd src/
$ docker-compose -p 'eidaportal' up -d
```
## Start local dev server for eida-portal-backend
```
$ cd eida-portal-backend/
$ npm install
$ npm start
```
## Start local dev server for eida-portal-frontend
```
$ cd eida-portal-frontend/
$ npm install
$ npm start
```
# CDN dependencies
* Frontend is using icons from https://ionicons.com/