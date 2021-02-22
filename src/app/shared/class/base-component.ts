import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { L10nLocale, L10nTranslationService } from 'angular-l10n';
import { fromEvent, merge, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { LoggerService } from '../service/log/logger.service';

export class BaseComponent {
    onlineOffline: Observable<boolean>;
    allowedExcelFileType = ['.csv', '.xls', '.xlsx'];
    allowedPdfFileType = ['.pdf'];
    allowedWordFileType = ['.doc', '.docx'];
    allowedImageFileType = ['.gif', '.jpg', '.jpeg', '.tiff', '.png'];
    allowedAnyFileType = this.allowedImageFileType.concat(this.allowedExcelFileType)
        .concat(this.allowedWordFileType)
        .concat(this.allowedPdfFileType);
    constructor(
        protected className: string,
        protected snackBar: MatSnackBar,
        protected logger: LoggerService,
        protected translation: L10nTranslationService,
    ) {
        this.onlineOffline = merge(of(navigator.onLine),
            fromEvent(window, 'online').pipe(map(() => true)),
            fromEvent(window, 'offline').pipe(map(() => false))
        );
        this.onlineOffline.subscribe((val) => {
            this.logger.debug(this.className, `This App is now ${val ? 'Online' : 'Offline'}`);
        });
    }

    /**
     * Message Shown for different data handling
     * @param message Message to be daiplayed
     * @param panelClassOptional Extra Class for Better approach
     */
    showMessage(message: string, panelClassOptional?: string): void {
        const config: MatSnackBarConfig = {
            verticalPosition: 'top',
            horizontalPosition: 'right',
            duration: 5000,
            panelClass: panelClassOptional
        };
        this.snackBar.open(message || '', '', config);
    }

    // Languages change from here
    switchLanguage(locale: L10nLocale): void {
        this.translation.setLocale(locale);
    }

    /**
     * Check image type on uploading image
     */
    public checkFileTypeImage(fileName: string): boolean {
        return (new RegExp(`([a-zA-Z0-9()\s_\\.\-_:])+(${this.allowedImageFileType.join('|')})$`)).test(fileName);
    }

    /**
     * Check excel type on uploading file
     */
    public checkFileTypeExcel(fileName: string): boolean {
        return (new RegExp(`([a-zA-Z0-9()\s_\\.\-_:])+(${this.allowedExcelFileType.join('|')})$`)).test(fileName);
    }

    /**
     * Check any type on uploading file
     */
    public checkFileTypeAll(fileName: string): boolean {
        return (new RegExp(`([a-zA-Z0-9()\s_\\.\-_:])+(${this.allowedAnyFileType.join('|')})$`)).test(fileName);
    }

    /**
     * Check pdf type on uploading file
     */
    public checkFileTypePdf(fileName: string): boolean {
        return (new RegExp(`([a-zA-Z0-9()\s_\\.\-_:])+(${this.allowedPdfFileType.join('|')})$`)).test(fileName);
    }

    /**
     * Check word type on uploading file
     */
    public checkFileTypeWord(fileName: string): boolean {
        return (new RegExp(`([a-zA-Z0-9()\s_\\.\-_:])+(${this.allowedWordFileType.join('|')})$`)).test(fileName);
    }
}
