import { ChangeDetectorRef, Component, HostBinding, inject, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { takeUntil, finalize, catchError, tap } from "rxjs/operators";

@Component({ template: '' })
export abstract class BaseView<T> implements OnDestroy {
    @HostBinding('class.fsss-loading-overlay')
    isLoading: boolean = false;

    uiData$: BehaviorSubject<T>;

    private changeDetectorRef = inject(ChangeDetectorRef);
    private ngUnsubscribe$: Subject<void> = new Subject();

    ngOnDestroy() {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }

    protected callService<T>(serviceCall: Observable<T>, loadingIndicator$?: Subject<boolean>): Promise<T> {
        const updateStatus: (status: boolean) => void = (status: boolean) => {
            this.isLoading = status;
            this.changeDetectorRef.detectChanges();
            loadingIndicator$?.next(status);
        }

        return new Promise<T>((resolve, reject) => {
            updateStatus(true);
            serviceCall
                .pipe(
                    takeUntil(this.ngUnsubscribe$),
                    tap(resolve),
                    catchError(err => {
                        reject(err);
                        return of(`Error caught: ${err}`);
                    }),
                    finalize(() => updateStatus(false))
                )
                .subscribe();
        });
    }

    protected updateUiData(changes: Partial<T>) {
        this.uiData$.next({ ...this.uiData$.value, ...changes });
    }
}
