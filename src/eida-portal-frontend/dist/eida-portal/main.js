(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dashboard/dashboard.component */ "./src/app/dashboard/dashboard.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_2__["DashboardComponent"] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar is-light\">\n  <div class=\"navbar-brand\">\n    <a class=\"navbar-item\">\n      <h1 class=\"title\">EIDA Portal</h1>\n    </a>\n    <div class=\"navbar-burger burger\" data-target=\"navbarExampleTransparentExample\">\n      <span></span>\n      <span></span>\n      <span></span>\n    </div>\n  </div>\n\n  <div id=\"navbarExampleTransparentExample\" class=\"navbar-menu\">\n    <div class=\"navbar-start\">\n      <a class=\"navbar-item\">\n        <span class=\"icon\">\n          <i class=\"fas fa-home\"></i>\n        </span>\n        <span>\n          Dashboard\n        </span>\n      </a>\n      <div class=\"navbar-item has-dropdown is-hoverable\">\n        <a class=\"navbar-link\">\n          <span class=\"icon\">\n            <i class=\"fas fa-compass\"></i>\n          </span>\n          <span>\n            Menu\n          </span>\n        </a>\n        <div class=\"navbar-dropdown is-boxed\">\n          <a class=\"navbar-item\">\n            Menu entry 1\n          </a>\n          <a class=\"navbar-item\">\n            Menu entry 2\n          </a>\n          <hr class=\"navbar-divider\">\n          <a class=\"navbar-item\">\n            Menu entry 3\n          </a>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"navbar-end\">\n      <div class=\"navbar-item\">\n        <div class=\"field is-grouped\">\n          <p class=\"control\">\n            <a class=\"bd-tw-button button\">\n              <span class=\"icon\"><i class=\"fas fa-coffee\"></i></span>\n              <span>\n                Button 1\n              </span>\n            </a>\n          </p>\n          <p class=\"control\">\n            <a class=\"button is-info\">\n              <span class=\"icon\"><i class=\"fas fa-cog\"></i></span>\n              <span>Button 2</span>\n            </a>\n          </p>\n        </div>\n      </div>\n    </div>\n  </div>\n</nav>\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'eida-portal';
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _stations_stations_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./stations/stations.component */ "./src/app/stations/stations.component.ts");
/* harmony import */ var _events_events_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./events/events.component */ "./src/app/events/events.component.ts");
/* harmony import */ var _console_console_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./console/console.component */ "./src/app/console/console.component.ts");
/* harmony import */ var _map_map_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./map/map.component */ "./src/app/map/map.component.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! .//app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./dashboard/dashboard.component */ "./src/app/dashboard/dashboard.component.ts");
/* harmony import */ var _request_request_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./request/request.component */ "./src/app/request/request.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _stations_stations_component__WEBPACK_IMPORTED_MODULE_5__["StationsComponent"],
                _events_events_component__WEBPACK_IMPORTED_MODULE_6__["EventsComponent"],
                _console_console_component__WEBPACK_IMPORTED_MODULE_7__["ConsoleComponent"],
                _map_map_component__WEBPACK_IMPORTED_MODULE_8__["MapComponent"],
                _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_10__["DashboardComponent"],
                _request_request_component__WEBPACK_IMPORTED_MODULE_11__["RequestComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_9__["AppRoutingModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/console.service.ts":
/*!************************************!*\
  !*** ./src/app/console.service.ts ***!
  \************************************/
/*! exports provided: ConsoleService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConsoleService", function() { return ConsoleService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ConsoleService = /** @class */ (function () {
    function ConsoleService() {
        this.messages = [];
    }
    ConsoleService.prototype.add = function (message) {
        this.messages.push(new Date().toLocaleString() + ' - ' + message);
    };
    ConsoleService.prototype.clear = function () {
        this.messages = [];
    };
    ConsoleService.prototype.getMsgCount = function () {
        return this.messages.length;
    };
    ConsoleService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], ConsoleService);
    return ConsoleService;
}());



/***/ }),

/***/ "./src/app/console/console.component.html":
/*!************************************************!*\
  !*** ./src/app/console/console.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<button class=\"button is-danger is-outlined is-fullwidth\" (click)=\"consoleService.clear()\">Clear the console</button>\n<table class=\"table table-sm table-striped\" width=\"100%\">\n  <tbody>\n    <tr *ngFor='let message of consoleService.messages'>\n      <td>{{ message }}</td>\n    </tr>\n  </tbody>\n</table>"

/***/ }),

/***/ "./src/app/console/console.component.ts":
/*!**********************************************!*\
  !*** ./src/app/console/console.component.ts ***!
  \**********************************************/
/*! exports provided: ConsoleComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConsoleComponent", function() { return ConsoleComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _console_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../console.service */ "./src/app/console.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ConsoleComponent = /** @class */ (function () {
    function ConsoleComponent(consoleService) {
        this.consoleService = consoleService;
    }
    ConsoleComponent.prototype.ngOnInit = function () {
        this.consoleService.add('Console initiated');
    };
    ConsoleComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-console',
            template: __webpack_require__(/*! ./console.component.html */ "./src/app/console/console.component.html"),
        }),
        __metadata("design:paramtypes", [_console_service__WEBPACK_IMPORTED_MODULE_1__["ConsoleService"]])
    ], ConsoleComponent);
    return ConsoleComponent;
}());



/***/ }),

