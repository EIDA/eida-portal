/**
 * @file Contains SeismoMap classes
 * @author Jordi Domingo Ballesta (KNMI)
 * @author Mathijs Koymans (KNMI)
 * @version 0.3.0
 * @requires OpenLayers v4 (tested with v4.6.5)
 * @requires JQuery for ajax and event listening (tested with v1.12.4)
 * @requires JQuery-CSV for parsing CSV-like text (tested with v0.8.9)
 * @requires Proj4js for EPSG:28992 definition (tested with v2.4.3)
 * @requires DataTables for linked DataTable features (tested with v1.10.10)
 */

/**
 * Creates a typical dynamic web map with seismic data using OpenLayers.
 */
 class SeismoMap {

  /**
   * Constructs the class
   * @param {Object} options - Options to customise the map
   * (described below in this document as members):
   * <ul>
   * <li><b>featureShowStations</b></li>
   * <li><b>featureShowEvents</b></li>
   * <li><b>featureShowHazardmap</b></li>
   * <li><b>featureGridPoints</b></li>
   * <li><b>featureTooltip</b></li>
   * <li><b>featurePopup</b></li>
   * <li><b>featureDataTableClick</b></li>
   * <li><b>featureDataTableSearchFilter</b></li>
   * <br/>
   * <li><b>dataStationsFDSNwsURL</b></li>
   * <li><b>dataEventsFDSNwsURL</b></li>
   * <li><b>dataGridPointsURL</b></li>
   * <li><b>dataHazardImageWMSURL</b></li>
   * <br/>
   * <li><b>baseLayer</b></li>
   * <li><b>dataExtraLayers</b></li>
   * <br/>
   * <li><b>enableImageStyles</b></li>
   * <li><b>featureImagePath</b></li>
   * <br/>
   * <li><b>mapInitialCenter</b></li>
   * <li><b>mapInitialZoom</b></li>
   * <br/>
   * <li><b>callbackLoadDataStations</b></li>
   * <li><b>callbackLoadDataEvents</b></li>
   * <li><b>callbackStyleStation</b></li>
   * <li><b>callbackStyleEvent</b></li>
   * <li><b>callbackInfoTooltip</b></li>
   * <li><b>callbackInfoPopup</b></li>
   * <br/>
   * <li><b>elementMap</b></li>
   * <li><b>elementTooltipContainer</b></li>
   * <li><b>elementPopupContainer</b></li>
   * <li><b>elementPopupContent</b></li>
   * <li><b>elementPopupCloser</b></li>
   * <br/>
   * <li><b>elementTable</b></li>
   * <li><b>tableDataLayer</b></li>
   * <li><b>tableCallbackLoadData</b></li>
   * <br/>
   * <li><b>dataProjection</b></li>
   * <li><b>useKNMIPlaceName</b></li>
   * </ul>
   * @todo describe options
   */
  constructor(options = {}) {

    // Initialize public options (can be overwritten)
    this.iniOptions(options);

    // Initialize DOM elements (used for tooltip and popup)
    this.iniDOMElements();

    // Initialize data objects (stations, events, etc.)
    this.iniDataObjects();

    // Initializes private class variables used internally
    this.iniPrivateVars();

    // Initialize map
    this.iniMap();

    // Load data (stations and events) and add it to the map
    this.loadData();

  }

  /**
   * Initializes the map
   * @private
   */
  iniMap() {

    // Initialize map vector sources and layers (stations, events, grid, etc.)
    this.iniMapLayers();

    // Initialize map default styles (station triangles, event circles)
    this.iniMapStyles();

    // Initialize map overlays (tooltip, popup)
    this.iniMapOverlays();

    // Create map
    this.createMap();

    // Center map on Netherlands
    this.centerMap(this.mapInitialCenter);

    // Initialize map interactions (select grid points)
    this.iniMapInteractions();

    // Initialize map events (click, hover)
    this.iniMapEvents();

    // Initialize DataTable events related to map (click, search)
    this.iniDataTableEvents();

  }

  /**
   * Initializes public options with default values and overwrites them with
   * the provided values during construction
   * @param {Object} options - Options to customise the map
   * @private
   */
  iniOptions(options) {

    /**
     * Configurable feature: load/show stations
     * @type {boolean}
     * @default true
     * @public
     */
    this.featureShowStations = true;

    /**
     * Configurable feature: load/show events
     * @type {boolean}
     * @default true
     * @public
     */
    this.featureShowEvents = true;

    /**
     * Configurable feature: load/show hazardmap
     * @type {boolean}
     * @default false
     * @public
     */
    this.featureShowHazardmap = false;

    /**
     * Configurable feature: use a grid to select points
     * @type {boolean}
     * @default false
     * @public
     */
    this.featureGridPoints = false;

    /**
     * Configurable feature: show tooltip on mouse hover
     * @type {boolean}
     * @default true
     * @public
     */
    this.featureTooltip = true;

    /**
     * Configurable feature: show popup on mouse click
     * @type {boolean}
     * @default true
     * @public
     */
    this.featurePopup = true;

    /**
     * Configurable feature: link to a DataTable and focus/popup to a feature
     * on mouse click in a table row
     * @type {boolean}
     * @default false
     * @public
     */
    this.featureDataTableClick = false;

    /**
     * Configurable feature: link to a DataTable and filter features on table
     * search
     * @type {boolean}
     * @default false
     * @public
     */
    this.featureDataTableSearchFilter = false;

    /**
     * URL to FDSNws-like web service query (or static file) where to get
     * stations data from (text format)
     * @type {string}
     * @default 'http://rdsa.knmi.nl/fdsnws/station/1/query?level=station&format=text'
     * @public
     * @todo document requirements text format (this.dataStations, header...)
     */
    this.dataStationsFDSNwsURL = 'http://rdsa.knmi.nl/fdsnws/station/1/query?level=station&format=text'

    /**
     * URL to FDSNws-like web service query (or static file) where to get
     * events data from (text format)
     * @type {string}
     * @default 'http://rdsa.knmi.nl/fdsnws/event/1/query?format=xml&formatted=true&limit=100'
     * @public
     * @todo document requirements text format (this.dataEvents, header...)
     */
    this.dataEventsFDSNwsURL = 'http://rdsa.knmi.nl/fdsnws/event/1/query?format=xml&formatted=true&limit=100'

    /**
     * URL to file with grid (GeoJSON format) used for point selection
     * @type {string}
     * @default './Grid_file_locations_V4_lon_lat.geojson'
     * @public
     */
    this.dataGridPointsURL = './Grid_file_locations_V4_lon_lat.geojson';

    /**
     * URL to WMS service that provides Hazardmap image
     * @type {string}
     * @default 'https://data.knmi.nl/wms/cgi-bin/wms.cgi?source%3D/seismic_hazardmaps/1/noversion/2017/06/15/SeismicHazardMapV4_Surface.nc'
     * @public
     */
    this.dataHazardImageWMSURL = 'https://data.knmi.nl/wms/cgi-bin/wms.cgi?source%3D/seismic_hazardmaps/1/noversion/2017/06/15/SeismicHazardMapV4_Surface.nc';

    /**
     * Base layer of the map. If it is the string 'osm', OpenStreetMap is used,
     * otherwise a ol.layer is expected.
     * @type {string|ol.layer}
     * @default 'osm'
     * @public
     */
    this.baseLayer = 'osm';

    /**
     * Extra layers to be added to the map. It should be an array of ol.layer
     * objects with the extra attribute 'name' defined.
     * @type {Array}
     * @default []
     * @public
     */
    this.dataExtraLayers = [];

    /**
     * Should use image styles instead of flat triangles
     * @type {boolean}
     * @default false
     * @public
     */
    this.enableImageStyles = false;

    /**
     * Relative path to image resources
     * @type {string}
     * @default './images/'
     * @public
     */
    this.featureImagePath = './images/';

    /**
     * Map's initial center. Does not have any effect unless fitDataExtent()
     * is not used. Provided as array containing longitude and latitude values.
     * @type {Array}
     * @default [5.5, 52.2]
     * @public
     */
    this.mapInitialCenter = [5.5, 52.2];

    /**
     * Map's initial zoom. Does not have any effect unless fitDataExtent()
     * is not used. Provided as integer values.
     * @type {int}
     * @default 7
     * @public
     */
    this.mapInitialZoom = 7;

    /**
     * Callback function to load stations data
     * @type {string}
     * @default SeismoMap.loadDataStations
     * @public
     */
    this.callbackLoadDataStations = this.loadDataStations;

    /**
     * Callback function to add events data to the map
     * @type {string}
     * @default SeismoMap.loadDataEvents
     * @public
     */
    this.callbackLoadDataEvents = this.loadDataEvents;

    /**
     * Callback function to define stations markers style
     * @type {string}
     * @default SeismoMap.styleStation
     * @public
     */
    this.callbackStyleStation = this.styleStation;

    /**
     * Callback function to define stations markers style
     * @type {string}
     * @default SeismoMap.styleEvent
     * @public
     */
    this.callbackStyleEvent = this.styleEvent;

    /**
     * Callback function to make tooltip's info content for 1 feature.
     * The function expects 2 arguments about the feature (dataType, id) and
     * returns the HTML content.
     * @type {string}
     * @default SeismoMap.makeInfoTooltip
     * @public
     */
    this.callbackInfoTooltip = this.makeInfoTooltip;

    /**
     * Callback function to make popup's info content for 1 feature
     * The function expects 2 arguments about the feature (dataType, id) and
     * returns the HTML content.
     * @type {string}
     * @default SeismoMap.makeInfoPopup
     * @public
     */
    this.callbackInfoPopup = this.makeInfoPopup;

    /**
     * ID of the DOM element that will contain the map
     * @type {string}
     * @default 'smap'
     * @public
     */
    this.elementMap = 'smap';

    /**
     * ID of the DOM element that will contain the tooltip
     * @type {string}
     * @default 'smap-tooltip-container'
     * @public
     */
    this.elementTooltipContainer = 'smap-tooltip-container';

    /**
     * ID of the DOM element that will contain the popup
     * @type {string}
     * @default 'smap-popup-container'
     * @public
     */
    this.elementPopupContainer = 'smap-popup-container';

    /**
     * ID of the DOM element that will contain the popup's content
     * @type {string}
     * @default 'smap-popup-content'
     * @public
     */
    this.elementPopupContent = 'smap-popup-content';

    /**
     * ID of the DOM element that will contain the popup's closer
     * @type {string}
     * @default 'smap-popup-closer'
     * @public
     */
    this.elementPopupCloser = 'smap-popup-closer';

    /**
     * ID of the DOM element that will contain the DataTable's table
     * to link with the map for some features (zoom on click, filter on search)
     * @type {string}
     * @default 'stable'
     * @public
     */
    this.elementTable = 'stable';

    /**
     * Name of the map layer whose data can be linked to DataTable's table for
     * some features (zoom on click, filter on search). Either 'stations' or
     * 'events'; other layers are not supported (no click/search features).
     * @type {string}
     * @default 'stations'
     * @public
     */
    this.tableDataLayer = 'stations';

    /**
     * Callback function to call while loading data to the map in order to
     * add the same data to the table. By default it is not provided.
     * It expects 2 parameters: 1) the raw data dynamically loaded, 2) the data
     * already transformed in a object of objects referenced by element ID.
     * If tableDataLayer is 'stations' or 'events' this function is called
     * when loading the correspondent data, otherwise it is not called.
     * If the table events features (click, search) are used, the element ID
     * must be added to table's content (with key 'id') while loading the data.
     * @type {null|function}
     * @default null
     * @public
     */
    this.tableCallbackLoadData = null;

    /*
     * Projection used for all data (event, stations, etc.). The map is by
     * default in Spherical Mercator (EPSG:3857) and we must take care of
     * convert to/from this projection before showing coordinates to the user
     * or before setting bounds based on the user input.
     * @type {string}
     * @default 'EPSG:4326'
     * @public
     */
    this.dataProjection = 'EPSG:4326';

    /**
     * Use KNMI formula to show earthquake's place name (city + translated
     * region)
     * @type {boolean}
     * @default true
     * @public
     */
    this.useKNMIPlaceName = true;

    // Overwrite class options with provided values
    for (var option in options) {
      if (this.hasOwnProperty(option)) {
        this[option] = options[option];
      }
    }

  }

  /**
   * Initializes DOM elements (used for tooltip and popup)
   * @private
   */
  iniDOMElements() {

    // Get DOM elements used afterwards
    this.tooltipContainer = document.getElementById(
      this.elementTooltipContainer
    );
    this.popupContainer = document.getElementById(this.elementPopupContainer);
    this.popupContent = document.getElementById(this.elementPopupContent);
    this.popupCloser = document.getElementById(this.elementPopupCloser);

  }

  /**
   * Initializes data objects (stations, events, etc.)
   * @private
   */
  iniDataObjects() {

    /**
     * Object containing seismic station's data. One element per station,
     * identified by the key (net.sta) and, at least, the following attributes
     * (from FDSNWS-station format=text level=station):
     * network,
     * station,
     * latitude,
     * longitude,
     * elevation,
     * siteName,
     * startTime,
     * endTime.
     * @type {Object}
     * @public
     * @todo what happens to multiple stations with same code?
     * @todo what happens with grouped stations like in station-management?
     * @todo make float/int mandatory?
     */
    this.dataStations = {}

    /**
     * Object containing seismic events' data. One element per event,
     * identified by the key (eventID) and, at least, the following attributes
     * (from FDSNWS-event format=csv):
     * eventID,
     * originTime,
     * latitude,
     * longitude,
     * depth,
     * magnitude,
     * description.
     * An optional attribute can be eventType, with FDSNWS possible values.
     * @type {Object}
     * @public
     * @todo make float/int mandatory?
     */
    this.dataEvents = {}

  }

  /**
   * Initializes private class variables used internally
   * @private
   */
  iniPrivateVars() {

    /**
     * Used to store last selected Feature
     * @type {null|ol.Feature}
     * @default null
     * @private
     */
    this.prevSelectedFeature = null;

    /**
     * Whether we have eventType info or not (for styling, popup, etc.)
     * @type {boolean}
     * @default false
     * @private
     */
    this.isEventTypeAvail = false;

    /**
     * Container for feature image styles (images need to be included)
     * @type {object}
     * @default triangles in different colors and node square
     * @private
     */
    this.featureImageStyles = {
      "black": "triangle-black.png",
      "blue": "triangle-blue.png",
      "darkred": "triangle-darkred.png",
      "green": "triangle-green.png",
      "grey": "triangle-grey.png",
      "lightblue": "triangle-lightblue.png",
      "lightgreen": "triangle-lightgreen.png",
      "node": "square-lightblue.png",
      "orange": "triangle-orange.png",
      "pink": "triangle-pink.png",
      "purple": "triangle-purple.png",
      "red": "triangle-red.png",
      "white": "triangle-white.png",
      "yellow": "triangle-yellow.png"
    };

    /**
     * Whether to fit map to the extend of the DataTable's filtered content or not
     * @type {boolean} 
     * @default true
     * @public
     */
    this.fitContentOnTableSearch = true;

  }

  /**
   * Initializes map vector sources and layers (stations, events, grid, etc.)
   * @private
   */
  iniMapLayers() {

    /**
     * Stations vector source
     * @type {ol.source.Vector}
     * @private
     */
    this.sourceStations = new ol.source.Vector();

    /**
     * Stations vector layer
     * @type {ol.layer.Vector}
     * @private
     */
    this.layerStations = new ol.layer.Vector({
      name: "stations",
      source: this.sourceStations,
      style: this.callbackStyleStation.bind(this)
    });

    /**
     * Events vector source
     * @type {ol.source.Vector}
     * @private
     */
    this.sourceEvents = new ol.source.Vector();

    /**
     * Events vector layer
     * @type {ol.layer.Vector}
     * @private
     */
    this.layerEvents = new ol.layer.Vector({
      name: "events",
      source: this.sourceEvents,
      style: this.callbackStyleEvent.bind(this)
    });

    /**
     * Grid points vector source
     * @type {ol.source.Vector}
     * @private
     */
    this.sourceGrid = new ol.source.Vector({
      url: this.dataGridPointsURL,
      format: new ol.format.GeoJSON()
    });

    /**
     * Grid points vector layer
     * @type {ol.layer.Vector}
     * @private
     */
    this.layerGrid = new ol.layer.Vector({
      name: "grid",
      source: this.sourceGrid,
      // By default, empty style (so not visible)
      style: new ol.style.Style()
    });

    /**
     * HazardMap ImageWMS source
     * @type {ol.source.ImageWMS}
     * @private
     */
    this.sourceHazardImage = new ol.source.ImageWMS({
      url: this.dataHazardImageWMSURL,
      params: {
        'LAYERS': 'pga',
        'STYLES': 'gravity_acceleration/nearest'
      },
      ratio: 1,
      serverType: 'geoserver',
      attributions: 'Hazardmap: © KNMI Data Center'
    });

    /**
     * HazardMap image layer (from KDC's WMS)
     * @type {ol.layer.Image}
     * @private
     */
    this.layerHazardImage = new ol.layer.Image({
      name: "hazardmap",
      source: this.sourceHazardImage
    });

  }

  /**
   * Initializes map overlays (tooltip, popup)
   * @private
   */
  iniMapOverlays() {

    /**
     * Overlay to anchor the tooltip to the map
     * @type {ol.Overlay}
     * @private
     */
    this.overlayTooltip = new ol.Overlay({
      element: this.tooltipContainer,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });

    /**
     * Overlay to anchor the popup to the map
     * @type {ol.Overlay}
     * @private
     */
    this.overlayPopup = new ol.Overlay({
      element: this.popupContainer,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });

  }

  /**
   * Initializes feature image styles: converts URLs to ol.style.Style
   * @private
   */
  iniFeatureImageStyles() {
 
    // Convert urls to ol.style.Style
    Object.keys(this.featureImageStyles).forEach(function(image) {
      this.styles[image] = new ol.style.Style({
        "image": new ol.style.Icon({
          "src": this.featureImagePath + this.featureImageStyles[image]
        })
      })
    }.bind(this));

  }

  /**
   * Initializes feature flat styles using color names
   * @private
   */
  iniFeatureFlatStyles() {

    Object.keys(this.featureImageStyles).forEach(function(image) {
      this.styles[image] = new ol.style.Style({
        image: new ol.style.RegularShape({
          fill:  new ol.style.Fill({color: image}),
          stroke: new ol.style.Stroke({color: 'black', width: 1}),
          points: 3,
          radius: 8,
          rotation: 0,
          angle: 0
        })
      });
    }.bind(this));

  }

  /**
   * Initializes map default styles for stations and events
   * @private
   */
  iniMapStyles() {

    this.styles = {};

    // Initialize feature image styles or flat images
    if (this.enableImageStyles) {
      this.iniFeatureImageStyles();
    } else {
      this.iniFeatureFlatStyles();
    }

    /**
     * Default styles for earthquakes (circles by magnitude, where
     * yellow=induced and brown=tectonic)
     * @type {Object}
     * @private
     */
    this.styleEarthquakes = {
      'earthquake' : [],
      'induced or triggered event' : [],
      'other' : []
    };

    // Create a cache of 2x100 styles (for mag 0.0 up to 9.9)
    var magnitudes = Array.apply(null, Array(100)).map(
      function (_, i) {return i;}
    );
    var fillInduced = new ol.style.Fill({color: 'yellow'});
    var fillTectonic = new ol.style.Fill({color: 'brown'});
    var fillOther = new ol.style.Fill({color: 'orange'});
    var stroke = new ol.style.Stroke({color: 'black', width: 1});
    var i, len = magnitudes.length;
    for (i=0; i<len; ++i) {
      this.styleEarthquakes['earthquake'].push(
        new ol.style.Style({
          image: new ol.style.Circle({
            radius: ((magnitudes[i]/10.0) + 1)**1.75,
            fill: fillTectonic,
            stroke: stroke
          })
        })
      );
      this.styleEarthquakes['induced or triggered event'].push(
        new ol.style.Style({
          image: new ol.style.Circle({
            radius: ((magnitudes[i]/10.0) + 1)**1.75,
            fill: fillInduced,
            stroke: stroke
          })
        })
      );
      this.styleEarthquakes['other'].push(
        new ol.style.Style({
          image: new ol.style.Circle({
            radius: ((magnitudes[i]/10.0) + 1)**1.75,
            fill: fillOther,
            stroke: stroke
          })
        })
      );
    }
  }

  /**
   * Creates the map object
   * @private
   */
  createMap() {

    // Define RD projections for possible use
    if (typeof proj4 !== 'undefined') {
      proj4.defs("EPSG:28992","+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +towgs84=565.417,50.3319,465.552,-0.398957,0.343988,-1.8774,4.0725 +units=m +no_defs");
    }

    // Create controls
    var controls = [
      new ol.control.Attribution(),
      new ol.control.MousePosition({
          undefinedHTML: '-',
          projection: 'EPSG:4326',
          coordinateFormat: ol.coordinate.createStringXY(3),
          className: 'smap-custom-mouse-position'
      }),
      new ol.control.ScaleLine(),
      new ol.control.Zoom(),
      new ol.control.FullScreen()
    ];

    // Layers to load
    var layers = [];
    if (typeof this.baseLayer === 'string' && this.baseLayer === 'osm') {
      layers.push(new ol.layer.Tile({
        name: 'osm',
        source: new ol.source.OSM()
      }));
    } else {
      layers.push(this.baseLayer);
    }
    if (this.featureShowStations) {
      layers.push(this.layerStations);
    }
    if (this.featureShowEvents) {
      layers.push(this.layerEvents);
    }
    if (this.featureShowHazardmap) {
      layers.push(this.layerHazardImage);
    }
    if (this.featureGridPoints) {
      layers.push(this.layerGrid);
    }
    layers = layers.concat(this.dataExtraLayers);

    // Create global map
    this.map = new ol.Map({
      layers: layers,
      view: new ol.View({
        zoom: this.mapInitialZoom
      }),
      controls: controls,
      overlays: [
        this.overlayPopup,
        this.overlayTooltip
      ],
      target: this.elementMap
    });

  }

  /**
   * Centers map on specified coordinates
   * @param {ol.Coordinate} coordinates - An array of numbers representing an
   * xy coordinate in the same projection as the data
   * @public
   */
  centerMap(coordinates) {

    // Center map to Netherlands
    var transCoordinates = ol.proj.transform(
      coordinates,
      this.dataProjection,
      this.map.getView().getProjection()
    );
    this.map.getView().setCenter(transCoordinates);

  }

  /**
   * Initializes map interactions (select grid points)
   * @private
   */
  iniMapInteractions() {

    /**
     * Interaction used to select grid points
     * @type {ol.source.Vector}
     * @private
     */
    this.interactionSelect = new ol.interaction.Select({
      layers: [this.layerGrid]
    });

    // Add Select interaction to pre-select Grid points on pointermove
    this.map.addInteraction(this.interactionSelect);

  }

  /**
   * Initializes map events (click, hover)
   * @private
   */
  iniMapEvents() {

    // Add a mouse-hover handler to the map to render the tooltip and to
    // pre-select (blue circle) grid points.
    // Note the use of 3rd param to have a reference to the class's 'this'
    // inside the event handler (if not 'this' changes in the event contex)
    this.map.on('pointermove', this.handlerPointerMove, this);

    // Add a click handler to the map to render the popup and to select
    // grid points.
    // Note the use of 3rd param to have a reference to the class's 'this'
    // inside the event handler (if not 'this' changes in the event contex)
    this.map.on('singleclick', this.handlerSingleClick, this);

    // Add a click handler to hide the popup
    // Note the use of bind() to pass 'this' keyword to event's handler
    this.popupCloser.onclick = this.handlerPopupCloserClick.bind(this);
  }

  /**
   * Initializes DataTable events related to map (click, search)
   * @private
   */
  iniDataTableEvents() {

    // TODO: avoid jquery dependence

    // if feature enabled
    if (this.featureDataTableClick) {
      // Add a mouse-click handler to the table to focus (and show popup)
      // of the feature related to clicked table row
      // Note the use of 3rd param to pass a reference to the class's 'this'
      // inside the event handler (if not 'this' changes in the event contex)
      var elemTableBody = $('#' + this.elementTable + ' tbody');
      elemTableBody.on("click", "tr", this, this.handlerDataTableClick);
    }

    // if feature enabled
    if (this.featureDataTableSearchFilter) {
      // Add a search handler to the table to filter the map features by the
      // results of table's search
      // Note the use of bind() to pass 'this' keyword to event's handler
      if ( $.fn.dataTable.isDataTable('#' + this.elementTable) ) {
        var tableObject = $('#' + this.elementTable).DataTable();
        tableObject.on('search.dt', this.handlerDataTableSearch.bind(this));
      } else {
        console.error(
          "Unable to retrieve DataTable object from element '" +
          this.elementTable + "'"
        );
      }
    }
  }

  /**
   * Handles click event on linked DataTable
   * @param {Event} evt - jquery event
   * @private
   */
  handlerDataTableClick(evt) {

    // get reference to this class passed via event.data
    var thisClass = evt.data;

    // Retrieve DataTable object from DOM element
    var tableObject = $('#' + thisClass.elementTable).DataTable();

    // get element ID from table's clicked row
    var elementID = tableObject.row(this).data().id;

    // select layer source corresponding to table's data
    var source = null;
    thisClass.map.getLayers().forEach(function(layer) {
      if ( layer.get('name') === thisClass.tableDataLayer ) {
        source = layer.getSource();
        return;
      }
    });

    // search element between map's features
    var feature = source.getFeatureById(elementID);
    if (feature) {
  
      // center map on element
      var transCoordinates = ol.proj.transform(
        feature.getGeometry().getCoordinates(),
        thisClass.map.getView().getProjection(),
        thisClass.dataProjection
      );
      thisClass.focusMap(transCoordinates);
  
      // if popup feature enabled
      if (thisClass.featurePopup) {
        // create HTML content and show popup
        thisClass.showInfoPopup([feature]);
      }
    }

  }

  /**
   * Handles search event on linked DataTable
   * @param {Event} evt - DataTables event
   * @param {DataTables.Settings} settings - DataTables settings
   * @private
   */
  handlerDataTableSearch(evt, settings) {

    // Retrieve DataTable object from DOM element
    var tableObject = $('#' + this.elementTable).DataTable();

    // Get the list of filtered elements IDs
    var visibleElementsIDs = [];
    tableObject.rows({filter: "applied"})[0].forEach(function(index) {
      visibleElementsIDs.push(tableObject.row(index).data().id);
    });

    // select layer source corresponding to table's data
    var source = null;
    this.map.getLayers().forEach(function(layer) {
      if ( layer.get('name') === this.tableDataLayer ) {
        source = layer.getSource();
        return;
      }
    }.bind(this));

    // Compute extend of filtered elements and show/hide them
    var extent = ol.extent.createEmpty();
    source.forEachFeature(function(feature) {
      if (visibleElementsIDs.indexOf(feature.get("id")) != -1) {
        ol.extent.extend(extent, feature.getGeometry().getExtent());
        // Show elements (default style)
        feature.setStyle(null);
      } else {
        // Hide elements (empty style)
        feature.setStyle(new ol.style.Style({}));
      }
    });

    // Fit map to extend of filtered elements
    if (this.fitContentOnTableSearch && !ol.extent.isEmpty(extent)) {
      this.hidePopup();
      this.map.getView().fit(extent, this.map.getSize());
    }

  }

  /**
   * Handles pointermove map event
   * @param {ol.MapBrowserEvent} evt - Triggered event
   * @private
   */
  handlerPointerMove(evt) {

    // if dragging, skip
    if (evt.dragging) {
      this.overlayTooltip.setPosition(undefined);
      return;
    }

    // if tooltip feature enabled
    if (this.featureTooltip) {

      // get hovered relevant features (stations, events, etc.)
      var pixel = this.map.getEventPixel(evt.originalEvent);
      var dataFeatures = this.map.getFeaturesAtPixel(evt.pixel, {
          layerFilter: function(layer) {
            return (layer.type === 'VECTOR' && layer.get('name') !== 'grid' );
        }
      });

      // show tooltip if hovered relevant features
      if (dataFeatures) {
        this.showInfoTooltip(dataFeatures);
      } else {
        this.overlayTooltip.setPosition(undefined);
      }

    }

    // if grid points feature enabled
    if (this.featureGridPoints) {

      // select closest Grid point
      var coordinate = this.map.getEventCoordinate(evt.originalEvent);
      var closestFeature = this.sourceGrid.getClosestFeatureToCoordinate(
        coordinate
      );
      if (closestFeature != null) {
        this.interactionSelect.getFeatures().clear();
        this.interactionSelect.getFeatures().push(closestFeature);
      }

    }

  }

  /**
   * Handles singleclick map event
   * @param {ol.MapBrowserEvent} evt - Triggered event
   * @private
   */
  handlerSingleClick(evt) {

    // if popup feature enabled
    if (this.featurePopup) {

      // get clicked relevant features (stations, events, etc.)
      var dataFeatures = this.map.getFeaturesAtPixel(evt.pixel, {
          layerFilter: function(layer) {
            return (layer.type === 'VECTOR' && layer.get('name') !== 'grid' );
        }
      });

      // if relevant features were clicked
      if (dataFeatures) {
        // create HTML content and show popup
        this.showInfoPopup(dataFeatures);
      }

    }

    // if grid points feature enabled
    if (this.featureGridPoints) {

      // select closest Grid point
      var coordinate = this.map.getEventCoordinate(evt.originalEvent);
      var selectedFeature = this.sourceGrid.getClosestFeatureToCoordinate(
        coordinate
      );
      if (selectedFeature != null) {

        // hide last selected point
        if (this.prevSelectedFeature) {
          this.prevSelectedFeature.setStyle(null);
        }

        // show circle on new selected point
        selectedFeature.setStyle(new ol.style.Style({
          image: new ol.style.Circle({
            radius: 5,
            fill: new ol.style.Fill({color: 'red'}),
            stroke: new ol.style.Stroke({color: 'black', width: 1})
          })
        }));
        this.prevSelectedFeature = selectedFeature;

        // Dispatch 'select_point' event, passing feature's data in GeoJSON
        // TODO: avoid jquery dependence
        $(this).trigger('select_point', [
          new ol.format.GeoJSON().writeFeatureObject(selectedFeature)
        ]);

      }

    }
  }

  /**
   * Handles click on popup closer event
   * @param {Event} evt - Triggered event
   * @returns {boolean} Handler result
   * @private
   */
  handlerPopupCloserClick(evt) {
    // Hide popup overlay
    this.hidePopup();
    return false;
  }

  /**
   * Hides popup
   * @public
   */
  hidePopup() {
    this.overlayPopup.setPosition(undefined);
    this.popupCloser.blur();
  }

  /**
   * Loads stations and events data and adds it to the map
   * @private
   */
  loadData() {

    // Load (dynamically - async) stations data and add it to the map
    if (this.featureShowStations) {
      this.callbackLoadDataStations.call(this);
    }

    // Load (dynamically - async) events data and add it to the map
    if (this.featureShowEvents) {
      this.callbackLoadDataEvents.call(this);
    }

  }

  /**
   * Default callback function to load stations data and add it to the map.
   * Performs an (async) request to get stations data and, once the data is
   * ready, it stores it internally and adds it to the map
   * @private
   */
  loadDataStations() {

    // Ini stations data
    this.dataStations = {}

    // Ajax request to get stations from FDSNws
    $.ajax({
      "dataType": "text",
      "method": "GET",
      "url": this.dataStationsFDSNwsURL,
      "context": this,
      "success": function (data) {

        // Parse FDSNws-station text data
        this.dataStations = this.parseFDSNwsTextData(data, 'station', '|');

        // Adds stations data to map
        this.addDataStations();

        // Make map fit the extent of data layers
        this.fitDataExtent();

        // Call the callback function to load data on the table
        if (this.tableCallbackLoadData && this.tableDataLayer == 'stations') {
          this.tableCallbackLoadData.call(this, data, this.dataStations);
        }

      }
    });

  }

  /**
   * Default callback function to load events data and add it to the map.
   * Performs an (async) request to get events data and, once the data is
   * ready, it stores it internally and adds it to the map
   * @private
   */
  loadDataEvents() {

    // Ini events data
    this.dataEvents = {}

    // Ajax request to get events from FDSNws
    $.ajax({
      //"dataType": "text", // deduce automatically text or xml
      "method": "GET",
      "url": this.dataEventsFDSNwsURL,
      "context": this,
      "success": function (data, status, jqXHR) {

        // Check if format is XML
        if (jqXHR.responseXML) {

          // Parse FDSNws-event xml data
          this.dataEvents = this.parseFDSNwsXMLEventData(data)

        // Check if format is TEXT
        } else if (jqXHR.responseText) {

          // Parse FDSNws-event text data
          this.dataEvents = this.parseFDSNwsTextData(data, 'event', ',');

        // Other formats
        } else {
          // TODO: use a (config) callback to parse the not supported format
          console.log("Parsing of this format is not supported");
          return;
        }

        // Adds events data to map
        this.addDataEvents();

        // Make map fit the extent of data layers
        this.fitDataExtent();

        // Call the callback function to load data on the table
        if (this.tableCallbackLoadData && this.tableDataLayer == 'events') {
          this.tableCallbackLoadData.call(this, data, this.dataEvents);
        }
      }
    });

  }

  /**
   * Makes map fit the extent bounds of the current data layers
   * @public
   */
  fitDataExtent() {

    // Make map fit data content
    var extent = ol.extent.createEmpty();
    this.map.getLayers().forEach(function(layer) {
      if ( layer.type != "TILE" ) {
      //if ( layer.type != "TILE" && layer.type != "IMAGE" ) {
      //if ( layer.type == "VECTOR" ) {
      //if ( layer.name == "stations" || layer.name == "events" ) {
        try {
          ol.extent.extend(extent, layer.getSource().getExtent());
        } catch (error) {
          console.log(
            "Unable to extend map bound to layer '" + layer.get('name') + "'"
          );
        }
      }
    });
    if (!ol.extent.isEmpty(extent)) {
      this.map.getView().fit(extent, {
        size : this.map.getSize(),
        padding: [5, 5, 5, 5]
      });
    }
  }

  /**
   * Parses FDSNws-like data in text (or csv) format into an object of objects
   * where each element is referenced by an ID
   * @param {string} data - Text with data in FDSNws-like format
   * @param {string|function} callbackBuildID - Either a string for the
   * typical cases (station => net.sta, event => eventID) or a callback
   * function to create the ID from the element
   * @param {string} separator - Column separator (default ',')
   * @param {Array} floatKeys - List of keys to convert to float (default
   * "latitude", "longitude", "elevation", "depth", "magnitude", "pga")
   * @returns {Object} Object with data in objects referred by ID
   * @private
   */
  parseFDSNwsTextData(data, callbackBuildID, separator = ',', floatKeys = [
    "latitude", "longitude", "elevation", "depth", "magnitude", "pga"]) {

    // Parse CSV data using jquery-csv
    // TODO: avoid dependency on jquery-csv
    var dataObjects = $.csv.toObjects(data, {separator: separator});

    var i, key, newKey, elem, elemID, newElem;
    var newData = {};

    // In principle, we do not have eventType info
    this.isEventTypeAvail = false;

    // Loop list of objects
    var len = dataObjects.length;
    for (i=0; i<len; ++i) {

      // Get element
      elem = dataObjects[i];
      newElem = {};

      // Loop element keys/properties
      for (key in elem) {

        // Reformulate key to camelCase, remove #, remove everything after
        // unwanted characters
        newKey = key.replace(/^#/, '');
        newKey = newKey.charAt(0).toLowerCase() + newKey.slice(1);
        newKey = newKey.split('(')[0];
        newKey = newKey.split(')')[0];
        newKey = newKey.split('/')[0];
        newKey = newKey.split('\\')[0];

        // Convert to float if necessary
        if (floatKeys.includes(newKey)) {
          newElem[newKey] = parseFloat(elem[key]);
        } else {
          newElem[newKey] = elem[key];
        }

        // Check if it is eventType info
        if (newKey === 'eventType') {
          this.isEventTypeAvail = false;
        }

      }

      // Create elem ID for typical cases or via callback function
      if (typeof callbackBuildID === 'string' ||
        callbackBuildID instanceof String) {

        // Typical cases
        switch (callbackBuildID) {
          case 'station':
            // TODO: deal with multiple elem codes for different time frames
            elemID = newElem.network + '.' + newElem.station;
            break;
          case 'event':
            elemID = newElem.eventID;
            break;
        }

      } else if (typeof callbackBuildID === 'function' ||
        callbackBuildID instanceof Function) {

        // Callback function that returns the element ID
        elemID = callbackBuildID.call(newElem);

      }

      // Store elem data
      newData[elemID] = newElem;
    }

    return newData;

  }

  /**
   * Parses FDSNws-like event data in XML format (QuakeML) into an object of
   * objects where each element is referenced by an ID
   * @param {string} data - Text with data in FDSNws-like format
   * @returns {Object} Object with events data referred by eventID
   * @private
   * @todo avoid jquery dependency
   */
  parseFDSNwsXMLEventData(data) {

    // Find events
    var $events = $(data).find("event");

    // Object that will contain all events
    var dataEvents = {};

    // Create a reference to 'this' keyword to be used inside .each() callback
    var thisClass = this;

    // Loop events
    $events.each(function(index, event) {

      // Get event ID (cutting namespace i.e.: 'smi:scs/0.7/')
      var eventID = $(event).attr('publicID').split('/').pop();

      // Get preferred origin and magnitude
      var preferredOriginID = $(event).children('preferredOriginID').text();
      var preferredMagnitudeID =
        $(event).children('preferredMagnitudeID').text();
      var origin = $(event).children(
        "origin[publicID='" + preferredOriginID + "']"
      );
      var magnitude = $(event).children(
        "magnitude[publicID='" + preferredMagnitudeID + "']"
      );

      // Check presence of objects
      if (!eventID || origin.length != 1 || magnitude.length != 1) {
        console.error('Event has no ID, pref origin or pref magnitude');
        return;
      }

      // Get 'region' and 'nearest cities' descriptions
      var descRegion = $(event).children("description").filter(
        function() {
          return $(this).children('type').text() == "region name";
        }
      );
      var descNearestCities = $(event).children("description").filter(
        function() {
          return $(this).children('type').text() == "nearest cities";
        }
      );
      var region = $(descRegion).children('text').text();
      var city = $(descNearestCities).children('text').text();

      // If KNMI formula for place name is used
      var description = '';
      if (thisClass.useKNMIPlaceName) {
        // Build description ('plaats' name)
        var seaRegions = [
          "North Sea", "Wadden Sea", "Eems-Dollard",
          "Oosterschelde", "Westerschelde"
        ];
        if (city && region) {
          if (region == "The Netherlands") {
            description = city;
          } else if (seaRegions.includes(region)) {
            description = thisClass.translateRegion(region) +
              ' (nabij ' + city +  ')';
          } else {
            description = city + ' (' + thisClass.translateRegion(region) +  ')';
          }
        } else if (city) {
          description = city;
        } else if (region) {
          description = thisClass.translateRegion(region);
        }
      // If not, use nearest city straight-ahead
      } else {
          description = city;
      }

      // Get relevant parameters
      dataEvents[eventID] = {
        'eventType' : $(event).children('type').text(),
        'originTime' : $(origin).children('time').children('value').text(),
        'latitude' : parseFloat(
          $(origin).children('latitude').children('value').text()
        ),
        'longitude' : parseFloat(
          $(origin).children('longitude').children('value').text()
        ),
        'depth' : parseFloat(
          $(origin).children('depth').children('value').text()
        ) / 1000.0,
        'evaluationMode' : $(origin).children('evaluationMode').text(),
        'evaluationStatus' : $(origin).children('evaluationStatus').text(),
        'methodID' : $(origin).children('methodID').text().split('/').pop(),
        'earthModelID' :
          $(origin).children('earthModelID').text().split('/').pop(),
        'magnitude' : parseFloat(
          $(magnitude).children('mag').children('value').text()
        ),
        'magnitudeType' : $(magnitude).children('type').text(),
        'region' : region,
        'nearestCities' : city,
        'description' : description
      }

    });

    // We do have eventType info
    thisClass.isEventTypeAvail = true;

    return dataEvents;

  }

  /**
   * Translates a region name to Dutch (only useful for KNMI's plaats name)
   * @param {string} region - Region name
   * @returns {string} Translated region name
   * @private
   */
  translateRegion(region) {
    switch(region) {
      case 'The Netherlands'       : return 'Nederland';
      case 'Belgium'               : return 'België';
      case 'Germany'               : return 'Duitsland';
      case 'France'                : return 'Frankrijk';
      case 'Luxembourg'            : return 'Luxemburg';
      case 'North Sea'             : return 'Noordzee';
      case 'Wadden Sea'            : return 'Waddenzee';
      case 'Eems-Dollard'          : return 'Eems-Dollard';
      case 'Oosterschelde'         : return 'Oosterschelde';
      case 'Westerschelde'         : return 'Westerschelde';
      case 'Caribbean Netherlands' : return 'Caribisch Nederland';
      case 'Aruba'                 : return 'Aruba';
      case 'Curacao'               : return 'Curaçao';
      case 'Saint Martin'          : return 'Sint Maarten';
    }
  }

  /**
   * Adds stations data to the map. It assumes data has been previously loaded
   * into class' member dataStations.
   * @public
   */
  addDataStations() {
     this.addData('station');
  }

  /**
   * Adds events data to the map. It assumes data has been previously loaded
   * into class' member dataEvents.
   * @public
   */
  addDataEvents() {
     this.addData('event');
  }

  /**
   * Adds data (stations or events) to the map. It assumes data has been
   * previously loaded into class' member dataStations or dataEvents.
   * @param {string} dataType - Type of data ("station" or "event")
   * @private
   */
  addData(dataType) {

    var dataReference, layerName, id;

    // Get reference to object containing data
    switch (dataType) {
      case 'station':
        dataReference = this.dataStations;
        layerName = 'stations';
        break;
      case 'event':
        dataReference = this.dataEvents;
        layerName = 'events';
        break;
      default:
        console.error('Adding data of type ' + dataType + 'not supported');
        return;
    }
    
    // Clear layer source
    this.map.getLayers().forEach(function(layer) {
      if ( layer.get('name') === layerName ) {
        layer.getSource().clear();
        return;
      }
    });

    // Loop data elements
    for (id in dataReference) {

      // Get element
      var element = dataReference[id];

      // Add data point (Feature)
      this.addDataPoint(
        layerName, dataType, id, element.longitude, element.latitude
      );
    }

  }

  /**
   * Adds an individual data point (station, event, etc.) to a specific layer.
   * The point will be added as a feature with the provided dataType and ID,
   * which will allow to retrieve its data lately.
   * @param {string} layerName - Layer to add the point (i.e.: 'stations')
   * @param {string} dataType - Type of data ("station" or "event")
   * @param {string} id - Unique ID of data point
   * @param {float} longitude - Longitude of data point
   * @param {float} latitude - Latitude of data point
   * @public
   */
  addDataPoint(layerName, dataType, id, longitude, latitude) {

    // Add station marker (Feature)
    var point = new ol.geom.Point([longitude, latitude]);
    point.transform(
      this.dataProjection,
      this.map.getView().getProjection()
    );
    var feature = new ol.Feature(point);
    feature.setProperties({'type': dataType, 'id': id});
    feature.setId(id);
    this.map.getLayers().forEach(function(layer) {
      if ( layer.get('name') === layerName ) {
        layer.getSource().addFeature(feature);
        return;
      }
    });

  }

  /**
   * Shows a tooltip in the map with basic explanation of hovered feature(s)
   * @param {Array} features - List of Features hovered
   * @private
   */
  showInfoTooltip(features) {

    if (features) {

      // Create aggregated HTML content
      var htmlContent = this.callbackInfoTooltip.call(
        this, features[0].get('type'), features[0].get('id')
      );
      if (features.length > 1) {
        htmlContent += " (+ " + (features.length - 1) + " more)";
      }
      this.tooltipContainer.innerHTML = htmlContent;

      // Show tooltip
      var coordinates = features[0].getGeometry().getCoordinates();
      this.overlayTooltip.setPosition(coordinates);

    }
  }

  /**
   * Shows a popup in the map with detailed explanation of clicked feature(s)
   * @param {Array} features - List of Features clicked
   * @private
   */
  showInfoPopup(features) {

    if (features) {

      // Create aggregated HTML content
      var htmlContent = "";
      var i, feature, len = features.length;
      for (i=0; i<len; ++i) {
        feature = features[i];
        htmlContent += this.callbackInfoPopup.call(
          this, feature.get('type'), feature.get('id')
        );
      }
      this.popupContent.innerHTML = htmlContent;

      // Show popup
      var coordinates = features[0].getGeometry().getCoordinates();
      this.overlayPopup.setPosition(coordinates);

    }
  }

  /**
   * Makes tooltip's content for one feature depending on data type
   * @param {string} dataType - Type of data point ("station" or "event")
   * @param {string} id - Unique ID of data point
   * @returns {string} Text shown in tooltip
   * @private
   */
  makeInfoTooltip(dataType, id) {

    switch (dataType) {
      case 'station':
        return id;
      case 'event':
        var event = this.dataEvents[id];
        var time = event.originTime.split('.')[0].replace(/T/, ' ');
        var mag = event.magnitude.toFixed(1);
        return time + " M=" + mag;
      default:
        return id;
    }

  }

  /**
   * Makes popups's content for one feature depending on data type
   * @param {string} dataType - Type of data point ("station" or "event")
   * @param {string} id - Unique ID of data point
   * @returns {string} Text (HTML) shown in popup
   * @private
   */
  makeInfoPopup(dataType, id) {
    switch (dataType) {
      case 'station':
        return this.makeInfoPopupStation(id);
      case 'event':
        return this.makeInfoPopupEvent(id);
      default:
        return dataType + ' ' + id;
    }
  }

  /**
   * Makes popups's content for one station feature
   * @param {string} id - Unique ID of data point
   * @returns {string} Text (HTML) shown in popup
   * @public
   */
  makeInfoPopupStation(id) {

    var htmlContent = "";

    // Show station code, description and ?
    var station = this.dataStations[id];
    var lat = station.latitude.toFixed(3);
    var lon = station.longitude.toFixed(3);
    var elev = station.elevation.toFixed(0);
    var timeframe = station.startTime.split('T')[0];
    if (station.endTime === '') {
      timeframe += ' - Present';
    } else {
      timeframe += ' - ' + station.endTime.split('T')[0];
    }
    htmlContent = [
      '<div class="" style="margin-top: 5px; margin-bottom: 5px;" >',
      '  <strong>Station ' + id + '</strong><br/>',
      '  <ul>',
      '    <li><em>Description:</em> ' + station.siteName + '</li>',
      '    <li><em>Latitude (°):</em> ' + lat + '</li>',
      '    <li><em>Longitude (°):</em> ' + lon + '</li>',
      '    <li><em>Elevation (m):</em> ' + elev + '</li>',
      '    <li><em>Operationality:</em> ' + timeframe + '</li>',
      '  </ul>',
      '</div>'
    ].join("");

    return htmlContent;
  }

  /**
   * Makes popups's content for one event feature
   * @param {string} id - Unique ID of data point
   * @returns {string} Text (HTML) shown in popup
   * @public
   */
  makeInfoPopupEvent(id) {

    var htmlContent = "";

    // Show event id, time, magnitude and place
    var event = this.dataEvents[id];
    var time = event.originTime.split('.')[0].replace(/T/, ' ');
    var mag = event.magnitude.toFixed(1);
    var lat = event.latitude.toFixed(3);
    var lon = event.longitude.toFixed(3);
    var depth = event.depth.toFixed(1);
    htmlContent = [
      '<div class="" style="margin-top: 5px; margin-bottom: 5px;" >',
      '  <strong>Event ' + id + '</strong><br/>',
      '  <ul>',
      '    <li><em>Time (UTC):</em> ' + time + '</li>',
      '    <li><em>Magnitude:</em> ' + mag + '</li>',
      '    <li><em>Latitude (°):</em> ' + lat + '</li>',
      '    <li><em>Longitude (°):</em> ' + lon + '</li>',
      '    <li><em>Depth (km):</em> ' + depth + '</li>',
      '    <li><em>Place:</em> ' + event.description + '</li>',
      // TODO: improve
      (this.isEventTypeAvail && event.eventType ?
        '    <li><em>Event type:</em> ' + event.eventType + '</li>' : ''
      ),
      '  </ul>',
      '</div>'
    ].join("");

    return htmlContent;
  }

  /**
   * Defines stations marker style(s) on the map
   * @param {ol.Feature} feature - Feature to style
   * @returns {ol.Style} Style to apply to feature
   * @private
   */
  styleStation(feature) {
    // Default station style (triangle green=open or red=closed)
    var station = this.dataStations[feature.get('id')];
    if (station.endTime && new Date(station.endTime) < Date.now()) {
      return this.styles.red;
    } else {
      return this.styles.green;
    }
  }

  /**
   * Defines event marker style(s) on the map
   * @param {ol.Feature} feature - Feature to style
   * @returns {ol.Style} Style to apply to feature
   * @private
   */
  styleEvent(feature) {

    // Default event style (circle with radius by magnitude)
    var event = this.dataEvents[feature.get('id')];
    var magIndex = Math.round(event.magnitude*10.0, 0);
    if (magIndex < 0) {
      magIndex = 0;
    } else if (magIndex > 99) {
      magIndex = 99;
    }

    // Color deifned by eventType (yellow=induced and brown=tectonic)
    // by default (no event type defined), all yellow
    var eventType = 'induced or triggered event';
    if (this.isEventTypeAvail) {
      eventType = event.eventType;
    }
    // If eventType not considered by default styles, use other
    if (!(eventType in this.styleEarthquakes)) {
      eventType = 'other';
    }
    return this.styleEarthquakes[eventType][magIndex];
  }

  /**
   * Returns main map object of the class
   * @returns {ol.map}
   * @public
   */
  getMap() {
    return this.map;
  }

  /**
   * Shows map layer
   * @param {string} layerName - Name of the layer to hide
   * @public
   */
  showLayer(layerName) {
    this.map.getLayers().forEach(function(layer) {
      if ( layer.get('name') === layerName ) {
        layer.setVisible(true);
        return;
      }
    });
  }

  /**
   * Hides map layer
   * @param {string} layerName - Name of the layer to hide
   * @public
   */
  hideLayer(layerName) {
    this.map.getLayers().forEach(function(layer) {
      if ( layer.get('name') === layerName ) {
        layer.setVisible(false);
        return;
      }
    });
  }

  /**
   * Resets map zoom (to content or to initial center / zoom level)
   * @param {boolean} fitContent - Reset zoom by fitting the content
   * @public
   */
  resetZoom(fitContent = true) {
    this.hidePopup();
    if (fitContent) {
      this.fitDataExtent();
    } else {
      this.centerMap(this.mapInitialCenter);
      this.map.getView().setZoom(this.mapInitialZoom);
    }
  }

  /**
   * Focus map on place (defined by center and zoom)
   * @param {ol.Coordinate} coordinates - An array of numbers representing an
   * xy coordinate in the same projection as the data
   * @param {int} zoom - Zoom level
   * @param {boolean} forceZoom - Force to use the specified zoom level. If not
   * it will use it only if its bigger than the current one
   * @public
   */
  focusMap(coordinates, zoom=10, forceZoom=false) {
    this.hidePopup();
    var currZoom = this.map.getView().getZoom();
    var transCoordinates = ol.proj.transform(
      coordinates,
      this.dataProjection,
      this.map.getView().getProjection()
    );
    this.map.getView().animate({
      center: transCoordinates,
      duration: 1000,
      zoom: (forceZoom || currZoom < zoom ? zoom : currZoom)
    });
  }

  /**
   * Sets reference system for mouseś coordinates
   * @param {string} projection - Name of the projection to use. It only
   * accepts EPSG:4326, EPSG:3857 and EPSG:28992
   * @public
   */
  setMouseCRS(projection, precision=3) {

    // Check EPSG:28992 defined
    if (projection === "EPSG:28992" && typeof proj4 === 'undefined') {
      console.error('To use EPSG:28992, library proj4.js must be loaded.');
      return;
    }

    // Loop control until find MousePosition and change projection
    this.map.getControls().forEach(function (control) {
      if(control instanceof ol.control.MousePosition) {
        control.setProjection(projection);
        control.setCoordinateFormat(ol.coordinate.createStringXY(precision));
      }
    });
  }

}
