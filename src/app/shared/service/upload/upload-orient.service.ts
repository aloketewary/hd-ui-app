import { Observable } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';


import {
  HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpParams, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AbstractHttpService } from '../http/abstract-http.service';
import { LoggerService } from '../log/logger.service';
import { ConfigLoaderService } from '../loader/config-loader.service';
import { AppConfig } from '../../model/app-config';
import { FilesModel } from '../../model/files-model.model';


@Injectable({
  providedIn: 'root'
})
export class UploadOrientService extends AbstractHttpService {
  config: AppConfig;
  formData: FormData;
  constructor(
    protected http: HttpClient,
    protected snackBar: MatSnackBar,
    protected logger: LoggerService,
    configLoader: ConfigLoaderService
  ) {
    super('UploadOrientService', http, snackBar, logger);
    this.config = configLoader.getConfigData();
  }

  uploadFile(fileToBeUpload: File, schoolId: string): Observable<HttpEvent<any>> {
    // tslint:disable-next-line:max-line-length
    const url = `${this.config.ROOT_URL + this.config.ROOT_COMMON_SERVICE + this.config.API_VERSION + this.config.CS_MAIN_SINGLE_FILE_UPLOAD_URL}`;

    const formData = new FormData();
    formData.append('file', fileToBeUpload);
    const params = new HttpParams();
    params.append('schoolId', schoolId);
    const options = {
      headers: new HttpHeaders({ upload: 'true' }),
      params,
      reportProgress: true,
    };

    const req = new HttpRequest('POST', url, formData, options);
    return this.http.request(req);
  }


  uploadFileWithEventNotification(url: string, fileToUpload: File): Observable<FilesModel> {
    this.formData = new FormData();
    this.formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(url, this.formData, {
      headers: new HttpHeaders({ uploadExcel: 'true' }),
      reportProgress: false,
      observe: 'events',
    }).pipe(
      retry(this.config.RETRY_TIME),
      map((event: HttpEvent<any>) => {
        if (event.type === HttpEventType.Response) {
          if (event.body.status) {
            return { fileName: fileToUpload.name, filePath: event.body.result.filePath };
          } else {
            return null;
          }
        } else {
          return null;
        }
      }),
      tap((t: FilesModel) => {
        return this.logger.info(this.className, `post uploadFileWithEventNotification file`, t);
      }),
      catchError(this.handleError<FilesModel>(url))
    );
  }

}
