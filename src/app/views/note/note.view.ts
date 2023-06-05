import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, inject, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Router } from "@angular/router";
import { first, finalize } from "rxjs/operators";
import { isDefined } from "src/app/helpers/common.helpers";
import { NotesService } from "src/app/services/notes.service";
import { Note } from "src/app/types/note";

@Component({
    selector: 'fsss-note-view',
    templateUrl: './note.view.html',
    styleUrls: ['./note.view.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteView implements OnChanges {
    @Input()
    id: string;

    @HostBinding('class.fsss-note-view--loading')
    isLoading: boolean = false;

    service: NotesService = inject(NotesService);
    
    note: Note = {title: '', text:''};

    private router = inject(Router)
    private changeDetectorRef = inject(ChangeDetectorRef);
  
    ngOnChanges(changes: SimpleChanges): void {
      if(changes['id'] && isDefined(this.id)){
        if(this.id!=='new'){
            this.isLoading=true;
            this.service.getNote(parseInt(this.id,10))
                .pipe(first(), finalize(()=>this.isLoading=false))
                .subscribe(note=>this.updateUi(note));
        }
      }
    }

    saveChanges(){
        if(isDefined(this.note.id)){
            this.isLoading=true;
            this.service.updateNote(this.note)
            .pipe(first(), finalize(()=>this.isLoading=false))
            .subscribe(note=>this.updateUi(note));
        } else{
            this.isLoading=true;
            this.service.createNote(this.note)
            .pipe(first(), finalize(()=>this.isLoading=false))
            .subscribe(note=>this.updateUi(note));
        }
    }

    deleteNote(){
        if(isDefined(this.note.id)){
            this.isLoading=true;
            this.service.deleteNote(this.note.id)
            .pipe(first(), finalize(()=>this.isLoading=false))
            .subscribe(()=>this.router.navigateByUrl('/'));
        } else{
            this.router.navigateByUrl('/');
        }
    }

    private updateUi(note: Note){
        this.note=note;
        this.changeDetectorRef.detectChanges();
    }
}