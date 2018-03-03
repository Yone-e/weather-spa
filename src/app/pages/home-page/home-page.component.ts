import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  // current location
  current: {
    geo: {
      lat: number,
      lng: number,
    }
  };

  constructor(
    private weather: WeatherService
  ) {};

  ngOnInit() {
    // getting users geoposition when initing component
    navigator.geolocation.getCurrentPosition(position => (
      this.current = {
        geo: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
      },
      0
    ));
  };

}