/***/ "./src/app/dashboard/dashboard.component.html":
/*!****************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<style>\n  input[type=\"radio\"],\n    .tab-pane {\n      display: none;\n    }\n  \n    #stations:checked~.tab-content>.content-stations,\n    #events:checked~.tab-content>.content-events,\n    #request:checked~.tab-content>.content-request,\n    #console:checked~.tab-content>.content-console {\n      display: block;\n    }\n  </style>\n\n<div class=\"section\">\n  <div class=\"tile is-ancestor\">\n    <div class=\"tile is-6 is-vertical is-parent\">\n      <!-- Nav tabs -->\n      <input type=\"radio\" id=\"stations\" name=\"nav-tab\">\n      <input type=\"radio\" id=\"events\" name=\"nav-tab\">\n      <input type=\"radio\" id=\"request\" name=\"nav-tab\">\n      <input type=\"radio\" id=\"console\" name=\"nav-tab\" checked=\"checked\">\n\n      <div class=\"tabs is-boxed is-fullwidth\">\n        <ul>\n          <li id=\"stationsTab\">\n            <label for=\"stations\">\n              <a (click)=\"tabSelected('#stationsTab')\">\n                <span class=\"icon\"><i class=\"fas fa-globe-americas\"></i></span>\n                <span>Stations</span>\n              </a>\n            </label>\n          </li>\n          <li id=\"eventsTab\">\n            <label for=\"events\">\n              <a (click)=\"tabSelected('#eventsTab')\">\n                <span class=\"icon\"><i class=\"fas fa-map\"></i></span>\n                <span>Events</span>\n              </a>\n            </label>\n          </li>\n          <li id=\"requestTab\">\n            <label for=\"request\">\n              <a (click)=\"tabSelected('#requestTab')\">\n                <span class=\"icon\"><i class=\"fas fa-download\"></i></span>\n                <span>Request</span>\n              </a>\n            </label>\n          </li>\n          <li class=\"is-active\" id=\"consoleTab\">\n            <label for=\"console\">\n              <a (click)=\"tabSelected('#consoleTab')\">\n                <span class=\"icon\"><i class=\"fas fa-terminal\"></i></span>\n                <span>Console ({{consoleService.getMsgCount()}})</span>\n              </a>\n            </label>\n          </li>\n        </ul>\n      </div>\n\n      <!-- Tab panes -->\n      <div class=\"tab-content\">\n        <div class=\"tab-pane content-stations\">\n          <div class=\"tile is-child\">\n            <app-stations></app-stations>\n          </div>\n        </div>\n        <div class=\"tab-pane content-events\">\n          <div class=\"tile is-child\">\n            <app-events></app-events>\n          </div>\n        </div>\n        <div class=\"tab-pane content-request\">\n          <app-request></app-request>\n        </div>\n        <div class=\"tab-pane content-console\">\n          <app-console></app-console>\n        </div>\n      </div>\n    </div>\n    <div class=\"tile is-parent\">\n      <div class=\"tile is-child\">\n        <app-map></app-map>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.ts":
/*!**************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.ts ***!
  \**************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _console_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../console.service */ "./src/app/console.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(consoleService) {
        this.consoleService = consoleService;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.consoleService.add('Dashboard initiated');
    };
    DashboardComponent.prototype.tabSelected = function (s) {
        $('li').removeClass('is-active');
        $(s).addClass('is-active');
    };
    DashboardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(/*! ./dashboard.component.html */ "./src/app/dashboard/dashboard.component.html"),
        }),
        __metadata("design:paramtypes", [_console_service__WEBPACK_IMPORTED_MODULE_1__["ConsoleService"]])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/eida.service.ts":
/*!*********************************!*\
  !*** ./src/app/eida.service.ts ***!
  \*********************************/
/*! exports provided: EidaService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EidaService", function() { return EidaService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _console_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./console.service */ "./src/app/console.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EidaService = /** @class */ (function () {
    function EidaService(http, consoleService) {
        this.http = http;
        this.consoleService = consoleService;
        this.httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({ 'Content-Type': 'application/json' })
        };
    }
    EidaService.prototype.log = function (message) {
        this.consoleService.add("EidaService: " + message);
    };
    /**
    * Handle Http operation that failed.
    * Let the app continue.
    * @param operation - name of the operation that failed
    * @param result - optional value to return as the observable result
    */
    EidaService.prototype.handleError = function (operation, result) {
        var _this = this;
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            _this.log(operation + " failed: " + error.message);
            // Let the app keep running by returning an empty result.
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(result);
        };
    };
    EidaService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"],
            _console_service__WEBPACK_IMPORTED_MODULE_3__["ConsoleService"]])
    ], EidaService);
    return EidaService;
}());



/***/ }),

/***/ "./src/app/events/events.component.html":
/*!**********************************************!*\
  !*** ./src/app/events/events.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"columns\">\n  <div class=\"column is-5\">\n    <div class=\"field is-horizontal\">\n      <div class=\"field-label is-normal\">\n        <label class=\"label\">Catalog</label>\n      </div>\n      <div class=\"field-body\">\n        <div class=\"field\">\n          <div class=\"select\">\n            <select [(ngModel)]=\"eventsModel.selectedCatalog\">\n              <option *ngFor=\"let c of eventsModel.catalogs\" [ngValue]=\"c\">{{c.name}}</option>\n            </select>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"field is-horizontal\">\n      <div class=\"field-label\">\n        <label class=\"label\">Minimum magnitude</label>\n      </div>\n      <div class=\"field-body\">\n        <div class=\"field\">\n          <div class=\"control\">\n            <input [(ngModel)]=\"eventsModel.minimumMagnitude\" class=\"input\" type=\"text\" placeholder=\"0\">\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"field is-horizontal\">\n      <div class=\"field-label is-normal\">\n        <label class=\"label\">Date from</label>\n      </div>\n      <div class=\"field-body\">\n        <div class=\"field\">\n          <div class=\"control\">\n            <input [(ngModel)]=\"eventsModel.dateFrom\" class=\"input\" type=\"text\" placeholder=\"1\">\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"field is-horizontal\">\n      <div class=\"field-label is-normal\">\n        <label class=\"label\">Date to</label>\n      </div>\n      <div class=\"field-body\">\n        <div class=\"field\">\n          <div class=\"control\">\n            <input [(ngModel)]=\"eventsModel.dateTo\" class=\"input\" type=\"text\" placeholder=\"1\">\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"field is-horizontal\">\n      <div class=\"field-label is-normal\">\n        <label class=\"label\">Depth from</label>\n      </div>\n      <div class=\"field-body\">\n        <div class=\"field\">\n          <div class=\"control\">\n            <input [(ngModel)]=\"eventsModel.depthFrom\" class=\"input\" type=\"text\" placeholder=\"1\">\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"field is-horizontal\">\n      <div class=\"field-label is-normal\">\n        <label class=\"label\">Depth to</label>\n      </div>\n      <div class=\"field-body\">\n        <div class=\"field\">\n          <div class=\"control\">\n            <input [(ngModel)]=\"eventsModel.depthTo\" class=\"input\" type=\"text\" placeholder=\"1\">\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"field is-horizontal\">\n      <div class=\"field-label is-normal\">\n        <label class=\"label\">Coordinate (N)</label>\n      </div>\n      <div class=\"field-body\">\n        <div class=\"field\">\n          <div class=\"control\">\n            <input [(ngModel)]=\"eventsModel.coordinateN\" class=\"input\" type=\"text\" placeholder=\"1\">\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"field is-horizontal\">\n      <div class=\"field-label is-normal\">\n        <label class=\"label\">Coordinate (S)</label>\n      </div>\n      <div class=\"field-body\">\n        <div class=\"field\">\n          <div class=\"control\">\n            <input [(ngModel)]=\"eventsModel.coordinateS\" class=\"input\" type=\"text\" placeholder=\"1\">\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"field is-horizontal\">\n      <div class=\"field-label is-normal\">\n        <label class=\"label\">Coordinate (E)</label>\n      </div>\n      <div class=\"field-body\">\n        <div class=\"field\">\n          <div class=\"control\">\n            <input [(ngModel)]=\"eventsModel.coordinateE\" class=\"input\" type=\"text\" placeholder=\"1\">\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"field is-horizontal\">\n      <div class=\"field-label is-normal\">\n        <label class=\"label\">Coordinate (W)</label>\n      </div>\n      <div class=\"field-body\">\n        <div class=\"field\">\n          <div class=\"control\">\n            <input [(ngModel)]=\"eventsModel.coordinateW\" class=\"input\" type=\"text\" placeholder=\"1\">\n          </div>\n        </div>\n      </div>\n    </div>\n    <hr>\n    <div class=\"columns\">\n      <div class=\"column is-half\">\n        <span class=\"button is-danger is-fullwidth\" (click)=\"reset();\">Reset</span>\n      </div>\n      <div class=\"column is-half\">\n        <span class=\"button is-success is-fullwidth\" (click)=\"search();\">Search</span>\n      </div>\n    </div>\n\n  </div>\n  <div class=\"column\">\n    <article class=\"message is-info\">\n      <div class=\"message-body\">\n        Selected events will appear here.\n      </div>\n    </article>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/events/events.component.ts":
/*!********************************************!*\
  !*** ./src/app/events/events.component.ts ***!
  \********************************************/
