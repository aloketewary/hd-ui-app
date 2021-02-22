import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AbstractHttpService } from '../http/abstract-http.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogConsole } from './log-console';
import { LogLoaderService } from './log-loader.service';
import { LogLocalStorage } from './log-local-storage';
import { LogPublisher } from './log-publisher';
import { LogPublisherConfig } from './log-publisher-config';
import { LogWebApi } from './log-web-api';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class LogPublishersService {
  constructor(
    private httpClient: HttpClient,
    snackbar: MatSnackBar,
    private logLoaderService: LogLoaderService) {
    // super('LogPublishersService', 'logger', httpClient, snackbar);
    // Build publishers arrays
    this.buildPublishers();
  }

  // Public properties
  publishers: LogPublisher[] = [];

  // Build publishers array
  buildPublishers(): void {
    let logPub: LogPublisher;

    this.getLoggers().subscribe(response => {
      for (const pub of response.filter(p => p.isActive)) {
        switch (pub.loggerName.toLowerCase()) {
          case 'console':
            logPub = new LogConsole();
            break;
          case 'localstorage':
            logPub = new LogLocalStorage();
            break;
          case 'webapi':
            logPub = new LogWebApi(this.httpClient);
            break;
        }
        // Set location of logging
        logPub.location = pub.loggerLocation;
        // Add publisher to array
        this.publishers.push(logPub);
      }
    });
  }

  getLoggers(): Observable<LogPublisherConfig[]> {
    return of(this.logLoaderService.getLogPublisherData());
  }
}
