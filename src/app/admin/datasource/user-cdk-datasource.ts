import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of, Subscription } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { PageableResponse } from "src/app/shared/model/pageable-response";
import { UserProfile } from "src/app/shared/model/user-profile";
import { AdminUserService } from "../service/admin-user.service";

export class UserCdkDatasource extends DataSource<UserProfile> {
  private countSubject = new BehaviorSubject<number>(0);
  private _pageSize: number = 10;
  cachedData: Array<UserProfile>;
  private _fetchedPages = new Set<number>();
  private readonly _dataStream = new BehaviorSubject<UserProfile[]>(new Array<UserProfile>());
  private readonly _subscription = new Subscription();
  private loadingSubject = new BehaviorSubject<boolean>(false);

  constructor(private userService: AdminUserService) {
    super();
    this.cachedData = new Array<UserProfile>();
  }

  connect(collectionViewer: CollectionViewer): Observable<UserProfile[]> {
    this._subscription.add(collectionViewer.viewChange.subscribe(range => {
      const startPage = this._getPageForIndex(range.start);
      const endPage = this._getPageForIndex(range.end - 1);
      for (let i = startPage; i <= endPage; i++) {
        this._fetchPage(i);
      }
    }));
    return this._dataStream;
  }

  disconnect(): void {
    this._subscription.unsubscribe();
  }

  private _getPageForIndex(index: number): number {
    return Math.floor(index / this._pageSize);
  }

  loadUserProfile(pageNumber = 0, pageSize = 10) {
    this.loadingSubject.next(true);
    this.userService.getUsersList<UserProfile>({ page: pageNumber, size: pageSize })
        .pipe(
          catchError(() => of([])),
          finalize(() => this.loadingSubject.next(false))
        )
        .subscribe((result: PageableResponse<UserProfile>) => {
            result.content.map(val => this.cachedData.push(val));
            this.countSubject.next(result.totalElements);
            this._dataStream.next(this.cachedData);
        }
      );
  }

  private _fetchPage(page: number) {
    if (this._fetchedPages.has(page)) {
      return;
    }
    this._fetchedPages.add(page);
    this.loadUserProfile(page)
  }
}
