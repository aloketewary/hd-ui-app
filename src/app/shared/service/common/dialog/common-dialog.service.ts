import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MediaObserver } from '@angular/flex-layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from '../../log/logger.service';
import { Observable } from 'rxjs';
import { CommonConfirmDialogComponent } from '../../../component/common-confirm-dialog/common-confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class CommonDialogService {
  isAlertOpen: boolean;
  isNormalAlert: boolean;
  constructor(
    private dialog: MatDialog,
    private mediaObserver: MediaObserver,
    public snackBar: MatSnackBar,
    public http: HttpClient,
    public logger: LoggerService) {
    // super('DialogService', http, snackbar, logger);
  }

  /*
  * Themes are : info / success/ warning / error
  */
  public confirm(
    title: string,
    message?: string,
    svgIconName?: string,
    okButtonName?: string,
    cancelButtonName?: string,
    theme?: 'info' | 'success' | 'warning' | 'error',
  ): Observable<boolean> {
    let dialogRef: MatDialogRef<CommonConfirmDialogComponent>;
    dialogRef = this.dialog.open(CommonConfirmDialogComponent, {
      disableClose: true
    });

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message || '';
    dialogRef.componentInstance.svgIconName = svgIconName || '';
    dialogRef.componentInstance.okButton = okButtonName || 'OK_BUTTON';
    dialogRef.componentInstance.cancelButton = cancelButtonName || 'CANCEL_BUTTON';
    if (theme) {
      dialogRef.componentInstance.theme = theme || 'info';
      dialogRef.componentInstance.isThemeAvailable = true;
    }
    return dialogRef.afterClosed();
  }

  public alert(
    title: string, message?: string, svgIconName?: string,
    okButtonName?: string): Observable<boolean> {
    let dialogRef: MatDialogRef<CommonConfirmDialogComponent>;
    dialogRef = this.dialog.open(CommonConfirmDialogComponent, {
      disableClose: true
    });
    this.isAlertOpen = true;
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message || '';
    dialogRef.componentInstance.svgIconName = svgIconName || '';
    dialogRef.componentInstance.okButton = okButtonName || 'OK';
    dialogRef.componentInstance.isAlert = true;
    return dialogRef.afterClosed();
  }

  public authErrorAlert(
    title: string, message?: string, svgIconName?: string,
    okButtonName?: string, cancelButtonName?: string): Observable<boolean> {
    let dialogRef: MatDialogRef<CommonConfirmDialogComponent>;
    dialogRef = this.dialog.open(CommonConfirmDialogComponent, {
      disableClose: true
    });
    dialogRef.componentInstance.isAlert = this.isNormalAlert;
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message || '';
    dialogRef.componentInstance.svgIconName = svgIconName || '';
    dialogRef.componentInstance.okButton = okButtonName || 'OK';
    dialogRef.componentInstance.cancelButton = cancelButtonName || 'CANCEL';
    dialogRef.componentInstance.isAccessEnabled = true;
    return dialogRef.afterClosed();
  }
}
