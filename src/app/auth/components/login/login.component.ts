import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { L10nConfig, L10nLocale, L10nTranslationService, L10N_CONFIG, L10N_LOCALE } from 'angular-l10n';
import { BaseComponent } from 'src/app/shared/class/base-component';
import { FormErrorStateMatcher } from 'src/app/shared/class/form-error-state-matcher';
import { AppConfig } from 'src/app/shared/model/app-config';
import { LoginResponse, UserProfile } from 'src/app/shared/model/user-profile';
import { DataHandlerService } from 'src/app/shared/service/handler/data-handler.service';
import { ConfigLoaderService } from 'src/app/shared/service/loader/config-loader.service';
import { LoggerService } from 'src/app/shared/service/log/logger.service';
import { StorageService } from 'src/app/shared/service/storage/storage.service';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../../models/login-request';
import { LoginService } from '../../services/login.service';


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
    private loginService: LoginService,
    private storage: StorageService,
    private router: Router
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
    this.route.queryParams
      .subscribe(params => this.returnUrl = params['returnUrl'] || '/home/dashboard');
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
    if (this.loginForm.valid) {
      const loginBody = new LoginRequest()
        .withUsername(this.loginForm.controls.emailField.value)
        .withPassword(this.loginForm.controls.password.value)
      this.loginService.signin<LoginResponse>(loginBody).subscribe(data => {
        if (data)  {
          this.loginService.isLogin.next(true);
          // this.localStorageService.set(this.config['USER_PROFILE_DATA'], this.gdHandler.userProfile);
          this.showMessage(this.translation.translate('LOGIN.SUCCESSFULLY_AUTHORIZED_WITH_USERNAME')
            + ' ' + data.email + '! ' + this.translation.translate('LOGIN.SUCCESSFULLY_AUTHORIZED'));
          this.isLoginInitiated = false;
          const myDate = new Date();
          myDate.setHours( myDate.getHours() + 1 );
          this.storage.setCookieData(environment.LOGIN_PERSISTENCE_NAME, data, myDate);
          this.router.navigateByUrl(this.returnUrl);
        } else {
          this.isLoginInitiated = false;
          this.showMessage(this.translation.translate('COMMON.ERROR.PLEASE_RETRY_AGAIN'));
          this.logger.error(this.className, this.translation.translate('COMMON.ERROR.PLEASE_RETRY_AGAIN'));
        }
      }, error => this.snackBar.open(error?.message));
    }
  }
}
