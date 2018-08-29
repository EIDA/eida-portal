import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Map, View, Overlay } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { MapService } from '../map.service'
import { ConsoleService } from '../console.service';
import { projection } from '@angular/core/src/render3/instructions';
import { StationsModel, FdsnNetwork } from '../models';
import { switchMap } from 'rxjs/operators';

declare var jquery: any;
declare var $: any;
declare var ol: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  stationsModel: StationsModel;
  private vectorSource = new ol.source.Vector({
    features: []
  });
  private vectorLayer = new ol.layer.Vector({
    source: this.vectorSource
  });

  constructor(
    private mapService: MapService,
    public consoleService: ConsoleService) { }

  ngOnInit() {
    let map = new ol.Map({
      target: document.getElementById('map'),
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        }), this.vectorLayer
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([5.178029, 52.101568]),
        zoom: 3
      })
    });

    let popupContainer = document.getElementById('popup');
    let popupContent = document.getElementById('popup-content');
    let popupCloser = document.getElementById('popup-closer');
    let popupOverlay = new ol.Overlay({
      element: popupContainer
    });
    map.addOverlay(popupOverlay);

    map.on('click', function (evt) {
      let feature = map.forEachFeatureAtPixel(evt.pixel,
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

    popupCloser.onclick = function() {
      popupOverlay.setPosition(undefined);
      popupCloser.blur();
      return false;
    };

    // change mouse cursor when over marker
    map.on('pointermove', function (e) {
      if (e.dragging) {
        // $(element).popover('dispose');
        return;
      }
      var pixel = map.getEventPixel(e.originalEvent);
      var hit = map.hasFeatureAtPixel(pixel);
      map.getTarget().style.cursor = hit ? 'pointer' : '';
    });

    // Subscribe to the service to get model changes from the stations component
    this.mapService.stations.subscribe(
      s => this.updateStationsMap(s)
    );
    this.consoleService.add('Map initiated');
  }

  updateStationsMap(s: StationsModel) {
    console.log(`Updating station ${s}`);
    var point = new ol.Feature({
      geometry: new ol.geom.Point(
        ol.proj.fromLonLat([+s.selectedStation.lon, +s.selectedStation.lat])
      ),
      name: 'hello marker'
    });

    point.setStyle(new ol.style.Style({
      image: new ol.style.Icon({
        src: "../../assets/img/markers/triangle-green.png"
      })
    })), this.vectorSource.addFeature(point)
  }

}
