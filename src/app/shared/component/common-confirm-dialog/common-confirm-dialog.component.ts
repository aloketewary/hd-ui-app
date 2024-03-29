import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { L10N_LOCALE, L10nLocale } from 'angular-l10n';
import { isNullOrUndefined } from '../../util/app-util';

@Component({
  selector: 'app-common-confirm-dialog',
  templateUrl: './common-confirm-dialog.component.html',
  styleUrls: ['./common-confirm-dialog.component.scss']
})
export class CommonConfirmDialogComponent implements OnInit {
  public title: string;
  public message: string;
  public svgIconName: string;
  public okButton: string;
  public cancelButton: string;
  public theme: string;
  messageList: string[];
  cancelBtnColor: string;
  okBtnColor: string;
  isAlert: boolean;
  isAccessEnabled: boolean;
  isThemeAvailable: boolean;
  constructor(
    @Inject(L10N_LOCALE) public locale: L10nLocale,
    @Inject(MatDialogRef) public dialogRef: MatDialogRef<CommonConfirmDialogComponent>) { }

  ngOnInit(): void {
    this.svgIconName = this.svgIconName || 'delete-alert';
    this.okBtnColor = this.svgIconName === 'delete-alert' ? 'warn' : 'primary';
    this.cancelBtnColor = this.svgIconName === 'delete-alert' ? 'primary' : 'warn';
    if (this.message) {
      this.messageList = this.message.split('^');
    }
  }

}
