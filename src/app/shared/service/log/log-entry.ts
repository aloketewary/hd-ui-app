import { LogLevel } from './log-level.enum';
import { DatePipe } from '@angular/common';
export class LogEntry {
  // Public Properties
  classname: string;
  message = '';
  level: LogLevel = LogLevel.Debug;
  extraInfo: any[] = [];
  logWithDate = true;

  buildLogString(): string {
    let ret = '';

    if (this.logWithDate) {
      ret = `${new DatePipe('en').transform(new Date(), 'yyyy-MM-dd HH:mm:ss.ms')} `;
    }
    ret += `${LogLevel[this.level].toLocaleUpperCase()} [ ${this.classname} ]`;
    ret += ': ' + this.message;
    if (this.extraInfo.length) {
      ret += ' - Extra Info: '
        + this.formatParams(this.extraInfo);
    }
    return ret;
  }

  private formatParams(params: any[]): string {
    let ret: string = params.join(',');

    // Is there at least one object in the array?
    if (params.some(p => typeof p === 'object')) {
      ret = '';
      // Build comma-delimited string
      for (const item of params) {
        ret += JSON.stringify(item) + ',';
      }
    }

    return ret;
  }
}