/*! exports provided: EventsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventsComponent", function() { return EventsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _console_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../console.service */ "./src/app/console.service.ts");
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models */ "./src/app/models.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EventsComponent = /** @class */ (function () {
    function EventsComponent(consoleService) {
        this.consoleService = consoleService;
        this.eventsModel = new _models__WEBPACK_IMPORTED_MODULE_2__["EventsModel"]();
    }
    EventsComponent.prototype.ngOnInit = function () {
        this.consoleService.add('Events initiated');
    };
    EventsComponent.prototype.search = function () {
        this.consoleService.add('Events/search clicked >>> ' + this.eventsModel.toString());
    };
    EventsComponent.prototype.reset = function () {
        this.eventsModel = new _models__WEBPACK_IMPORTED_MODULE_2__["EventsModel"]();
        this.consoleService.add('Events/reset clicked');
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], EventsComponent.prototype, "eventsModel", void 0);
    EventsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-events',
            template: __webpack_require__(/*! ./events.component.html */ "./src/app/events/events.component.html"),
        }),
        __metadata("design:paramtypes", [_console_service__WEBPACK_IMPORTED_MODULE_1__["ConsoleService"]])
    ], EventsComponent);
    return EventsComponent;
}());



/***/ }),

/***/ "./src/app/map.service.ts":
/*!********************************!*\
  !*** ./src/app/map.service.ts ***!
  \********************************/
/*! exports provided: MapService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapService", function() { return MapService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _eida_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eida.service */ "./src/app/eida.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MapService = /** @class */ (function () {
    function MapService(eidaService) {
        this.eidaService = eidaService;
    }
    MapService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_eida_service__WEBPACK_IMPORTED_MODULE_1__["EidaService"]])
    ], MapService);
    return MapService;
}());



/***/ }),

/***/ "./src/app/map/map.component.css":
/*!***************************************!*\
  !*** ./src/app/map/map.component.css ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".ol-popup {\n  position: absolute;\n  background-color: white;\n  -webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));\n  filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));\n  padding: 15px;\n  border-radius: 10px;\n  border: 1px solid #cccccc;\n  bottom: 12px;\n  left: -50px;\n  width: 300px;\n}\n\n.ol-popup:after,\n.ol-popup:before {\n  top: 100%;\n  border: solid transparent;\n  content: \" \";\n  height: 0;\n  width: 0;\n  position: absolute;\n  pointer-events: none;\n}\n\n.ol-popup:after {\n  border-top-color: white;\n  border-width: 10px;\n  left: 48px;\n  margin-left: -10px;\n}\n\n.ol-popup:before {\n  border-top-color: #cccccc;\n  border-width: 11px;\n  left: 48px;\n  margin-left: -11px;\n}\n\n.ol-popup-closer {\n  text-decoration: none;\n  position: absolute;\n  top: 2px;\n  right: 8px;\n}\n\n.ol-popup-closer:after {\n  content: \"✖\";\n}\n"

/***/ }),

/***/ "./src/app/map/map.component.html":
/*!****************************************!*\
  !*** ./src/app/map/map.component.html ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"map\" class=\"map\">\n  <div id=\"popup\" class=\"ol-popup\">\n    <a id=\"popup-closer\" class=\"ol-popup-closer\"></a>\n    <div id=\"popup-content\"></div>\n  </div>\n</div>\n<div style=\"margin-top: 5px\">\n  <button class=\"button is-fullwidth\" (click)=\"resetMapZoom()\">Reset map zoom</button>\n</div>"

/***/ }),

/***/ "./src/app/map/map.component.ts":
/*!**************************************!*\
  !*** ./src/app/map/map.component.ts ***!
  \**************************************/
