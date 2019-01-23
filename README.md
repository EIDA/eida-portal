# Quickstart #

## Backend ##

### Config of eida-portal-backend ###
n/a

### To build the eida-portal-backend docker image ###
```
$ cd src/eida-portal-backend/
$ docker build -t eida/backend .
$ docker run -p 49160:3000 -d eida/backend
```

### Start local dev server for eida-portal-backend ###
```
$ cd src/eida-portal-backend
$ npm install
$ npm start
```

## Frontend ##

### Config of eida-portal-frontend ###
Some basic settings are stored in:
* Production build: `src/eida-portal-frontend/src/environments/environment.prod.ts`.
* Dev build: `src/eida-portal-frontend/src/environments/environment.ts`.

### Production deployment ###
* Build the distribution package:
    ```
    $ cd src/eida-portal-frontend/
    $ ng build --prod --base-href=/epf/
    ```
* Build will be located in `src/eida-portal-frontend/dist/eida-portal`
* Package is ready to be served directly by a simple static HTML server

Please refer to https://angular.io/guide/deployment

### To build the eida-portal-frontend docker image ###
```
$ cd src/eida-portal-frontend/
$ docker build -t eida/frontend .
$ docker run -p 49161:4200 -d eida/frontend
```

### Start local dev server for eida-portal-frontend ###
```
$ cd src/eida-portal-frontend/
$ npm install
$ npm start
```

### Debug ###

#### Linux + Chrome + VS Code ####

1. Start Chrome on Linux with debugging port: `google-chrome-stable --remote-debugging-port=9222`
1. Start the EIDA Portal frontend: `npm start`
1. VS Code -> Debug -> Start Debugging


## Docker-compose ##
```
$ cd src/
$ docker-compose -p 'eidaportal' up -d
```

# CDN dependencies #
* Frontend is using icons from http://fontawesome.com/