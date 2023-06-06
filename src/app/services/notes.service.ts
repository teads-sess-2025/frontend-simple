import { inject, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Note } from "../types/note";
import {HttpClient} from '@angular/common/http';
import { getDefinedProps } from "../helpers/common.helpers";
import { NOTES_BASE_URL } from "./notes-service.config";

@Injectable({
    providedIn: 'root'
  })
export class NotesService{
    private http = inject(HttpClient);

    listNotes(keyword?: string): Observable<Note[]>{
        const queryParams = getDefinedProps({keyword});

        return this.http.get<Note[]>(
            NOTES_BASE_URL,
            {params: queryParams}
        );
    }

    getNote(id: number): Observable<Note>{
        return this.http.get<Note>(
            `${NOTES_BASE_URL}/${id}`
        );
    }

    createNote(note: Note): Observable<Note>{
        return this.http.post<Note>(
            NOTES_BASE_URL,
            note
        );
    }

    updateNote(note: Note): Observable<Note>{
        return this.http.put<Note>(
            `${NOTES_BASE_URL}/${note.id}`,
            note
        );
    }

    deleteNote(id: number): Observable<void>{
        return this.http.delete<void>(
            `${NOTES_BASE_URL}/${id}`,
        );
    }
}