/*! exports provided: MapComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapComponent", function() { return MapComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _map_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../map.service */ "./src/app/map.service.ts");
/* harmony import */ var _stations_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../stations.service */ "./src/app/stations.service.ts");
/* harmony import */ var _console_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../console.service */ "./src/app/console.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MapComponent = /** @class */ (function () {
    function MapComponent(mapService, stationsService, consoleService) {
        this.mapService = mapService;
        this.stationsService = stationsService;
        this.consoleService = consoleService;
        this._vectorSource = new ol.source.Vector({
            features: []
        });
        this.vectorLayer = new ol.layer.Vector({
            source: this._vectorSource
        });
    }
    MapComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._map = new ol.Map({
            target: document.getElementById('map'),
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM({
                        "url": "https://maps-cdn.salesboard.biz/styles/klokantech-3d-gl-style/{z}/{x}/{y}.png"
                    })
                }), this.vectorLayer
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([5.178029, 52.101568]),
                zoom: 2
            })
        });
        var popupContainer = document.getElementById('popup');
        var popupContent = document.getElementById('popup-content');
        var popupCloser = document.getElementById('popup-closer');
        var popupOverlay = new ol.Overlay({
            element: popupContainer
        });
        this._map.addOverlay(popupOverlay);
        this._map.on('click', function (e) {
            var feature = e.map.forEachFeatureAtPixel(e.pixel, function (feature) {
                return feature;
            });
            if (feature) {
                var coordinates = feature.getGeometry().getCoordinates();
                popupOverlay.setPosition(coordinates);
                popupContent.innerHTML = feature.get('name');
            }
            else {
                popupCloser.click();
            }
        });
        popupCloser.onclick = function () {
            popupOverlay.setPosition(undefined);
            popupCloser.blur();
            return false;
        };
        // change mouse cursor when over marker
        this._map.on('pointermove', function (e) {
            if (e.dragging) {
                // $(element).popover('dispose');
                return;
            }
            var pixel = e.map.getEventPixel(e.originalEvent);
            var hit = e.map.hasFeatureAtPixel(pixel);
            e.map.getTarget().style.cursor = hit ? 'pointer' : '';
        });
        // Subscribe to the service to get model changes from the stations component
        this.stationsService.selectedStations.subscribe(function (s) { return _this.updateStationsMap(s); });
        this.stationsService.focuedStation.subscribe(function (s) { return _this.focusStation(s); });
        this.consoleService.add('Map initiated');
    };
    MapComponent.prototype.updateStationsMap = function (stations) {
        this.removeStationMarkers();
        for (var _i = 0, stations_1 = stations; _i < stations_1.length; _i++) {
            var s = stations_1[_i];
            var point = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([+s.lon, +s.lat])),
                name: "<b>Network:</b> " + s.net + "<br><b>Station:</b> " + s.stat + "<br><b>Name:</b> " + s.name
            });
            point.setStyle(new ol.style.Style({
                image: new ol.style.Icon({
                    src: (s.selected ? "../../assets/img/markers/triangle-green.png" : "../../assets/img/markers/triangle-grey.png")
                })
            })), this._vectorSource.addFeature(point);
        }
    };
    MapComponent.prototype.focusStation = function (s) {
        this._map.getView().animate({
            center: ol.proj.fromLonLat([+s.lon, +s.lat]),
            duration: 1000,
            zoom: 13
        });
    };
    MapComponent.prototype.resetMapZoom = function () {
        this._map.getView().animate({
            center: ol.proj.fromLonLat([5.178029, 52.101568]),
            duration: 1000,
            zoom: 2
        });
    };
    MapComponent.prototype.removeStation = function (s) {
        console.log(s.stat);
    };
    MapComponent.prototype.toggleStationSelection = function (s) {
        console.log(s);
    };
    MapComponent.prototype.removeStationMarkers = function () {
        this._vectorSource.clear();
    };
    MapComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-map',
            template: __webpack_require__(/*! ./map.component.html */ "./src/app/map/map.component.html"),
            styles: [__webpack_require__(/*! ./map.component.css */ "./src/app/map/map.component.css")]
        }),
        __metadata("design:paramtypes", [_map_service__WEBPACK_IMPORTED_MODULE_1__["MapService"],
            _stations_service__WEBPACK_IMPORTED_MODULE_2__["StationsService"],
            _console_service__WEBPACK_IMPORTED_MODULE_3__["ConsoleService"]])
    ], MapComponent);
    return MapComponent;
}());



/***/ }),

/***/ "./src/app/models.ts":
/*!***************************!*\
  !*** ./src/app/models.ts ***!
  \***************************/
/*! exports provided: StationsModel, EventsModel, MapModel, RequestModel, FdsnNetwork, FdsnStation, FdsnStationExt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StationsModel", function() { return StationsModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventsModel", function() { return EventsModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapModel", function() { return MapModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestModel", function() { return RequestModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FdsnNetwork", function() { return FdsnNetwork; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FdsnStation", function() { return FdsnStation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FdsnStationExt", function() { return FdsnStationExt; });
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var StationsModel = /** @class */ (function () {
    function StationsModel() {
        this.yearFrom = "1900";
        this.yearTo = "2100";
        this.coordinateN = 90.0;
        this.coordinateS = -90.0;
        this.coordinateE = 180.0;
        this.coordinateW = -180.0;
        this.selectedNetwork = 'All';
        this.selectedStation = 'All';
    }
    StationsModel.prototype.toString = function () {
        return "Year: " + this.yearFrom + " - " + this.yearTo + ", \n        coordinates: " + this.coordinateN + "N, " + this.coordinateS + "S, " + this.coordinateE + "E, " + this.coordinateW + "W,\n        network: " + this.selectedNetwork.code + ", station: " + this.selectedStation.stat;
    };
    return StationsModel;
}());

var EventsModel = /** @class */ (function () {
    function EventsModel() {
        this.catalogs = [
            { 'id': 0, 'name': "EIDA" },
            { 'id': 1, 'name': "IRIS" }
        ];
        this.minimumMagnitude = 0.0;
        this.dateFrom = "2017-01-01";
        this.dateTo = "2018-01-01";
        this.depthFrom = 0;
        this.depthTo = 999;
        this.coordinateN = 90.0;
        this.coordinateS = -90.0;
        this.coordinateE = 180.0;
        this.coordinateW = -180.0;
        this.selectedCatalog = this.catalogs[0];
    }
    EventsModel.prototype.toString = function () {
        return "Catalog: " + this.selectedCatalog.name + ",\n        minimum magnitude: " + this.minimumMagnitude + ",\n        date: " + this.dateFrom + " - " + this.dateTo + ",\n        depth: " + this.depthFrom + " - " + this.depthTo + ",\n        coordinates: " + this.coordinateN + "N, " + this.coordinateS + "S, " + this.coordinateE + "E, " + this.coordinateW + "W";
    };
    return EventsModel;
}());

