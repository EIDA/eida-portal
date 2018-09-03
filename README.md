# Quickstart
## To build the eida-portal-backend docker image:
```
$ cd eida-portal-backend/
$ docker build -t eida/backend .
$ docker run -p 49160:3000 -d eida/backend
```
## To build the eida-portal-frontend docker image:
```
$ cd eida-portal-frontend/
$ docker build -t eida/frontend .
$ docker run -p 49160:4200 -d eida/frontend
```
## Docker-compose: