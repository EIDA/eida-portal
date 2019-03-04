import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';
import { StationsService } from '../stations.service';
import { ConsoleService } from '../console.service';
import { EventsService } from '../events.service';
import { TextService } from '../text.service';
import { StationsModel, FdsnStationExt } from '../modules/models';
import { FdsnEventsResponseModels } from '../modules/models.fdsn-events';

declare var ol: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private _map: any;
  stationsModel: StationsModel;

  // Stations source and layer declaration
  private _stationsSrc = new ol.source.Vector({
    features: []
  });
  private _stationsLayer = new ol.layer.Vector({
    source: this._stationsSrc
  });

  // Events source and layer declaration
  private _eventsSrc = new ol.source.Vector({
    features: []
  });
  private _eventsLayer = new ol.layer.Vector({
    source: this._eventsSrc
  });

  constructor(
    private _mapService: MapService,
    private _stationsService: StationsService,
    private _eventsService: EventsService,
    public consoleService: ConsoleService,
    public textService: TextService) { }

  ngOnInit() {
    this._map = new ol.Map({
      target: document.getElementById('map'),
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM({
            "url" : "https://maps-cdn.salesboard.biz/styles/klokantech-3d-gl-style/{z}/{x}/{y}.png"
          })
        })
        , this._stationsLayer
        , this._eventsLayer
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([5.178029, 52.101568]),
        zoom: 2
      }),
      interactions: ol.interaction.defaults(
        { mouseWheelZoom: false }
      )
    });
    let popupContainer = document.getElementById('popup');
    let popupContent = document.getElementById('popup-content');
    let popupCloser = document.getElementById('popup-closer');
    let popupOverlay = new ol.Overlay({
      element: popupContainer
    });
    this._map.addOverlay(popupOverlay);

    this._map.on('click', function (e) {
      let feature = e.map.forEachFeatureAtPixel(e.pixel,
        function (feature) {
          return feature;
        });
      if (feature) {
        let coordinates = feature.getGeometry().getCoordinates();
        popupOverlay.setPosition(coordinates);
        popupContent.innerHTML = feature.get('name');
      } else {
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
    this._stationsService.selectedStations.subscribe(
      s => this.updateStationsMap(s)
    );

    this._stationsService.focuedStation.subscribe(
      s => this.focusStation(s)
    );

    this._eventsService.focusedEvent.subscribe(
      e => this.focusEvent(e)
    )

    this._eventsService.selectedEvents.subscribe(
      s => this.updateEventsMap(s)
    );

    // Add dragbox draw interaction to the map
    let draw = new ol.interaction.DragBox({
        condition: ol.events.condition.shiftKeyOnly
    });

    this._map.addInteraction(draw);

    // Add shift + scrool zoom to the map
    var mouseWheelInt = new ol.interaction.MouseWheelZoom();
    this._map.addInteraction(mouseWheelInt);

    this._map.on('wheel', function(evt) {
      mouseWheelInt.setActive(ol.events.condition.shiftKeyOnly(evt));
   });

    draw.on('boxend', () => {
      let c = draw.getGeometry().getCoordinates();
      let e = draw.getGeometry().getExtent();

      let coordinates = []
      let longitudes = []
      let latitudes = []

      // Get the list of pairs with coordinates of the dragbox
      for (let pair of c[0]) {
        coordinates.push(ol.proj.transform(pair, 'EPSG:3857', 'EPSG:4326'));
      }

      // Spit the list into two separate lists - one containing
      // longitudes and the other one latitudes
      for (let c of coordinates) {
        longitudes.push(c[0]);
        latitudes.push(c[1]);
      }

      // From two created lists extract max and min values for S-N and E-W
      let coordSN = [Math.max.apply(Math, latitudes), Math.min.apply(Math, latitudes)]
      let coordEW = [Math.max.apply(Math, longitudes), Math.min.apply(Math, longitudes)]

      // Zoom to selected drag box
      this._map.getView().fit(
        e, { duration: 1000 }
      );

      // Send the coordinates to the map service so other components
      // which subscribe to it can be notified
      this._mapService.updateDragBoxCoordinatesByArray(
        coordSN.concat(coordEW) 
      );
    });

    this._mapService.mapResizeTrigger.subscribe(
      e => this.updateMapSize(e)
    );

    this.consoleService.add('Map initiated');
  }

  updateStationsMap(stations: FdsnStationExt[]) {
    this.removeStationMarkers();

    for (let s of stations) {
      var point = new ol.Feature({
        geometry: new ol.geom.Point(
          ol.proj.fromLonLat([+s.lon, +s.lat])
        ),
        name: `<b>Network:</b> ${s.net}<br><b>Station:</b> ${s.stat}<br><b>Name:</b> ${s.name}`
      });

      point.setStyle(new ol.style.Style({
        image: new ol.style.Icon({
          src: (
            s.selected
            ? 'assets/img/markers/triangle-green.png'
            : 'assets/img/markers/triangle-grey.png'
          )
        })
      })), this._stationsSrc.addFeature(point);
    }
  }

  focusStation(s: FdsnStationExt) {
    this._map.getView().animate({
      center: ol.proj.fromLonLat([+s.lon, +s.lat]),
      duration: 1000,
      zoom: 13
    })
  }

  focusEvent(e: FdsnEventsResponseModels.EventExt) {
    this._map.getView().animate({
      center: ol.proj.fromLonLat([+e.origin.longitude, +e.origin.latitude]),
      duration: 1000,
      zoom: 13
    })
  }

  updateEventsMap(events: FdsnEventsResponseModels.EventExt[]) {
    this.removeEventMarkers();

    for (let e of events) {
      var point = new ol.Feature({
        geometry: new ol.geom.Point(
          ol.proj.fromLonLat([+e.origin.longitude, +e.origin.latitude])
        ),
        name: `${e.getMapPopupText()}`
      });
  
      point.setStyle(new ol.style.Style({
        image: new ol.style.Icon({
          src: (
            e.selected
            ? 'assets/img/markers/icon_earthquake_tektonisch.png'
            : 'assets/img/markers/icon_earthquake_tektonisch_deselected.png'
          )
        })
      })), this._eventsSrc.addFeature(point);
    }
  }

  resetMapZoom() {
    this._map.getView().animate({
      center: ol.proj.fromLonLat([5.178029, 52.101568]),
      duration: 1000,
      zoom: 2
    })
  }

  updateMapSize(value: boolean): void {
    this._map.updateSize();
  }

  removeStation(s: FdsnStationExt): void {
    console.log(s.stat);
  }

  toggleStationSelection(s): void {
    console.log(s);
  }

  removeStationMarkers(): void {
    this._stationsSrc.clear();
  }

  removeEventMarkers(): void {
    this._eventsSrc.clear();
  }

  updateDragBox(s: []): void {
    this._mapService.updateDragBoxCoordinatesByArray(s);
  }

}