var MapModel = /** @class */ (function () {
    function MapModel() {
    }
    return MapModel;
}());

var RequestModel = /** @class */ (function () {
    function RequestModel() {
        this.datetimeFrom = "2017-01-01T12:00:00";
        this.datetimeTo = "2018-01-01T12:00:00";
        this.fdsnRequestType = [
            { 'id': 0, 'name': 'Waveform (Mini-SEED)' },
            { 'id': 1, 'name': 'Metadata (StationXML)' },
            { 'id': 2, 'name': 'Metadata (Text)' }
        ];
        this.selectedFdsnRequestType = this.fdsnRequestType[0];
    }
    RequestModel.prototype.toString = function () {
        return "Datetime: " + this.datetimeFrom + " - " + this.datetimeTo + ",\n        request type: " + this.selectedFdsnRequestType.name;
    };
    return RequestModel;
}());

var FdsnNetwork = /** @class */ (function () {
    function FdsnNetwork() {
        this.code = 'ALL';
        this.desc = 'ALL';
        this.start = '';
        this.end = '';
        this.stations = [];
    }
    return FdsnNetwork;
}());

var FdsnStation = /** @class */ (function () {
    function FdsnStation() {
        this.net = 'ALL';
        this.stat = 'ALL';
        this.lat = '0.0';
        this.lon = '0.0';
        this.elev = '0.0';
        this.name = 'All stations';
        this.start = '';
        this.end = '';
    }
    return FdsnStation;
}());

var FdsnStationExt = /** @class */ (function (_super) {
    __extends(FdsnStationExt, _super);
    function FdsnStationExt() {
        var _this = _super.call(this) || this;
        _this.selected = true;
        return _this;
    }
    return FdsnStationExt;
}(FdsnStation));



/***/ }),

/***/ "./src/app/paginator.service.ts":
/*!**************************************!*\
  !*** ./src/app/paginator.service.ts ***!
  \**************************************/
/*! exports provided: PaginatorService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaginatorService", function() { return PaginatorService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PaginatorService = /** @class */ (function () {
    function PaginatorService() {
        this._currentPage = 0;
        this._pageSize = 15;
        this._pages = new Array();
    }
    PaginatorService.prototype.paginate = function (data) {
        this._pages = new Array();
        for (var i = 0; i < data.length; i += this._pageSize) {
            var tmpSlice = data.slice(i, i + this._pageSize);
            if (tmpSlice.length > 0) {
                this._pages.push(tmpSlice);
            }
        }
    };
    PaginatorService.prototype.getTotalPages = function () {
        return this._pages.length;
    };
    PaginatorService.prototype.getPages = function () {
        return this._pages;
    };
    PaginatorService.prototype.getPage = function (i) {
        this._currentPage = i;
        return this._pages[i];
    };
    PaginatorService.prototype.getCurrentPage = function () {
        return this._pages[this._currentPage];
    };
    PaginatorService.prototype.getCurrentPageNumber = function () {
        return this._currentPage + 1;
    };
    PaginatorService.prototype.getPreviousPageNumber = function () {
        return this.getCurrentPageNumber() - 1;
    };
    PaginatorService.prototype.getNextPageNumber = function () {
        return this.getCurrentPageNumber() + 1;
    };
    PaginatorService.prototype.getLastPageNumber = function () {
        return this._pages.length;
    };
    PaginatorService.prototype.getNextPage = function () {
        if (this._currentPage < this._pages.length - 1) {
            this._currentPage++;
        }
        return this._pages[this._currentPage];
    };
    PaginatorService.prototype.getPreviousPage = function () {
        if (this._currentPage > 0) {
            this._currentPage--;
        }
        return this._pages[this._currentPage];
    };
    PaginatorService.prototype.getFirstPage = function () {
        this._currentPage = 0;
        return this._pages[this._currentPage];
    };
    PaginatorService.prototype.getLastPage = function () {
        this._currentPage = this._pages.length - 1;
        return this._pages[this._currentPage];
    };
    PaginatorService.prototype.nextPageExists = function () {
        return this._currentPage < this._pages.length - 1;
    };
    PaginatorService.prototype.previousPageExists = function () {
        return this._currentPage > 0;
    };
    PaginatorService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], PaginatorService);
    return PaginatorService;
}());



/***/ }),

/***/ "./src/app/request/request.component.html":
/*!************************************************!*\
  !*** ./src/app/request/request.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"field\">\n  <label class=\"label\">Datetime from</label>\n  <div class=\"control\">\n    <input [(ngModel)]=\"requestModel.datetimeFrom\" class=\"input\" type=\"text\" placeholder=\"YYYY-MM-DDTHH:MM:SS\">\n  </div>\n  <p class=\"help\">Example: \"2017-01-01T12:00:00\"</p>\n</div>\n\n<div class=\"field\">\n  <label class=\"label\">Datetime to</label>\n  <div class=\"control\">\n    <input [(ngModel)]=\"requestModel.datetimeTo\" class=\"input\" type=\"text\" placeholder=\"YYYY-MM-DDTHH:MM:SS\">\n  </div>\n  <p class=\"help\">Example: \"2018-01-01T12:00:00\"</p>\n</div>\n\n<div class=\"field is-horizontal\">\n  <div class=\"field-label is-normal\">\n    <label class=\"label\">FDSN request type</label>\n  </div>\n  <div class=\"field-body\">\n    <div class=\"field\">\n      <div class=\"select\">\n        <select [(ngModel)]=\"requestModel.selectedFdsnRequestType\">\n          <option *ngFor=\"let t of requestModel.fdsnRequestType\" [ngValue]=\"t\">{{t.name}}</option>\n        </select>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"columns\">\n  <div class=\"column is-half\">\n    <span class=\"button is-info is-fullwidth\" (click)=\"review();\">Review</span>\n  </div>\n  <div class=\"column is-half\">\n    <span class=\"button is-success is-fullwidth\" (click)=\"submit();\">Submit</span>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/request/request.component.ts":
/*!**********************************************!*\
  !*** ./src/app/request/request.component.ts ***!
  \**********************************************/
