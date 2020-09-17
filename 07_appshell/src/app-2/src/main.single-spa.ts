import { enableProdMode, NgZone } from '@angular/core';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Router } from '@angular/router';

import {
  singleSpaAngular,
  getSingleSpaExtraProviders,
} from 'single-spa-angular';

import { environment } from './environments/environment';
import { singleSpaPropsSubject } from './single-spa/single-spa-props';
import { AppModule } from './app/app.module';

if (environment.production) {
  enableProdMode();
}

const loadScript = (url: string) =>  {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    function onLoad() {
      resolve();
      cleanup();
    }
    function onError(event: Event) {
      reject(event);
      cleanup();
    }
    function cleanup() {
      script.removeEventListener('load', onLoad);
      script.removeEventListener('error', onError);
    }
    script.addEventListener('load', onLoad);
    script.addEventListener('error', onError);
    document.head.appendChild(script);
  });
}

const scripts = [
  loadScript('http://localhost:5050/chart.js')
]

const lifecycles = singleSpaAngular({
  bootstrapFunction: (singleSpaProps) => {
    singleSpaPropsSubject.next(singleSpaProps);
    return platformBrowserDynamic(getSingleSpaExtraProviders()).bootstrapModule(
      AppModule
    );
  },
  template: '<me-root />',
  Router,
  NgZone,
});

export const bootstrap = [
  () => Promise.all(scripts),
  lifecycles.bootstrap,
]

export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
