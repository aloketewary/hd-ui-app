import { BehaviorSubject, Observable, of } from 'rxjs';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { UserProfile } from "src/app/shared/model/user-profile";
import { AdminUserService } from '../service/admin-user.service';
import { catchError, finalize } from 'rxjs/operators';
import { PageableResponse } from 'src/app/shared/model/pageable-response';

export class UserDatasource implements DataSource<UserProfile>{
  private userProfileSubject = new BehaviorSubject<UserProfile[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();
  constructor(private userService: AdminUserService) { }

  connect(collectionViewer: CollectionViewer): Observable<UserProfile[]> {
    return this.userProfileSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.userProfileSubject.complete();
      this.loadingSubject.complete();
      this.countSubject.complete();
  }

  loadUserProfile(pageNumber = 0, pageSize = 10) {
    this.loadingSubject.next(true);
    this.userService.getUsersList<UserProfile>({ page: pageNumber, size: pageSize })
        .pipe(
          catchError(() => of([])),
          finalize(() => this.loadingSubject.next(false))
        )
        .subscribe((result: PageableResponse<UserProfile>) => {
            this.userProfileSubject.next(result.content);
            this.countSubject.next(result.totalElements);
        }
      );
  }
  length() {
    return this.userProfileSubject.next.length;
  }

  toList() {
    return this.userProfileSubject.asObservable();
  }
}
