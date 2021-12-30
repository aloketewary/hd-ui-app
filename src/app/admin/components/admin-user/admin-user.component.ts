import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { L10nTranslationService, L10N_LOCALE, L10nLocale } from 'angular-l10n';
import { BaseComponent } from 'src/app/shared/class/base-component';
import { AppConfig } from 'src/app/shared/model/app-config';
import { UserProfile } from 'src/app/shared/model/user-profile';
import { DataHandlerService } from 'src/app/shared/service/handler/data-handler.service';
import { ConfigLoaderService } from 'src/app/shared/service/loader/config-loader.service';
import { LoggerService } from 'src/app/shared/service/log/logger.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent extends BaseComponent implements OnInit {
  config: AppConfig;
  userForm: FormGroup;
  userModel: UserProfile;
  isEditMode: boolean;
  constructor(
    protected snackBar: MatSnackBar,
    protected logger: LoggerService,
    protected translation: L10nTranslationService,
    @Inject(L10N_LOCALE) public locale: L10nLocale,
    configLoader: ConfigLoaderService,
    private formBuilder: FormBuilder,
    public dataHandler: DataHandlerService,
    private location: Location,
    @Inject(MatDialogRef) public dialogRef: MatDialogRef<AdminUserComponent>
  ) {
    super('AdminUserComponent', snackBar, logger, translation);
    this.config = configLoader.getConfigData();
    this.userModel = new UserProfile();
  }


  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.userForm = this.formBuilder.group({
      password: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl(this.userModel.email, Validators.compose([Validators.required])),
      roles: new FormControl(this.userModel.roles, Validators.compose([Validators.required])),
    });
  }


  submitHandler() {

  }

  selectedConfig(list) {

  }

}
