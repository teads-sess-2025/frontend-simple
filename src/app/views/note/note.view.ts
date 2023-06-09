import { ChangeDetectionStrategy, Component, inject, Input, OnChanges, OnDestroy, SimpleChanges } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { isDefined } from "src/app/helpers/common.helpers";
import { NotesService } from "src/app/services/notes.service";
import { Note } from "src/app/types/note";
import { BaseView } from "../base/base.view";

@Component({
    selector: 'fsss-note-view',
    templateUrl: './note.view.html',
    styleUrls: ['./note.view.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteView extends BaseView<{note: Note}> implements OnChanges, OnDestroy {
    @Input()
    id: string;

    isSaving: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isDeleting: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private service: NotesService = inject(NotesService);
    private router = inject(Router)

    constructor(){
        super();
        this.uiData = {note: {title: '', text:''}};
    }
  
    ngOnChanges(changes: SimpleChanges): void {
      if(changes['id'] && isDefined(this.id)){
        if(this.id!=='new'){
            this.callService(
                this.service.getNote(parseInt(this.id,10))
            ).then(
                note => this.updateUiData({note})
            );
        }
      }
    }

    saveChanges(){
        if(isDefined(this.uiData.note.id)){
            this.callService(
                this.service.updateNote(this.uiData.note), this.isSaving
            ).then(
                note => this.updateUiData({note}),
            );
        } else{
            this.callService(
                this.service.createNote(this.uiData.note), this.isSaving
            ).then(
                note => this.router.navigateByUrl(`/note/${note.id}`)
            );
        }
    }

    deleteNote(){
        if(isDefined(this.uiData.note.id) && window.confirm("Are you sure you want to delete this note?")){
            this.callService(
                this.service.deleteNote(this.uiData.note.id), this.isDeleting
            ).then(
                ()=>this.router.navigateByUrl('/')
            );
        } else{
            this.router.navigateByUrl('/');
        }
    }
}
