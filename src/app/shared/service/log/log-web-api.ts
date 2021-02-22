import { Observable, of, OperatorFunction, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LogEntry } from './log-entry';
import { LogLevel } from './log-level.enum';
import { LogPublisher } from './log-publisher';

export class LogWebApi extends LogPublisher {
  constructor(private http: HttpClient) {
    // Must call super() from derived classes
    super();
    // Set location
    this.location = '/api/log';
  }

  // Add log entry to back end data store
  log(entry: LogEntry, logLevel?: LogLevel): Observable<boolean> {

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post(this.location, entry, options).pipe(
      map(response => response as OperatorFunction<object, boolean>),
      catchError(this.handleErrors)
    );
  }

  // Clear all log entries from local storage
  clear(): Observable<boolean> {
    // TODO: Call Web API to clear all values
    return of(true);
  }

  private handleErrors(error: any):
    Observable<any> {
    const errors: string[] = [];
    let msg = '';

    msg = 'Status: ' + error.status;
    msg += ' - Status Text: ' + error.statusText;
    if (error.json()) {
      msg += ' - Exception Message: ' +
        error.json().exceptionMessage;
    }
    errors.push(msg);

    console.error('An error occurred', errors);

    return throwError(errors);
  }
}