/*! exports provided: RequestComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestComponent", function() { return RequestComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _console_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../console.service */ "./src/app/console.service.ts");
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models */ "./src/app/models.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RequestComponent = /** @class */ (function () {
    function RequestComponent(consoleService) {
        this.consoleService = consoleService;
        this.requestModel = new _models__WEBPACK_IMPORTED_MODULE_2__["RequestModel"]();
    }
    RequestComponent.prototype.ngOnInit = function () {
        this.consoleService.add('Request initiated');
    };
    RequestComponent.prototype.review = function () {
        this.consoleService.add('Request/review clicked');
    };
    RequestComponent.prototype.submit = function () {
        this.consoleService.add('Request/submit clicked >>> ' + this.requestModel.toString());
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], RequestComponent.prototype, "requestModel", void 0);
    RequestComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-request',
            template: __webpack_require__(/*! ./request.component.html */ "./src/app/request/request.component.html"),
        }),
        __metadata("design:paramtypes", [_console_service__WEBPACK_IMPORTED_MODULE_1__["ConsoleService"]])
    ], RequestComponent);
    return RequestComponent;
}());



/***/ }),

/***/ "./src/app/stations.service.ts":
/*!*************************************!*\
  !*** ./src/app/stations.service.ts ***!
  \*************************************/
/*! exports provided: StationsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StationsService", function() { return StationsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _eida_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./eida.service */ "./src/app/eida.service.ts");
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./models */ "./src/app/models.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var StationsService = /** @class */ (function () {
    function StationsService(eidaService) {
        this.eidaService = eidaService;
        this.allStations = new Array();
        this.selectedStations = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.focuedStation = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this._mapStations = new Array();
        this.networksUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].networksUrl;
        this.stationsUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].stationsUrl;
        this.networksStationsUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].networksStationsUrl;
    }
    StationsService.prototype.addAllStations = function (fs) {
        for (var _i = 0, fs_1 = fs; _i < fs_1.length; _i++) {
            var f = fs_1[_i];
            var tmp = new _models__WEBPACK_IMPORTED_MODULE_4__["FdsnStationExt"]();
            tmp.net = f.net;
            tmp.stat = f.stat;
            tmp.lat = f.lat;
            tmp.lon = f.lon;
            tmp.elev = f.elev;
            tmp.name = f.name;
            tmp.start = f.start;
            tmp.end = f.end;
            tmp.selected = true;
            this.allStations.push(tmp);
        }
    };
    StationsService.prototype.updateStations = function (s) {
        this.selectedStations.next(s);
    };
    StationsService.prototype.updateFocusedStation = function (s) {
        this.focuedStation.next(s);
    };
    StationsService.prototype.getNetworks = function () {
        var _this = this;
        return this.eidaService.http.get(this.networksUrl)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(function (_) { return _this.eidaService.log('fetched networks data'); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(this.eidaService.handleError('getNetworks', [])));
    };
    StationsService.prototype.getStations = function () {
        var _this = this;
        return this.eidaService.http.get(this.stationsUrl)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(function (_) { return _this.eidaService.log('fetched stations data'); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(this.eidaService.handleError('getStations', [])));
    };
    // Add selected station(s) to map and notify subscribers
    StationsService.prototype.addSelectedStation = function (s) {
        if (s.selectedNetwork === 'All' && s.selectedStation === 'All') {
            this._mapStations = this.allStations;
        }
        else if (s.selectedStation !== 'All'
            && !this._mapStations.find(function (m) { return m.net === s.selectedStation.net && m.stat === s.selectedStation.stat; })) {
            this._mapStations.push(s.selectedStation);
        }
        else {
            var _loop_1 = function (st) {
                if (!this_1._mapStations.find(function (x) { return x.net === st.net && x.stat === st.stat; })) {
                    this_1._mapStations.push(st);
                }
            };
            var this_1 = this;
            for (var _i = 0, _a = this.allStations.filter(function (m) { return m.net === s.selectedNetwork.code; }); _i < _a.length; _i++) {
                var st = _a[_i];
                _loop_1(st);
            }
        }
        this.updateStations(this._mapStations);
    };
    StationsService.prototype.toggleStationSelection = function (s) {
        this._mapStations.find(function (p) { return p.net === s.net && p.stat === s.stat; }).selected = !s.selected;
        this.updateStations(this._mapStations);
    };
    StationsService.prototype.removeStationSelection = function (s) {
        var i = this._mapStations.indexOf(this._mapStations.find(function (p) { return p.net === s.net && p.stat === s.stat; }));
        this._mapStations.splice(i, 1);
        this.updateStations(this._mapStations);
    };
    StationsService.prototype.removeAllStations = function () {
        this._mapStations.splice(0, this._mapStations.length);
        this.updateStations(this._mapStations);
    };
    StationsService.prototype.searchNetwork = function (term) {
        var _this = this;
        if (!term.trim()) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])([]);
        }
        return this.eidaService.http.get(this.networksUrl)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(function (_) { return _this.eidaService.log("found heroes matching \"" + term + "\""); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(this.eidaService.handleError('searchNetwork', [])));
    };
    StationsService.prototype.getNetworksStations = function () {
        var _this = this;
        return this.eidaService.http.get(this.networksStationsUrl)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(function (_) { return _this.eidaService.log('fetched networks and stations data'); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(this.eidaService.handleError('getNetworksStations', [])));
    };
    StationsService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_eida_service__WEBPACK_IMPORTED_MODULE_3__["EidaService"]])
    ], StationsService);
    return StationsService;
}());



/***/ }),

