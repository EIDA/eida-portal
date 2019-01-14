import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Map, View, Overlay } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { MapService } from '../map.service';
import { StationsService } from '../stations.service';
import { ConsoleService } from '../console.service';
import { TextService } from '../text.service';
import { projection } from '@angular/core/src/render3/instructions';
import { 
  StationsModel, FdsnNetwork, FdsnStationExt, MapDragBoxCoordinates
 } from '../models';
import { switchMap } from 'rxjs/operators';
import { and } from '@angular/router/src/utils/collection';

declare var jquery: any;
declare var $: any;
declare var ol: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private _map: any;
  private _vectorSource = new ol.source.Vector({
    features: []
  });
  private vectorLayer = new ol.layer.Vector({
    source: this._vectorSource
  });
  stationsModel: StationsModel;

  constructor(
    private _mapService: MapService,
    private _stationsService: StationsService,
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
        }), this.vectorLayer
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

    let draw = new ol.interaction.DragBox({
        condition: ol.events.condition.shiftKeyOnly
    });

    this._map.addInteraction(draw);

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
          src: (s.selected ? 'assets/img/markers/triangle-green.png' : 'assets/img/markers/triangle-grey.png')
        })
      })), this._vectorSource.addFeature(point);
    }
  }

  focusStation(s: FdsnStationExt) {
    this._map.getView().animate({
      center: ol.proj.fromLonLat([+s.lon, +s.lat]),
      duration: 1000,
      zoom: 13
    })
  }

  resetMapZoom() {
    this._map.getView().animate({
      center: ol.proj.fromLonLat([5.178029, 52.101568]),
      duration: 1000,
      zoom: 2
    })
  }

  removeStation(s: FdsnStationExt): void {
    console.log(s.stat);
  }

  toggleStationSelection(s): void {
    console.log(s);
  }

  removeStationMarkers(): void {
    this._vectorSource.clear();
  }

  updateDragBox(s: []): void {
    this._mapService.updateDragBoxCoordinatesByArray(s);
  }

}
