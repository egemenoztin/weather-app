import { bootstrapApplication } from '@angular/platform-browser';
import { WeatherComponent } from './app/weather/weather.component';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(WeatherComponent, {
  providers: [HttpClientModule]
}).catch(err => console.error(err));
