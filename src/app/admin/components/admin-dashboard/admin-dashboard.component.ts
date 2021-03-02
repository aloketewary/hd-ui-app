import { DashboardStatusData } from './../../models/dashboard-status-data';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, ViewChild, Inject, Renderer2 } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { L10nTranslationService, L10N_LOCALE, L10nLocale } from 'angular-l10n';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { BaseComponent } from '../../../shared/class/base-component';
import { LoggerService } from '../../../shared/service/log/logger.service';
import { DataHandlerService } from '../../../shared/service/handler/data-handler.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DashboardCardData } from '../../models/dashboard-card-data';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DashboardService } from '../../service/dashboard.service';
import { AdminDashboardService } from '../../service/admin-dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179.9deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})
export class AdminDashboardComponent extends BaseComponent implements OnInit, OnDestroy {

  isOpened = false;
  public currentMode: 'rail' | 'over' | 'side' | 'push';
  @ViewChild(MatSidenav) appDrawer: MatSidenav;
  public isMobileView: boolean;
  @ViewChild('sidenav', { static: true }) menuSidenav: MatSidenav;
  watcher: Subscription;
  rootLogoUrl: any;
  userProfile: any;
  dashboardDataList: Array<DashboardCardData>;
  public dashboardData: DashboardStatusData;
  constructor(
    protected snackBar: MatSnackBar,
    protected logger: LoggerService,
    protected translation: L10nTranslationService,
    public breakpointObserver: BreakpointObserver,
    public media: MediaObserver,
    public dataHandler: DataHandlerService,
    @Inject(L10N_LOCALE) public locale: L10nLocale,
    private renderer2: Renderer2,
    private router: Router,
    private dashboardService: AdminDashboardService,
  ) {
    super('AdminDashboardComponent', snackBar, logger, translation);
    this.currentMode = 'side';
    this.dashboardDataList = new Array<DashboardCardData>(0);
  }

  ngOnInit(): void {
    this.isMobileView = this.media.isActive('xs') || this.media.isActive('sm');
    // this.watcher = this.media.media$.subscribe((change: MediaChange) => {
    //   this.isMobileView = change.mqAlias === 'xs' || change.mqAlias === 'sm';
    // });
    this.watcher = this.media.asObservable().pipe(
      filter((changes: MediaChange[]) => changes.length > 0),
      map((changes: MediaChange[]) => changes[0])
    ).subscribe((change: MediaChange) => {
      this.isMobileView = change.mqAlias === 'xs';
    });
    this.generateDashBoardCard();
    this.fetchDashboardData();
  }

  ngOnDestroy(): void {
    this.watcher.unsubscribe();

  }

  fetchDashboardData(): void {
    this.dashboardService.getDashboardInfo<DashboardStatusData>().subscribe(value => {
      if (value != null) {
        this.dashboardData = value;
      }
    });
  }

  generateDashBoardCard(): void {
    if (localStorage.getItem('SCHOOL_DASHBOARD_ORDER_LIST')) {
      this.dashboardDataList = JSON.parse(localStorage.getItem('SCHOOL_DASHBOARD_ORDER_LIST'));
    } else {
      this.dashboardDataList.push(
        DashboardCardData.build()
          .withIsEnable(false)
          .withId(0)
          .withImageUrl('discuss_teacher_icon.png')
          .withIcon('')
          .withProcessName('DISCUS_WITH_PARENT')
          .withName('DASHBOARD.DISCUS_WITH_PARENT')
          .withLink(null)
          .withFlip('inactive')
          // tslint:disable-next-line:max-line-length
          .withInfo('No Info available.')
        ,
        DashboardCardData.build()
          .withIsEnable(true)
          .withId(5)
          .withImageUrl('settings.png')
          .withIcon('')
          .withProcessName('CONFIG')
          .withName('DASHBOARD.CONFIG')
          .withLink(`/admin/config`)
          .withFlip('inactive')
          // tslint:disable-next-line:max-line-length
          .withInfo('All the configuration information you can found here.')
        ,
        DashboardCardData.build()
          .withIsEnable(true)
          .withId(6)
          .withImageUrl('brand-identity.png')
          .withIcon('')
          .withProcessName('PRODUCT')
          .withName('DASHBOARD.PRODUCT')
          .withLink(`/admin/price-list`)
          .withFlip('inactive')
          // tslint:disable-next-line:max-line-length
          .withInfo('No Info available.')
        ,
        DashboardCardData.build()
          .withIsEnable(true)
          .withId(6)
          .withImageUrl('money.png')
          .withIcon('')
          .withProcessName('PRICELIST')
          .withName('DASHBOARD.PRICELIST')
          .withLink(`/admin/price-list`)
          .withFlip('inactive')
          // tslint:disable-next-line:max-line-length
          .withInfo('No Info available.')
      );
    }
  }

  toggleFlip(dbObj: DashboardCardData): void {
    this.dashboardDataList[this.dashboardDataList.indexOf(dbObj)].flip =
      (this.dashboardDataList[this.dashboardDataList.indexOf(dbObj)].flip === 'inactive') ? 'active' : 'inactive';
  }

  matElevationAdd(ev: Event): void {
    this.renderer2.addClass(ev.target, 'mat-elevation-z6');
  }

  matElevationRemove(ev: Event): void {
    this.renderer2.removeClass(ev.target, 'mat-elevation-z6');
  }

  redirectTo(dashboardObj: any): void {
    if (dashboardObj.link) {
      this.router.navigate([dashboardObj.link]);
    }
  }

  drop(event: CdkDragDrop<DashboardCardData[]>): void {
    moveItemInArray(this.dashboardDataList, event.previousIndex, event.currentIndex);
    localStorage.setItem('SCHOOL_DASHBOARD_ORDER_LIST', JSON.stringify(this.dashboardDataList));
  }

  getImgUrl(imageUrl: string): string {
    return `../assets/images/${imageUrl}`;
  }

  getTheDataToBeShown(data: any): string {
    if (data === 'CONFIG') {
      data = `${this.dashboardData ? this.dashboardData.CONFIG : '--'} Configs`;
    } else if (data === 'PRODUCT') {
      data = `${this.dashboardData ? this.dashboardData.PRODUCT : '--' } Products`;
    } else if (data === 'TEACHER') {
      // data = this.dashboardData.teacherCount || data;
    } else if (data === 'STAFF') {
      // data = this.dashboardData.staffCount || data;
    } else {
      data = this.translation.translate('DASHBOARD.' + data);
    }
    return data;
  }
}
