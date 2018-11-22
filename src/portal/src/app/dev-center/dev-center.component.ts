import { Component, OnInit } from "@angular/core";
import { Http } from '@angular/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'dev-center',
  templateUrl: './dev-center.component.html',
  styleUrls: ['./dev-center.component.scss']
})
export class DevCenterComponent implements OnInit {
    private swagger = null;
    private host = null;
    constructor (
        private http: Http,
        private translate: TranslateService) {
        translate.setDefaultLang('en-us');
        this.host = window.origin;
    }
    ngOnInit(): void {
        const swaggerObs = this.http.get("/swagger.json")
            .pipe(catchError(error => observableThrowError(error)))
            .pipe(map(response => response.json()));
            swaggerObs.subscribe(json => {
            this.swagger = json;
        });
    }

}
