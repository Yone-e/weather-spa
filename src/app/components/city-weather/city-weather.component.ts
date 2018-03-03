import { Component, OnInit, Input } from '@angular/core';
import { forkJoin } from "rxjs/observable/forkJoin";

import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.css']
})
export class CityWeatherComponent implements OnInit {

  // getting city from parant component
  @Input() city: any;
  // declaring if component can be removed
  @Input() removable: boolean = false;

  // flag to show if the api call and calculations are finished
  loaded: boolean = false;
  // forecast for 5 days
  forecast: Object = {
    city: '',
    days: [],
  };
  // current weather
  now: Object = {
    temp: '',
    speed: '',
    degree: '',
    description: '',
  };

  constructor(
    private weather: WeatherService,
  ) { }

  ngOnInit() {
    // calling api when initing component
    forkJoin(this.weather.dayly(this.city), this.weather.now(this.city))
      .subscribe(
        (result) => {
          const forecast = result[0];
          const now = result[1];
          this.forecast = {
            city: forecast.city.name,
            // formating responce to a pretty array
            days: forecast.list.reduce((schedule, now) => {
              if (
                !schedule.length ||
                  schedule[schedule.length - 1].hours
                    [schedule[schedule.length - 1].hours.length - 1]
                      .dt_txt.split(' ')[0] !== now.dt_txt.split(' ')[0]
              ) {
                schedule.push({ hours: [now] });
              } else {
                schedule[schedule.length - 1].hours.push(now);
              }
              if (now.dt_txt.split(' ')[1] === '12:00:00' || schedule.length === 1) {
                schedule[schedule.length - 1].date = now.dt_txt.split(' ')[0];
                schedule[schedule.length - 1].temp = now.main.temp;
                schedule[schedule.length - 1].speed = now.wind.speed;
                schedule[schedule.length - 1].degree = this.weather.windDirection[Math.round(now.wind.deg / 90)];
                schedule[schedule.length - 1].description = now.weather[0].main;
              }
              return schedule;
            }, [])
              // slicing piece of a last day
              .slice(0, 5)
          };
          this.now = {
            temp: now.main.temp,
            speed: now.wind.speed,
            degree: this.weather.windDirection[Math.round(now.wind.deg / 90)],
            description: now.weather[0].main,
          };
        },
        (error) => {
          this.weather.cities.splice(this.weather.cities.indexOf(this.city), 1);
          localStorage.setItem('cities', JSON.stringify(this.weather.cities));
        },
        () => {
          this.loaded = true;
        }
      )
  }

}
