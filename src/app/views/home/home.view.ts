import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, inject, OnInit } from "@angular/core";
import { NotesService } from "src/app/services/notes.service";
import { Note } from "src/app/types/note";
import { first, finalize } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
    selector: 'fsss-home-view',
    templateUrl: './home.view.html',
    styleUrls: ['./home.view.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeView implements OnInit {
    @HostBinding('class.fsss-home-view--loading')
    isLoading: boolean = false;

    notes: Note[] = [];
    private service: NotesService = inject(NotesService);
    private router = inject(Router)
    private changeDetectorRef = inject(ChangeDetectorRef);

    ngOnInit(){
        this.isLoading=true;
        this.service.listNotes()
            .pipe(first(), finalize(()=>this.isLoading=false))
            .subscribe(notes=>this.updateUi(notes));
    }

    openNote(note: Note){
        this.router.navigateByUrl(`/notes/${note.id}`);
    }

    private updateUi(notes: Note[]){
        this.notes=notes;
        this.changeDetectorRef.detectChanges();
    }
}
