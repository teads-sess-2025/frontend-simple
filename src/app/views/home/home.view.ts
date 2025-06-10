import { Component, inject, OnInit } from "@angular/core";
import { Note } from "src/app/types/note";
import { HttpClient } from "@angular/common/http";
import { NOTES_BASE_URL } from "../../app.config";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

@Component({
    templateUrl: 'home.view.html',
    styleUrl: 'home.view.less',
    imports: [CommonModule, FormsModule, RouterModule],
})
export class HomeView implements OnInit {
    private http = inject(HttpClient);

    notes: Note[] = [];

    ngOnInit() {
        this.http.get<Note[]>(NOTES_BASE_URL).subscribe(notes => this.notes = notes);
    }
}