/***/ "./src/app/stations/stations.component.html":
/*!**************************************************!*\
  !*** ./src/app/stations/stations.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"columns\">\n  <div class=\"column is-5\">\n    <div class=\"field is-horizontal\">\n      <div class=\"field-label is-normal\">\n        <label class=\"label\">Year from</label>\n      </div>\n      <div class=\"field-body\">\n        <div class=\"field\">\n          <div class=\"control\">\n            <input [(ngModel)]=\"stationsModel.yearFrom\" class=\"input\" type=\"text\" placeholder=\"1980\">\n          </div>\n        </div>\n      </div>\n    </div>\n\n\n    <div class=\"field is-horizontal\">\n      <div class=\"field-label is-normal\">\n        <label class=\"label\">Year to</label>\n      </div>\n      <div class=\"field-body\">\n        <div class=\"field\">\n          <div class=\"control\">\n            <input [(ngModel)]=\"stationsModel.yearTo\" class=\"input\" type=\"text\" placeholder=\"2018\">\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <!-- <div class=\"field is-horizontal\">\n    <div class=\"field-label is-normal\">\n      <label class=\"label\">Network type</label>\n    </div>\n    <div class=\"field-body\">\n      <div class=\"field\">\n        <div class=\"select\">\n          <select [(ngModel)]=\"stationsModel.selectedNetworkType\">\n            <option *ngFor=\"let t of stationsModel.networkTypes\" [ngValue]=\"t\">{{t.name}}</option>\n          </select>\n        </div>\n      </div>\n    </div>\n  </div> -->\n\n    <!-- <div class=\"field is-horizontal\">\n    <div class=\"field-label is-normal\">\n      <label class=\"label\">Network search</label>\n    </div>\n    <div class=\"field-body\">\n      <div class=\"field\">\n        <div class=\"control\">\n          <input #searchBox id=\"search-network\" (keyup)=\"search_network(searchBox.value)\" class=\"input\" type=\"text\">\n        </div>\n      </div>\n    </div>\n  </div>\n  \n  <span *ngFor=\"let n of networks_search$ | async\" class=\"tag\">\n    {{ n.code }} ({{ n.start }})\n  </span> -->\n\n    <div class=\"field is-horizontal\">\n      <div class=\"field-label is-normal\">\n        <label class=\"label\">Network</label>\n      </div>\n      <div class=\"field-body\">\n        <div class=\"field\">\n          <div class=\"select\">\n            <select [(ngModel)]=\"stationsModel.selectedNetwork\" (ngModelChange)=\"networkChanged($event)\" style=\"width:100%;\">\n              <option selected>All</option>\n              <option *ngFor=\"let n of stationsService.allNetworks\" [ngValue]=\"n\">{{n.code}} - ({{n.start}}) -\n                {{n.desc}}</option>\n            </select>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"field is-horizontal\">\n      <div class=\"field-label is-normal\">\n        <label class=\"label\">Station</label>\n      </div>\n      <div class=\"field-body\">\n        <div class=\"field\">\n          <div class=\"select\">\n            <select [(ngModel)]=\"stationsModel.selectedStation\" (ngModelChange)=\"stationChanged($event)\" style=\"width:100%;\">\n              <option selected>All</option>\n              <option *ngFor=\"let s of filteredStations\" [ngValue]=\"s\">{{s.stat}} - {{s.name}} ({{s.start}})</option>\n            </select>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"field is-horizontal\">\n      <div class=\"field-label is-normal\">\n        <label class=\"label\">Coordinate (N)</label>\n      </div>\n      <div class=\"field-body\">\n        <div class=\"field\">\n          <div class=\"control\">\n            <input [(ngModel)]=\"stationsModel.coordinateN\" class=\"input\" type=\"text\" placeholder=\"90\">\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"field is-horizontal\">\n      <div class=\"field-label is-normal\">\n        <label class=\"label\">Coordinate (S)</label>\n      </div>\n      <div class=\"field-body\">\n        <div class=\"field\">\n          <div class=\"control\">\n            <input [(ngModel)]=\"stationsModel.coordinateS\" class=\"input\" type=\"text\" placeholder=\"-90\">\n          </div>\n        </div>\n      </div>\n    </div>\n\n\n    <div class=\"field is-horizontal\">\n      <div class=\"field-label is-normal\">\n        <label class=\"label\">Coordinate (E)</label>\n      </div>\n      <div class=\"field-body\">\n        <div class=\"field\">\n          <div class=\"control\">\n            <input [(ngModel)]=\"stationsModel.coordinateE\" class=\"input\" type=\"text\" placeholder=\"180\">\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"field is-horizontal\">\n      <div class=\"field-label is-normal\">\n        <label class=\"label\">Coordinate (W)</label>\n      </div>\n      <div class=\"field-body\">\n        <div class=\"field\">\n          <div class=\"control\">\n            <input [(ngModel)]=\"stationsModel.coordinateW\" class=\"input\" type=\"text\" placeholder=\"-180\">\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"columns\">\n      <div class=\"column is-half\">\n        <button class=\"button is-danger is-fullwidth\" (click)=\"reset();\">Reset</button>\n      </div>\n      <div class=\"column is-half\">\n        <button class=\"button is-success is-fullwidth\" (click)=\"add();\">Add</button>\n      </div>\n    </div>\n    <div *ngIf=\"paginator.getTotalPages() > 0\">\n      <button class=\"button is-warning is-fullwidth\" (click)=\"removeAllStations();\">Remove all stations ({{\n        selectedStations.length }})</button>\n    </div>\n  </div>\n  <!-- List of stations -->\n  <div class=\"column\">\n    <article *ngIf=\"paginator.getTotalPages() === 0\" class=\"message is-info\">\n      <div class=\"message-body\">\n        Selected stations will appear here.\n      </div>\n    </article>\n    <div *ngIf=\"paginator.getTotalPages() > 0\">\n      <nav class=\"pagination is-right\" role=\"navigation\" aria-label=\"pagination\">\n        <a class=\"pagination-previous\" id=\"previousPageButton\" (click)=\"paginator.getPreviousPage()\" [attr.disabled]=\"paginator.previousPageExists() ? null : true\">Previous</a>\n        <a class=\"pagination-next\" id=\"nextPageButton\" (click)=\"paginator.getNextPage()\" [attr.disabled]=\"paginator.nextPageExists() ? null : true\">Next</a>\n        <ul class=\"pagination-list\">\n          <li><a *ngIf=\"paginator.previousPageExists()\" class=\"pagination-link\" aria-label=\"Goto page 1\" (click)=\"paginator.getFirstPage()\">1</a></li>\n          <li><span *ngIf=\"paginator.previousPageExists()\" class=\"pagination-ellipsis\">&hellip;</span></li>\n          <!-- <li><a *ngIf=\"paginator.previousPageExists()\" class=\"pagination-link\" aria-label=\"Goto page 45\">45</a></li> -->\n          <li><a class=\"pagination-link is-current\" aria-label=\"Page 46\" aria-current=\"page\">{{paginator.getCurrentPageNumber()}}</a></li>\n          <!-- <li><a *ngIf=\"paginator.nextPageExists()\" class=\"pagination-link\" aria-label=\"Goto page 47\">47</a></li> -->\n          <li><span *ngIf=\"paginator.nextPageExists()\" class=\"pagination-ellipsis\">&hellip;</span></li>\n          <li><a *ngIf=\"paginator.nextPageExists()\" class=\"pagination-link\" aria-label=\"Goto page 86\" (click)=\"paginator.getLastPage()\">{{paginator.getLastPageNumber()}}</a></li>\n        </ul>\n      </nav>\n      <hr>\n      <table class=\"table is-fullwidth\" id=\"stationsTable\">\n        <tbody>\n          <tr *ngFor=\"let station of paginator.getCurrentPage()\">\n            <td>\n              <a (click)=\"focusOnStation(station)\">{{station.net}} / {{station.stat}}</a>\n              <p class=\"is-size-7\">{{station.name}}</p>\n            </td>\n            <td>\n              <button style=\"width: 100%;\" (click)=\"stationsService.toggleStationSelection(station)\" [ngClass]=\"station.selected ? 'button is-small is-success' : 'button is-small is-light'\">\n                {{station.selected ? \"Selected\" : \"Skipped\"}}</button>\n            </td>\n            <td>\n              <button style=\"width: 100%\" (click)=\"stationsService.removeStationSelection(station)\" class=\"button is-small is-danger is-inverted\">Remove</button>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n\n    </div>\n  </div>\n  <!-- /List of stations -->\n</div>\n"

/***/ }),

