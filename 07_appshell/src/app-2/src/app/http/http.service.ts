import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StatisticDTO } from '../state/model/statistic-dto';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private BASE_URI = 'https://api.covid19api.com/live/country/';

  constructor(private http: HttpClient) {}

  public fetchAllLiveStatusForCountry(
    country: string
  ): Observable<StatisticDTO[]> {
    return this.http.get<StatisticDTO[]>(`${this.BASE_URI}${country}`);
  }
}
