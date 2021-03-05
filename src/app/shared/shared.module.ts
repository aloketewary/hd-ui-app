import { MatIconRegistry } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DomSanitizer } from '@angular/platform-browser';
import { CovalentLayoutModule } from '@covalent/core/layout';
import { CovalentStepsModule } from '@covalent/core/steps';
import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';
import { CovalentBaseEchartsModule } from '@covalent/echarts/base';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentHttpModule } from '@covalent/http';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { L10nIntlModule, L10nRoutingModule, L10nTranslationModule } from 'angular-l10n';
import { DrawerRailModule } from 'angular-material-rail-drawer';
import { WebStorageModule } from 'ngx-store';
import { MaterialImportModule } from '../material-import/material-import.module';
import { CommonConfirmDialogComponent } from './component/common-confirm-dialog/common-confirm-dialog.component';
import {
  ComponentLoadingComponent
} from './component/component-loading/component-loading.component';
import { FourZeroFourComponent } from './component/four-zero-four/four-zero-four.component';
import { HttpLoaderComponent } from './component/http-loader/http-loader.component';
import { NoDataComponent } from './component/no-data/no-data.component';
import { NoNetworkComponent } from './component/no-network/no-network.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeGuard } from './guard/home.guard';
import { SharedRoutingModule } from './shared-routing.module';



@NgModule({
  declarations: [FourZeroFourComponent, HttpLoaderComponent,
    ComponentLoadingComponent, NoNetworkComponent, CommonConfirmDialogComponent, NoDataComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FlexLayoutModule,
    MaterialImportModule,
    L10nTranslationModule,
    L10nIntlModule,
    ReactiveFormsModule,
    FormsModule,
    WebStorageModule,
    L10nRoutingModule,
    DrawerRailModule,
    CovalentLayoutModule,
    CovalentStepsModule,
    // (optional) Additional Covalent Modules imports
    CovalentHttpModule.forRoot(),
    CovalentHighlightModule,
    CovalentMarkdownModule,
    CovalentDynamicFormsModule,
    CovalentBaseEchartsModule,
  ],
  providers: [AuthGuard, HomeGuard],
  exports: [
    FlexLayoutModule,
    MaterialImportModule,
    HttpLoaderComponent,
    L10nTranslationModule,
    L10nIntlModule,
    ReactiveFormsModule,
    FormsModule,
    WebStorageModule,
    ComponentLoadingComponent,
    NoNetworkComponent,
    L10nRoutingModule,
    DrawerRailModule,
    NoDataComponent,
    CovalentLayoutModule,
    CovalentStepsModule,
    // (optional) Additional Covalent Modules imports
    CovalentHttpModule,
    CovalentHighlightModule,
    CovalentMarkdownModule,
    CovalentDynamicFormsModule,
    CovalentBaseEchartsModule,
  ]
})
/**
 * Data is  Secure
 * Lol  data
 * * I am humble to check it
 * ! You guyx are awesome
 */
export class SharedModule {
  constructor(iconReg: MatIconRegistry, sanitize: DomSanitizer) {
    iconReg.addSvgIcon('school-logo', sanitize.bypassSecurityTrustResourceUrl('../../assets/icons/logo/school-logo.svg'));
    iconReg.addSvgIconSet(sanitize.bypassSecurityTrustResourceUrl('../../assets/icons/mdi.svg'));
    // sanitize.bypassSecurityTrustUrl(environment.FALLBACK_PROFILE_IMAGE_URL);
    iconReg.addSvgIcon('delete-alert', sanitize.bypassSecurityTrustResourceUrl('../../assets/icons/custom/delete-alert.svg'));
    iconReg.addSvgIcon('upload-alert', sanitize.bypassSecurityTrustResourceUrl('../../assets/icons/custom/upload-alert.svg'));
    iconReg.addSvgIcon('check-lock', sanitize.bypassSecurityTrustResourceUrl('../../assets/icons/custom/check-lock.svg'));
    iconReg.addSvgIcon('calendar-alert', sanitize.bypassSecurityTrustResourceUrl('../../assets/icons/custom/calendar.svg'));
    iconReg.addSvgIcon('auth-error-alert', sanitize.bypassSecurityTrustResourceUrl('../../assets/icons/custom/auth-error-alert.svg'));
    iconReg.addSvgIcon('books-alert', sanitize.bypassSecurityTrustResourceUrl('../../assets/icons/custom/books-alert.svg'));
    iconReg.addSvgIcon('auth-access-alert', sanitize.bypassSecurityTrustResourceUrl('../../assets/icons/custom/auth-access-alert.svg'));
    iconReg.addSvgIcon('settings', sanitize.bypassSecurityTrustResourceUrl('../../assets/icons/custom/settings.svg'));
  }
}
