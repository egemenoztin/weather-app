import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseUrl: string = 'https://localhost:7171/api/weather/';  // Your backend API URL

  constructor(private http: HttpClient) { }

  // Updated getWeatherData to accept both city and unit
  getWeatherData(city: string, unit: string): Observable<any> {
    const url = `${this.baseUrl}getWeatherData?city=${city}&unit=${unit}`;
    return this.http.get<any>(url);  // Make GET request with city and unit parameters
  }

  // Set temperature unit (metric or imperial)
  setTemperatureUnit(unit: string): Observable<any> {
    return this.http.post(`${this.baseUrl}setTemperatureUnit`, { unit });
  }
}
