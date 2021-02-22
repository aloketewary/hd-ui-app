import { Observable, of } from 'rxjs';

import { LogEntry } from './log-entry';
import { LogLevel } from './log-level.enum';
import { LogPublisher } from './log-publisher';

export class LogConsole extends LogPublisher {
  log(entry: LogEntry): Observable<boolean> {
    // Log to console
    switch (entry.level) {
      case LogLevel.All:
        console.log(`%c ${entry.buildLogString()}`, 'color: #00b8d4;');
        break;
      case LogLevel.Info:
        console.log(`%c ${entry.buildLogString()}`, 'color: #42A5F5;');
        break;
      case LogLevel.Debug:
        console.log(`%c ${entry.buildLogString()}`, 'color: #26A69A;');
        break;
      case LogLevel.Warn:
        console.log(`%c ${entry.buildLogString()}`, 'color: #FFCA28;');
        break;
      case LogLevel.Error:
        console.log(`%c ${entry.buildLogString()}`, 'color: #FF5722;');
        break;
      case LogLevel.Fatal:
        console.log(`%c ${entry.buildLogString()}`, 'color: #F44336;');
        break;
      default:
        break;
    }

    return of(true);
  }
  clear(): Observable<boolean> {
    console.clear();
    return of(true);
  }

}
