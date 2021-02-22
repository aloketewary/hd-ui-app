import { LogEntry } from './log-entry';
import { LogLevel } from './log-level.enum';
import { Observable } from 'rxjs';

export abstract class LogPublisher {
  location = '';
  abstract log(record: LogEntry, level?: LogLevel): Observable<boolean>;
  abstract clear(): Observable<boolean>;
}
