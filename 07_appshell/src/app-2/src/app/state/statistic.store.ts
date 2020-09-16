import { Store, StoreConfig } from '@datorama/akita';

import { Label } from 'ng2-charts';
import { Moment, now } from 'moment';
import * as moment from 'moment';
import { Injectable } from '@angular/core';

export interface StatisticState {
  chartLabel: Label[];
  chartData: number[];
  chartLegend: boolean;
  date: Moment;
  country: string;
}

export function createInitialState(): StatisticState {
  return {
    chartLabel: [],
    chartData: [],
    chartLegend: true,
    country: '',
    date: moment(),
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'statistic' })
export class StatisticStore extends Store<StatisticState> {
  constructor() {
    super(createInitialState());
  }
}
