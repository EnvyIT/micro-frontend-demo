import { Component, OnInit } from '@angular/core';

import { StatisticQuery } from './state/statistic.query';
import { StatisticState } from './state/statistic.store';
import { Observable } from 'rxjs';
import { StatisticService } from './state/statistic.service';

@Component({
  selector: 'me-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public $statisticData: Observable<StatisticState>;

  constructor(
    private statisticQuery: StatisticQuery,
    private statisticService: StatisticService
  ) {}

  ngOnInit(): void {
    this.statisticService.fetchData();
    this.$statisticData = this.statisticQuery.select();
  }
}
