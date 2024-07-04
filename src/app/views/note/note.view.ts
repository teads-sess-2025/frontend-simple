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
export class NoteView extends BaseView<{ note: Note }> implements OnChanges, OnDestroy {
    @Input()
    id: string;

    isSaving$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isDeleting$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private service: NotesService = inject(NotesService);
    private router = inject(Router)

    constructor() {
        super();
        this.uiData$ = new BehaviorSubject({ note: { title: '', text: '' } });
    }

    get note(): Note {
        return this.uiData$.value.note;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['id'] && isDefined(this.id)) {
            if (this.id !== 'new') {
                this.callService(
                    this.service.getNote(parseInt(this.id, 10))
                ).then(
                    note => this.updateUiData({ note })
                );
            }
        }
    }

    saveChanges() {
        if (isDefined(this.note.id)) {
            this.callService(
                this.service.updateNote(this.note), this.isSaving$
            ).then(
                note => this.updateUiData({ note }),
                err => alert('An error occured while saving :('),
            );
        } else {
            this.callService(
                this.service.createNote(this.note), this.isSaving$
            ).then(
                note => this.router.navigateByUrl(`/note/${note.id}`),
                err => alert('An error occured while saving :('),
            );
        }
    }

    deleteNote() {
        if (isDefined(this.note.id) && window.confirm("Are you sure you want to delete this note?")) {
            this.callService(
                this.service.deleteNote(this.note.id), this.isDeleting$
            ).then(
                () => this.router.navigateByUrl('/'),
                err => alert('An error occured while deleting :('),
            );
        } else {
            this.router.navigateByUrl('/');
        }
    }

    updateTitle(title: string) {
        this.updateUiData({ note: { ...this.note, title } })
    }

    updateText(text: string) {
        this.updateUiData({ note: { ...this.note, text } })
    }
}
