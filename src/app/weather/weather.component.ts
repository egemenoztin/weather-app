import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';
import { DatePipe } from '@angular/common';
import { CapitalizePipe } from '../capitalize.pipe';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  imports: [HttpClientModule, FormsModule, CommonModule, CapitalizePipe],  // Remove DatePipe from imports
  providers: [WeatherService, DatePipe]  // Add DatePipe to the providers array
})
export class WeatherComponent {
  cities: string[] = ['London', 'Vienna', 'Ljubljana', 'Belgrade', 'Valletta'];
  weatherData: any[] = [];
  unit: string = 'metric';  // Default unit (Celsius)
  loading: boolean = false;
  error: string = '';

  constructor(private weatherService: WeatherService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    // Automatically fetch weather data when the component is initialized
    this.getWeatherForAllCities();
  }
  
  // Function to get weather data for all cities
  getWeatherForAllCities() {
    this.loading = true;
    this.error = '';
    this.weatherData = []; // Clear previous weather data

    // Fetch weather data for all cities
    const weatherRequests = this.cities.map(city => 
      this.weatherService.getWeatherData(city, this.unit).toPromise()
    );

    Promise.all(weatherRequests)
      .then(responses => {
        this.weatherData = responses;

        // Convert sunrise and sunset timestamps to JavaScript Date objects
        this.weatherData.forEach(cityWeather => {
          if (cityWeather.sunrise) {
            cityWeather.sunrise = new Date(cityWeather.sunrise * 1000);
          }
          if (cityWeather.sunset) {
            cityWeather.sunset = new Date(cityWeather.sunset * 1000);
          }
        });

        this.loading = false;
      })
      .catch(err => {
        this.error = 'Error fetching weather data.';
        this.loading = false;
      });
  }

  // Set temperature unit
  setUnit(unit: string) {
    this.unit = unit; // Update unit
    this.getWeatherForAllCities();  // Fetch the weather data for all cities with the new unit
  }
  
  trackByCity(index: number, cityWeather: any): string {
    return cityWeather.cityName; // Assuming each city has a unique cityName
  }  
}
