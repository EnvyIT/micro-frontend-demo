import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

import { StatisticState, StatisticStore } from './statistic.store';
import { StatisticDTO } from './model/statistic-dto';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  constructor(
    private http: HttpService,
    private statisticStore: StatisticStore
  ) {}

  public fetchData(country = 'austria') {
    this.http
      .fetchAllLiveStatusForCountry(country)
      .toPromise()
      .then((response) => {
        console.log('Response successful', response);
        return StatisticService.mapToStatistic(response);
      })
      .then((statistic) => this.updateStore(statistic))
      .catch((error) => console.log(error));
  }

  private updateStore(statistic: StatisticState) {
    this.statisticStore.update((state) => ({
      ...statistic,
    }));
  }

  private static mapToStatistic(response: StatisticDTO[]): StatisticState {
    const latest = response[response.length - 1];
    return {
      chartLegend: true,
      chartLabel: ['Active', 'Confirmed', 'Deaths', 'Recovered'],
      chartData: [
        latest.Active,
        latest.Confirmed,
        latest.Deaths,
        latest.Recovered,
      ],
      date: moment(latest.Date),
      country: latest.Country,
    };
  }
}
