import { Injectable } from '@angular/core';

import { Query } from '@datorama/akita';
import { StatisticState, StatisticStore } from './statistic.store';

@Injectable({ providedIn: 'root' })
export class StatisticQuery extends Query<StatisticState> {
  constructor(protected store: StatisticStore) {
    super(store);
  }
}
