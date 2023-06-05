import { ChangeDetectionStrategy, Component, DestroyRef, inject, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { first } from "rxjs/operators";
import { isDefined } from "src/app/helpers/common.helpers";
import { NotesService } from "src/app/services/notes.service";
import { Note } from "src/app/types/note";
import { NoteViewState } from "./note.view.state";

@Component({
    selector: 'fsss-note-view',
    templateUrl: './note.view.html',
    styleUrls: ['./note.view.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteView implements OnChanges {
    @Input()
    id?: string;

    service: NotesService = inject(NotesService);

    state$: BehaviorSubject<NoteViewState> = new BehaviorSubject<NoteViewState>({loading: false});

    private router = inject(Router)
  
    ngOnChanges(changes: SimpleChanges): void {
      if(changes['id'] && isDefined(this.id)){
        if(this.id==='new'){
            this.patchState({note: {title: '', text:''}});
        } else{
            this.service.getNote(parseInt(this.id,10))
                .pipe(first())
                .subscribe(note=>this.patchState(({note})));
        }
      }
    }

    patchState(changes: Partial<NoteViewState>){
        if(this.id==='new' && isDefined(changes.note?.id)){
            this.router.navigateByUrl(`/note/${changes.note.id}`);
        }
        this.state$.next({...this.state$.value, ...changes});
    }

    patchNote(noteChanges: Partial<Note>){
        if(isDefined(this.state$.value.note)){
            this.patchState({note: {...this.state$.value.note, ...noteChanges}});
        }
    }

    saveChanges(){
        const note: Note|undefined = this.state$.value.note;
        if(isDefined(note)){
            if(isDefined(note.id)){
                this.service.updateNote(note)
                .pipe(first())
                .subscribe(note=>this.patchState(({note})));
            } else{
                this.service.createNote(note)
                .pipe(first())
                .subscribe(note=>this.patchState(({note})));
            }
        }
    }

    deleteNote(){
        const note: Note|undefined = this.state$.value.note;
        if(isDefined(note?.id)){
            this.service.deleteNote(note.id)
            .subscribe(()=>this.router.navigateByUrl('/'));
        } else{
            this.router.navigateByUrl('/');
        }
    }
}