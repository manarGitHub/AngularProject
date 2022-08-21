import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FirebaseOperation } from '@angular/fire/database/interfaces';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { icon, Icon } from 'leaflet';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Evenement } from '../evenement.model';
import { UsersService } from '../users.service';
import { WeatherService } from '../weather.service';
declare const L: any;
declare const vv: any[];

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css']
})
export class LocalComponent implements OnInit {
  title = 'locationApp';
  lat: any;
  lon: any;
  weather: any;
  constructor(private weatherService:WeatherService){
    
  }
  ngOnInit() {
   this.getLocation()
   
    if (!navigator.geolocation) {
      console.log('location is not supported');
    }
    
    navigator.geolocation.getCurrentPosition((position) => {
      var x:any[];
      const coords = position.coords;
      const latLong = [coords.latitude, coords.longitude];
      const posltd = coords.latitude + 10;
      const poslgd = coords.longitude + 10;
      var LeafIcon = L.Icon.extend({
        options: {
          iconSize: [38, 40],
          shadowSize: [50, 64],
          iconAnchor: [22, 94],
          shadowAnchor: [4, 62],
          popupAnchor: [-3, -76]
        }
      });
      var greenIcon = new LeafIcon({ iconUrl: 'https://icon-library.com/images/event-tent-icon/event-tent-icon-4.jpg' }),
        redIcon = new LeafIcon({ iconUrl: 'https://icon-library.com/images/event-tent-icon/event-tent-icon-4.jpg' }),
        orangeIcon = new LeafIcon({ iconUrl: 'https://icon-library.com/images/event-tent-icon/event-tent-icon-4.jpg' });

      console.log(
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
      );
      let mymap = L.map('map').setView(latLong, 13);

      L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3VicmF0MDA3IiwiYSI6ImNrYjNyMjJxYjBibnIyem55d2NhcTdzM2IifQ.-NnMzrAAlykYciP4RP9zYQ',
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'your.mapbox.access.token',
        }
      ).addTo(mymap);
      L.icon = function (options: any) {
        return new L.Icon(options);
      };
      let marker = L.marker(latLong).addTo(mymap);
      var t= "25"
      // let marker= L.marker([coords.latitude, coords.longitude], {icon: greenIcon}).addTo(mymap);
      L.marker([36.78096821956648, 10.195565853871443], { icon: greenIcon }).addTo(mymap).bindPopup("Journées cinématographiques"+" "+"le 27/08/2022 "+"a 7pm");
      L.marker([36.798733926973306, 10.164594407331236], { icon: redIcon }).addTo(mymap).bindPopup("Festivals de musique"+" "+"le 30/08/2022 "+"a 8pm");
      L.marker([36.760733926973906, 10.184594407331643], { icon: orangeIcon }).addTo(mymap).bindPopup("Les Dunes Électroniques"+" "+"le 1/10/2022 "+"a 9pm");

      marker.bindPopup('<b>Votre Localisation</b>').openPopup();

      let popup = L.popup()
        .setLatLng(latLong)
        .setContent('consulter les differents evenement')
        .openOn(mymap);
    });
    this.watchPosition();
  }

  watchPosition() {
    let desLat = 0;
    let desLon = 0;
    let id = navigator.geolocation.watchPosition(
      (position) => {
        console.log(
          `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
        );
        if (position.coords.latitude === desLat) {
          navigator.geolocation.clearWatch(id);
        }
      },
      (err) => {
        console.log(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }
  getLocation(){
    if("geolocation" in navigator){
      navigator.geolocation.watchPosition((success)=>{
        this.lat=success.coords.latitude;
        this.lon=success.coords.longitude;
        this.weatherService.getWeatherDataBycoords(this.lat,this.lon).subscribe(data=>{
          this.weather=data;
        })
      });
    }
  }
  
}