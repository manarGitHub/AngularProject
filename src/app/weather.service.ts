import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  url="https://api.openweathermap.org/data/2.5/weather";
  apiKey="f44c05ee50c3e5e90183ad22ef51e6da";

  constructor(private http: HttpClient) { }
  getWeatherDataBycoords(lat:  number ,lon: number){
    let params = new HttpParams()
    .set('lat',lat)
    .set('lon',lon)
    .set('units','imperial')
    .set('appid', this.apiKey)
    return this.http.get(this.url, { params})

  }
}
