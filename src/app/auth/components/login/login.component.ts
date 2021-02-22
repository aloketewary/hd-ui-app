import { L10N_LOCALE, L10nLocale, L10nTranslationService, L10N_CONFIG, L10nConfig } from 'angular-l10n';
import { BaseComponent } from 'src/app/shared/class/base-component';
import { FormErrorStateMatcher } from 'src/app/shared/class/form-error-state-matcher';
import { AppConfig } from 'src/app/shared/model/app-config';
import { DataHandlerService } from 'src/app/shared/service/handler/data-handler.service';
import { ConfigLoaderService } from 'src/app/shared/service/loader/config-loader.service';
import { LoggerService } from 'src/app/shared/service/log/logger.service';

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {
  private config: AppConfig;
  matcher: FormErrorStateMatcher;
  loginForm: FormGroup;
  isLoginInitiated = false;
  // user: User;
  defaultLang = 'en';
  hide = true;
  returnUrl: any;
  loginTypes: Array<{ name: string, value: string, isDisabled: boolean }>;
  schema = this.l10nConfig.schema;
  constructor(
    protected snackBar: MatSnackBar,
    protected logger: LoggerService,
    protected translation: L10nTranslationService,
    private configProvider: ConfigLoaderService,
    private title: Title,
    public dataHandler: DataHandlerService,
    @Inject(L10N_LOCALE) public locale: L10nLocale,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    @Inject(L10N_CONFIG) private l10nConfig: L10nConfig,
  ) {
    super('LoginComponent', snackBar, logger, translation);
    this.config = configProvider.getConfigData();
    this.matcher = new FormErrorStateMatcher();
    // this.user = new User();
    this.title.setTitle(`Login to continue in ${dataHandler.projectName}`);
    this.loginTypes = this.config.LOGIN_TYPES;
  }

  ngOnInit(): void {
    this.initForms();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl !== '/' ? this.route.snapshot.queryParams.returnUrl : undefined;
  }

  initForms(): void {
    this.loginForm = this.formBuilder.group({
      emailField: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.email])
      ),
      password: new FormControl('', Validators.compose([Validators.required])),
      loginAs: new FormControl('adminapp', Validators.compose([Validators.required]))
    });
  }

  onLoginSubmit(): void {

  }
}
