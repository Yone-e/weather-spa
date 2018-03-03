import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherService {

  //api key
  key : string = '429f8b04b3c37d3444f7b0d83a6de7f0';

  //array of wind directions
  windDirection: string[] = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

  //storage of cities to display forecast
  cities: {
    name: string,
  }[] = JSON.parse(localStorage.getItem('cities')) || [];

  constructor(
    private http: Http,
  ) {}

  // function to a city to list
  addCity(city: string) {
    if (!this.cities.filter(one => one.name === city.toLowerCase()).length) {
      this.cities.unshift({ name: city.toLowerCase() });
      localStorage.setItem('cities', JSON.stringify(this.cities));
    }
  };

  // function to remove a city from list
  removeCity(city: string) {
    this.cities = this.cities.filter(one => one.name !== city);
    localStorage.setItem('cities', JSON.stringify(this.cities));
  };

  // api call to get weather forcast for 5 days
  dayly(city: any) {
    if (city.geo) {
      return this.http.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${city.geo.lat}&lon=${city.geo.lng}&APPID=${this.key}`)
        .map(res => res.json())
    }
    return this.http.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city.name}&APPID=${this.key}`)
      .map(res => res.json())
  };

  // api call to get current weather
  now(city: any) {
    if (city.geo) {
      return this.http.get(`http://api.openweathermap.org/data/2.5/weather?lat=${city.geo.lat}&lon=${city.geo.lng}&APPID=${this.key}`)
        .map(res => res.json())
    }
    return this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${city.name}&APPID=${this.key}`)
      .map(res => res.json())
  };
}
