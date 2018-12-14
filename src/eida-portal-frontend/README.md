# EIDA Portal Backend
Todo

# EIDA Portal Frontend

## Dependencies
* The project depends on Node.js, npm and Angular - make sure to install those first
* Go to `eida-portal-frontend/` (where `package.json` file lives) and run `npm install`
* To start dev server run `npm start`


## Build for production
In order to build the app for production deployment with base URL:

* `ng build --prod --base-href /epf/`
* Copy files from `eida-portal-frontend/dist/eida-portal/` and put them on the server