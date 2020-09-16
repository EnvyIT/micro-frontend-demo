import { Component, OnInit } from '@angular/core';

import { assetUrl } from '../single-spa/asset-url';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {}

  get userImage(): string {
    return assetUrl('/images/user.jpg');
  }

  get backgroundImage(): string {
    return assetUrl('/images/background.jpeg');
  }

  ngOnInit(): void {}
}
