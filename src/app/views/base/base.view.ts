import { ChangeDetectorRef, Component, HostBinding, inject, OnDestroy } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { takeUntil, finalize } from "rxjs/operators";

@Component({template: ''})
export abstract class BaseView<T> implements OnDestroy {
    @HostBinding('class.fsss-loading-overlay')
    isLoading: boolean = false;

    uiData: T;
    
    private changeDetectorRef = inject(ChangeDetectorRef);
    private ngUnsubscribe$: Subject<void> = new Subject();

    ngOnDestroy() {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }

    protected callService<T>(serviceCall: Observable<T>): Promise<T>{
        return new Promise<T>(resolve=>{
            this.isLoading=true;
            serviceCall
                .pipe(
                    takeUntil(this.ngUnsubscribe$),
                    finalize(()=>this.isLoading=false)
                )
                .subscribe(resolve);
        });
    }

    protected updateUiData(changes: Partial<T>){
        this.uiData={...this.uiData, ...changes};
        this.changeDetectorRef.detectChanges();
    }
}
