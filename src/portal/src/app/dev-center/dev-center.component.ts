import {AfterViewInit, Component, ElementRef} from '@angular/core';

// import SwaggerUI from 'swagger-ui';
const SwaggerUI = require('swagger-ui');

(window as any).global = window;
// @ts-ignore
window.Buffer = window.Buffer || require('buffer').Buffer;
// const SwaggerUI = require('swagger-ui');

@Component({
  selector: 'dev-center',
  templateUrl: 'dev-center.component.html',
  styleUrls: ['dev-center.component.scss']
})
export class DevCenterComponent implements AfterViewInit {

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    const ui = SwaggerUI({
      url: 'https://localhost:4200/swagger.json',
      domNode: this.el.nativeElement.querySelector('.swagger-container'),
      deepLinking: true,
      presets: [
        SwaggerUI.presets.apis
      ],
    });
  }

}
