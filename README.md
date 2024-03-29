# Quickstart #

## Backend ##

### Quick start guide ###

1. Go to the root directory:

    ```bash
    src/eida-portal-backend/
    ```

1. Create the virtual environment:

    ```bash
    python3 -m venv .env
    ```

1. Activate the virtual environment:

    ```bash
    source .env/bin/activate
    ```

1. Install the dependencies:

    ```bash
    pip install -r requirements.txt
    ```

1. Initialize the DB:

    ```bash
    flask db init
    ```

1. Create migration package:

    ```bash
    flask db migrate
    ```

1. Apply migrations:

    ```bash
    flask db upgrade
    ```

1. Apply the fixtures:

    ```bash
    sqlite3 ./app/db/epb.db < fixtures.sql
    ```

1. Run:

    ```bash
    flask run
    ```

## Frontend ##

### Config of eida-portal-frontend ###

Some basic settings are stored in:

* Production build: `src/eida-portal-frontend/src/environments/environment.prod.ts`.
* Dev build: `src/eida-portal-frontend/src/environments/environment.ts`.

### Production deployment ###

* Build the distribution package:

    ```bash
    cd src/eida-portal-frontend/
    ng build --prod --base-href=/epf/
    ```

* Build will be located in `src/eida-portal-frontend/dist/eida-portal`
* Package is ready to be served directly by a simple static HTML server

Please refer to <https://angular.io/guide/deployment>

### To build the eida-portal-frontend docker image ###

```bash
cd src/eida-portal-frontend/
docker build -t eida/frontend:latest .
docker run -p 49161:4200 -d eida/frontend:latest
```

### Start local dev server for eida-portal-frontend ###

```bash
cd src/eida-portal-frontend/
npm install
npm start
```

### Debug ###

#### Linux + Chrome + VS Code ####

1. Start Chrome on Linux with debugging port: `google-chrome-stable --remote-debugging-port=9222`
1. Start the EIDA Portal frontend: `npm start`
1. VS Code -> Debug -> Start Debugging (make sure to select right profile)

#### Mac + Chrome + VS Code ####

1. Start the EIDA Portal frontend: `npm start`
1. VS Code -> Debug -> Start Debugging (make sure to select right profile)

## Docker ##

1. Build and run the images:

```bash
cd src/eida-portal-backend/
docker-compose -p 'epb' up -d --no-deps --build
```

## CDN dependencies ##

* Frontend is using icons from <http://fontawesome.com/>
