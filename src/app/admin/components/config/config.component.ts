import { Component, OnInit, Inject } from '@angular/core';
import { BaseComponent } from '../../../shared/class/base-component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { L10nTranslationService, L10N_LOCALE, L10nLocale } from 'angular-l10n';
import { LoggerService } from '../../../shared/service/log/logger.service';
import { ConfigLoaderService } from '../../../shared/service/loader/config-loader.service';
import { AppConfig } from '../../../shared/model/app-config';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { AppConfigModel } from '../../models/app-config.model';
import { DataHandlerService } from '../../../shared/service/handler/data-handler.service';
import { Location } from '@angular/common';
import { ConfigService } from '../../service/config.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent extends BaseComponent implements OnInit {
  config: AppConfig;
  configForm: FormGroup;
  configModel: AppConfigModel;
  usedForList: Array<{ 'key': string, 'value': string }>;
  selectedConfigData: { 'key': string, 'value': string };
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
    private configService: ConfigService,
    @Inject(MatDialogRef) public dialogRef: MatDialogRef<ConfigComponent>
  ) {
    super('ConfigComponent', snackBar, logger, translation);
    this.config = configLoader.getConfigData();
    this.configModel = new AppConfigModel();
    this.configModel.isActive = true;
    this.usedForList = new Array<{ 'key': string, 'value': string }>(0);
  }

  ngOnInit(): void {
    this.usedForList = [{ key: 'app', value: 'Application' }];
    this.selectedConfigData = this.usedForList[0];
    this.createForm();
    this.configForm.controls.usedFor.setValue(this.usedForList[0].key);
    this.setTitle();
  }

  createForm(): void {
    this.configForm = this.formBuilder.group({
      key: new FormControl(this.configModel.key, Validators.compose([Validators.required])),
      value: new FormControl(this.configModel.value, Validators.compose([Validators.required])),
      usedFor: new FormControl(this.configModel.usedFor, Validators.compose([Validators.required])),
      isActive: new FormControl(this.configModel.isActive, Validators.compose([]))
    });
  }

  setTitle(): void {

  }

  selectedConfig(data: { key: string, value: string }): void {
    this.selectedConfigData = data;
    this.configForm.controls.usedFor.setValue(data.key);
  }

  submitHandler(): void {
    if (this.configForm.valid) {
      const bodyData = new AppConfigModel()
        .withKey(this.configForm.controls.key.value)
        .withValue(this.configForm.controls.value.value)
        .withUsedFor(this.configForm.controls.usedFor.value)
        .withIsActive(this.configForm.controls.isActive.value);
      if (this.isEditMode) {
        this.configService.updateConfig<AppConfigModel>(this.configModel.id, bodyData).subscribe(data => {
          if (data) {
            this.dialogRef.close(bodyData);
          }
        });
      } else {
        this.configService.addNewConfig<AppConfigModel>(bodyData).subscribe(data => {
          if (data) {
            this.dialogRef.close(bodyData);
          }
        });
      }
    }
  }

  goBack(): void {
    this.location.back();
  }
}
