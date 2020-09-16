import { Component, Input, OnInit } from '@angular/core';

import { ChartOptions, ChartType } from 'chart.js';
import { StatisticState } from '../state/statistic.store';

@Component({
  selector: 'me-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  @Input() statisticData: StatisticState;

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    },
  };

  public pieChartType: ChartType = 'pie';
  public pieChartColors = [
    {
      backgroundColor: [
        'rgb(238,98,115)',
        'rgb(163,89,248)',
        'rgba(0,0,0,0.3)',
        'rgb(161,243,134)',
      ],
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
