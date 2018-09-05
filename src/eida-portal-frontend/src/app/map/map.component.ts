import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Map, View, Overlay } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { MapService } from '../map.service';
import { StationsService } from '../stations.service';
import { ConsoleService } from '../console.service';
import { projection } from '@angular/core/src/render3/instructions';
import { StationsModel, FdsnNetwork, FdsnStation } from '../models';
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
    private mapService: MapService,
    private stationsService: StationsService,
    public consoleService: ConsoleService) { }

  ngOnInit() {
    this._map = new ol.Map({
      target: document.getElementById('map'),
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        }), this.vectorLayer
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([5.178029, 52.101568]),
        zoom: 2
      })
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
    this.stationsService.selectedStations.subscribe(
      s => this.updateStationsMap(s)
    );
    this.stationsService.focuedStation.subscribe(
      s => this.focusStation(s)
    );
    this.consoleService.add('Map initiated');
  }

  updateStationsMap(stations: FdsnStation[]) {
    this.removeStationMarkers();

    for (let s of stations) {
      var point = new ol.Feature({
        geometry: new ol.geom.Point(
          ol.proj.fromLonLat([+s.lon, +s.lat])
        ),
        name: `<b>Network:</b> ${s.net}<br><b>Station:</b> ${s.stat}<br>`
      });

      point.setStyle(new ol.style.Style({
        image: new ol.style.Icon({
          src: "../../assets/img/markers/triangle-green.png"
        })
      })), this._vectorSource.addFeature(point);
    }
  }

  focusStation(s: FdsnStation) {
    this._map.getView().animate({
      center: ol.proj.fromLonLat([+s.lon, +s.lat]),
      duration: 1000,
      zoom: 10
    })
  }

  resetMapZoom() {
    this._map.getView().animate({
      center: ol.proj.fromLonLat([5.178029, 52.101568]),
      duration: 1000,
      zoom: 2
    })
  }

  removeStation(s: FdsnStation): void {
    console.log(s.stat);
  }

  toggleStationSelection(s): void {
    console.log(s);
  }

  removeStationMarkers(): void {
    this._vectorSource.clear();
  }

}
