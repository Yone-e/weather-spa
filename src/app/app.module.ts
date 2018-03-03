// angular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// services imports
import { WeatherService } from './services/weather.service';

// components imports
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CityWeatherComponent } from './components/city-weather/city-weather.component';

// routing confguration
const appRoutes: Routes = [
  { path: '', component: HomePageComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [
    AppComponent,
    CityWeatherComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
