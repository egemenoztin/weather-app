import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseUrl: string = 'https://localhost:7171/api/weather/';

  constructor(private http: HttpClient) { }

  getWeatherData(city: string, unit: string): Observable<any> {
    const url = `${this.baseUrl}getWeatherData?city=${city}&unit=${unit}`;
    return this.http.get<any>(url);
  }

  setTemperatureUnit(unit: string): Observable<any> {
    return this.http.post(`${this.baseUrl}setTemperatureUnit`, { unit });
  }
}
