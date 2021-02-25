
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { L10nLocale, L10nTranslationService, L10N_LOCALE } from 'angular-l10n';
import { BaseComponent } from 'src/app/shared/class/base-component';
import { AppConfig } from 'src/app/shared/model/app-config';
import { LoggerService } from 'src/app/shared/service/log/logger.service';
import { UploadOrientService } from 'src/app/shared/service/upload/upload-orient.service';

@Component({
  selector: 'app-files-upload',
  templateUrl: './files-upload.component.html',
  styleUrls: ['./files-upload.component.scss']
})
export class FilesUploadComponent extends BaseComponent implements OnInit {
  title = 'Select a file or drag here';
  processMsg = 'Uploading...';
  displayMsg = false;
  fileLogo = false;
  currentFile: File;
  schoolId: string;
  config: AppConfig;

  @ViewChild('fileInput', { static: true }) fileInputVariable: any;
  constructor(
    protected snackBar: MatSnackBar,
    protected logger: LoggerService,
    @Inject(L10N_LOCALE) public locale: L10nLocale,
    protected translation: L10nTranslationService,
    private uploadOrient: UploadOrientService,
    @Inject(MatDialogRef) private dialogRef: MatDialogRef<FilesUploadComponent>,
  ) {
    super('FilesUploadComponent', snackBar, logger, translation);
  }

  ngOnInit(): void {
  }

  onFileChange(evt: any): void {
    /* wire up file reader */
    const target: DataTransfer = evt.target as DataTransfer;
    this.currentFile = target.files[0];
    if (target.files.length !== 1) {
      this.showMessage('Cannot use multiple files');
      throw new Error('Cannot use multiple files');
    }
    if (!this.checkFileTypeExcel(this.currentFile.name)) {
      this.showMessage('Only use Excel file for this operation!');
      throw new Error('Only use Excel file for this operation!');
    } else {
      this.fileLogo = true;
      this.title = this.currentFile.name;
      this.logger.log(this.className, 'target.files : ' + JSON.stringify(this.currentFile.type));
    }
  }

  reset(): void {
    this.fileLogo = false;
    this.displayMsg = false;
    this.title = 'Select a file or drag here';
    this.fileInputVariable.nativeElement.value = '';
  }

  uploadCurrentFile(): void {
    const url = `${this.config.ROOT_URL + this.config.API_VERSION + this.config.PRODUCT_BULK_URL}`;
    this.uploadOrient.uploadFileWithEventNotification(url, this.currentFile).subscribe(val => {
      if (val != null || val !== undefined) {
        this.dialogRef.close(val);
      }
    });
  }

}
