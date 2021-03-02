import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService implements OnDestroy {

  private AvailableLanguages: any[] = [];
  private ProjectName = '';
  private ShowRequiredMarker = false;
  private TextAreaMinRows = 0;
  private TextAreaMaxRows = 0;
  private TablePageSize: Array<number> = [];
  private SidenavMenu: Array<any> = [];
  private SchoolYear: BehaviorSubject<string>;
  private SchoolName = '';
  private LoginAs: 'teacherapp' | 'adminapp' = 'adminapp';
  private IsDarkMode = false;

  public get schoolName(): string {
    return this.SchoolName;
  }
  public set schoolName(value: string) {
    this.SchoolName = value;
  }

  constructor() {
    this.SchoolYear = new BehaviorSubject<string>('');
  }

  ngOnDestroy(): void {
    this.SchoolYear.unsubscribe();
  }

  public get schoolYear(): BehaviorSubject<string> {
    return this.SchoolYear;
  }
  public set schoolYear(value: BehaviorSubject<string>) {
    this.SchoolYear = value;
  }

  public get tablePageSize(): Array<number> {
    return this.TablePageSize;
  }
  public set tablePageSize(value: Array<number>) {
    this.TablePageSize = value;
  }

  public get showRequiredMarker(): boolean {
    return this.ShowRequiredMarker;
  }
  public set showRequiredMarker(value: boolean) {
    this.ShowRequiredMarker = value;
  }

  public get projectName(): string {
    return this.ProjectName;
  }
  public set projectName(value: string) {
    this.ProjectName = value;
  }

  public get availableLanguages(): any[] {
    return this.AvailableLanguages;
  }
  public set availableLanguages(value: any[]) {
    this.AvailableLanguages = value;
  }

  public get textAreaMinRows(): number {
    return this.TextAreaMinRows;
  }
  public set textAreaMinRows(value: number) {
    this.TextAreaMinRows = value;
  }

  public get textAreaMaxRows(): number {
    return this.TextAreaMaxRows;
  }
  public set textAreaMaxRows(value: number) {
    this.TextAreaMaxRows = value;
  }

  public get sidenavMenu(): Array<any> {
    return this.SidenavMenu;
  }
  public set sidenavMenu(value: Array<any>) {
    this.SidenavMenu = value;
  }

  public get loginAs(): 'teacherapp' | 'adminapp' {
    return this.LoginAs;
  }
  public set loginAs(value: 'teacherapp' | 'adminapp') {
    this.LoginAs = value;
  }

  public get isDarkMode(): boolean {
    return this.IsDarkMode;
  }
  public set isDarkMode(value: boolean) {
    this.IsDarkMode = value;
  }
}
