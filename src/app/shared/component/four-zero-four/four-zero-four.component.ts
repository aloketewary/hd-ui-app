import { L10nTranslationService } from 'angular-l10n';
import { DataHandlerService } from './../../service/handler/data-handler.service';
import { LoggerService } from './../../service/log/logger.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from './../../class/base-component';
import { Component, OnInit, Input, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-four-zero-four',
  templateUrl: './four-zero-four.component.html',
  styleUrls: ['./four-zero-four.component.scss']
})
export class FourZeroFourComponent extends BaseComponent implements OnInit {

  @Input() errorCode = '404';
  @Input() errorMessage = 'Oops! Something is wrong.';
  rootLogoUrl: string;
  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    public logger: LoggerService,
    public translation: L10nTranslationService,
    private injector: Injector,
    // private storage: StorageService,
    private title: Title,
    private dataHandler: DataHandlerService
  ) {
    super('FourZeroFourComponent', snackBar, logger, translation);
    // this.rootLogoUrl = this.injector.get<string>(ROOT_LOGO_URL);
  }

  ngOnInit() {
    this.title.setTitle(`${this.errorCode} found on page, with message ${this.errorMessage} | ${this.dataHandler.projectName}`);
  }

  navigateTo(): void {
    // const userData = this.storage.getUserData<UserProfile>();
    // this.router.navigate([`${this.rootLogoUrl}/${userData.schoolId}/${userData.schoolYear}`]);
  }

}
