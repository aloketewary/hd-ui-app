import { Injectable } from '@angular/core';
import { LogEntry } from './log-entry';
import { LogLevel } from './log-level.enum';
import { LogPublisher } from './log-publisher';
import { LogPublishersService } from './log-publishers.service';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  level: LogLevel = environment.LOG_LEVEL;
  logWithDate = true;
  publishers: LogPublisher[];

  constructor(private publisherService: LogPublishersService) {
    this.publishers = this.publisherService.publishers;
  }

  debug(classname: string, msg: string, ...optionalParams: any[]): void {
    this.writeToLog(classname, msg, LogLevel.Debug, optionalParams);
  }

  info(classname: string, msg: string, ...optionalParams: any[]): void {
    this.writeToLog(classname, msg, LogLevel.Info, optionalParams);
  }

  warn(classname: string, msg: string, ...optionalParams: any[]): void{
    this.writeToLog(classname, msg, LogLevel.Warn, optionalParams);
  }

  error(classname: string, msg: string, ...optionalParams: any[]): void {
    this.writeToLog(classname, msg, LogLevel.Error, optionalParams);
  }

  fatal(classname: string, msg: string, ...optionalParams: any[]): void {
    this.writeToLog(classname, msg, LogLevel.Fatal, optionalParams);
  }

  log(classname: string, msg: string, ...optionalParams: any[]): void {
    this.writeToLog(classname, msg, LogLevel.All, optionalParams);
  }

  private writeToLog(classname: string, msg: string, level: LogLevel, params: any[]): void {
    if (this.shouldLog(level)) {
      const entry: LogEntry = new LogEntry();
      entry.classname = classname;
      entry.message = msg;
      entry.level = level;
      entry.extraInfo = params;
      entry.logWithDate = this.logWithDate;
      // console.log(entry.buildLogString());
      for (const logger of this.publishers) {
        logger.log(entry).subscribe(response => {/* console.log(response) */});
      }
    }
  }

  public shouldLog(level: LogLevel): boolean {
    let ret = false;
    if ((level >= this.level && level !== LogLevel.Off) || this.level === LogLevel.All) {
      ret = true;
    }
    return ret;
  }
}
