import { Component, OnInit } from '@angular/core';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { MapService } from '../map.service'
import { ConsoleService } from '../console.service';
import { projection } from '@angular/core/src/render3/instructions';

declare var ol: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
})
export class MapComponent implements OnInit {
  latitude: number = 18.5204;
  longitude: number = 73.8567;

  map: any;

  constructor(
    private mapService: MapService,
    public consoleService: ConsoleService) { }

  ngOnInit() {
    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([5.178029, 52.101568]),
        zoom: 15
      })
    });

    this.consoleService.add('Map initiated');
  }

}