/***/ "./src/app/stations/stations.component.ts":
/*!************************************************!*\
  !*** ./src/app/stations/stations.component.ts ***!
  \************************************************/
/*! exports provided: StationsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StationsComponent", function() { return StationsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../models */ "./src/app/models.ts");
/* harmony import */ var _console_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../console.service */ "./src/app/console.service.ts");
/* harmony import */ var _stations_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../stations.service */ "./src/app/stations.service.ts");
/* harmony import */ var _paginator_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../paginator.service */ "./src/app/paginator.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var StationsComponent = /** @class */ (function () {
    function StationsComponent(stationsService, consoleService) {
        this.stationsService = stationsService;
        this.consoleService = consoleService;
        this.stationsModel = new _models__WEBPACK_IMPORTED_MODULE_3__["StationsModel"]();
        this.selectedStations = new Array();
        this.paginator = new _paginator_service__WEBPACK_IMPORTED_MODULE_6__["PaginatorService"]();
        this.searchTerms = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    }
    StationsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.stationsService.getNetworks().subscribe(function (n) { return _this.stationsService.allNetworks = n; });
        this.stationsService.getStations().subscribe(function (s) { return _this.stationsService.addAllStations(s); });
        this.consoleService.add('Stations initiated');
        this.networks_search$ = this.searchTerms.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["debounceTime"])(300), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(function (term) { return _this.stationsService.searchNetwork(term); }));
        this.stationsService.selectedStations.subscribe(function (s) { return _this.updateSelectedStationsTable(s); });
    };
    StationsComponent.prototype.search_network = function (term) {
        this.searchTerms.next(term);
    };
    StationsComponent.prototype.allNetworks = function () {
        this.stationsModel.selectedNetwork = new _models__WEBPACK_IMPORTED_MODULE_3__["FdsnNetwork"]();
    };
    StationsComponent.prototype.allStations = function () {
        this.stationsModel.selectedNetwork = new _models__WEBPACK_IMPORTED_MODULE_3__["FdsnNetwork"]();
        this.stationsModel.selectedStation = new _models__WEBPACK_IMPORTED_MODULE_3__["FdsnStationExt"]();
        this.filteredStations = this.stationsService.allStations;
    };
    StationsComponent.prototype.networkChanged = function (n) {
        if (n === 'All') {
            this.filteredStations = this.stationsService.allStations;
        }
        else {
            this.stationsModel.selectedNetwork = n;
            this.filteredStations = this.stationsService.allStations.filter(function (s) { return s.net === n.code; });
        }
    };
    StationsComponent.prototype.updateSelectedStationsTable = function (s) {
        this.selectedStations = s;
        this.refreshPaginator();
    };
    StationsComponent.prototype.focusOnStation = function (s) {
        this.stationsService.updateFocusedStation(s);
    };
    StationsComponent.prototype.stationChanged = function (s) {
        this.stationsModel.selectedStation = s;
    };
    StationsComponent.prototype.add = function () {
        this.stationsService.addSelectedStation(this.stationsModel);
    };
    StationsComponent.prototype.reset = function () {
        this.stationsModel = new _models__WEBPACK_IMPORTED_MODULE_3__["StationsModel"]();
    };
    StationsComponent.prototype.removeAllStations = function () {
        this.stationsService.removeAllStations();
    };
    StationsComponent.prototype.refreshPaginator = function () {
        this.paginator.paginate(this.selectedStations);
        this.paginator.getPages();
        // $('#previousPageButton').attr('disabled', true);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], StationsComponent.prototype, "stationsModel", void 0);
    StationsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-stations',
            template: __webpack_require__(/*! ./stations.component.html */ "./src/app/stations/stations.component.html"),
        }),
        __metadata("design:paramtypes", [_stations_service__WEBPACK_IMPORTED_MODULE_5__["StationsService"],
            _console_service__WEBPACK_IMPORTED_MODULE_4__["ConsoleService"]])
    ], StationsComponent);
    return StationsComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false,
    networksUrl: 'http://127.0.0.1:49160/n',
    stationsUrl: 'http://127.0.0.1:49160/s',
    networksStationsUrl: 'http://127.0.0.1:49160/ns'
};
/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /nobackup/users/bienkows/sources/gitlab/eida-portal/src/eida-portal-frontend/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map