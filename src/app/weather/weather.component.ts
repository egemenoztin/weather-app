import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';
import { DatePipe } from '@angular/common';
import { CapitalizePipe } from '../capitalize.pipe';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface WeatherData {
  cityName: string,
  description: string,
  sunrise: number,
  sunset: number,
  temperature: number,
  weatherIcon: string
}

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  imports: [HttpClientModule, FormsModule, CommonModule, CapitalizePipe],
  providers: [WeatherService, DatePipe]
})
export class WeatherComponent {
  cities: string[] = ['London', 'Vienna', 'Ljubljana', 'Belgrade', 'Valletta'];
  weatherData: WeatherData[] = [];
  unit: string = 'metric';
  timeDisplay: string = 'both';
  loading: boolean = false;
  error: string = '';

  constructor(private weatherService: WeatherService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getWeatherForAllCities();
  }
  
  getWeatherForAllCities() {
    this.loading = true;
    this.error = '';
    this.weatherData = [];

    const weatherRequests = this.cities.map(city => 
      this.weatherService.getWeatherData(city, this.unit).toPromise()
    );

    Promise.all(weatherRequests)
      .then(responses => {
        this.weatherData = responses.map(response => {
          return {
            ...response, 
            sunrise: new Date(response.sunrise * 1000),
            sunset: new Date(response.sunset * 1000)
          }
        })
        this.loading = false;
      })
      .catch(err => {
        this.error = 'Error fetching weather data.';
        this.loading = false;
      });
  }

  setUnit(unit: string) {
    this.unit = unit;
    this.getWeatherForAllCities();
  }

  setTimeDisplay(display: string) {
    this.timeDisplay = display;
  }
  
  trackByCity(index: number, cityWeather: any): string {
    return cityWeather.cityName;
  }  
}