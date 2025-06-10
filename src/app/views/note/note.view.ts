import { Component, inject, input, effect } from "@angular/core";
import { Router } from "@angular/router";
import { isDefined } from "src/app/helpers/common.helpers";
import { Note } from "src/app/types/note";
import { HttpClient } from "@angular/common/http";
import { NOTES_BASE_URL } from "../../app.config";
import {FormsModule} from "@angular/forms";

@Component({
    templateUrl: 'note.view.html',
    styleUrl: 'note.view.less',
    imports: [FormsModule],
})
export class NoteView {
    id = input<string>();

    private http = inject(HttpClient);
    private router = inject(Router)

    note: Note = { title: '', text: '' };

    constructor(){
        effect(()=>{
            if (this.id() && isDefined(this.id()) && this.id() !== 'new') {
                this.http.get<Note>(
                    `${NOTES_BASE_URL}/${this.id()}`
                ).subscribe(note => this.note = note);
            }
        })
    }

    saveChanges() {
        if (isDefined(this.note.id)) {
            this.http.put<Note>(
                `${NOTES_BASE_URL}/${this.note.id}`,
                this.note
            ).subscribe(note => this.note = note);
        } else {
            this.http.post<Note>(
                NOTES_BASE_URL,
                this.note
            ).subscribe(note => this.router.navigateByUrl(`/note/${note.id}`));
        }
    }

    deleteNote() {
        if (isDefined(this.note.id) && window.confirm("Are you sure you want to delete this note?")) {
            this.http.delete<void>(
                `${NOTES_BASE_URL}/${this.note.id}`,
            ).subscribe(() => this.router.navigateByUrl('/'));
        } else {
            this.router.navigateByUrl('/');
        }
    }
}
