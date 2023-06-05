import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";
import { Note } from "../types/note";

@Injectable({
    providedIn: 'root'
  })
export class NotesService{
    private DUMMY_DATA: Note[]=[
        {
            id:1,
            title: 'Hello world',
            text: 'This is the first note',
            created: new Date('2023-06-02T14:06:00'),
            modified: new Date('2023-06-02T14:06:00'),
        },
        {
            id:2,
            title: 'Hello kitty',
            text: 'Meow!',
            created: new Date('2023-06-03T14:06:00'),
            modified: new Date('2023-06-03T14:06:00'),
        },
        {
            id:3,
            title: 'Hello moto',
            text: 'ring ring',
            created: new Date('2023-06-04T14:06:00'),
            modified: new Date('2023-06-04T14:06:00'),
        },
        {
            id:42,
            title: 'The answer',
            text: 'The answer is 42.',
            created: new Date('2023-06-05T14:06:00'),
            modified: new Date('2023-06-05T14:06:00'),
        },
    ];

    listNotes(keyword: string): Observable<Note[]>{
        return of(structuredClone(this.DUMMY_DATA));//TODO: Call the backend
    }

    getNote(id: number): Observable<Note>{
        return of({...(this.DUMMY_DATA.find(n=>n.id===id)||({title:'',text:''}))}).pipe(delay(500));
    }

    createNote(note: Note): Observable<Note>{
        const nextId: number = (Math.max(...this.DUMMY_DATA.map(n=>n.id||0))||0)+1;
        const newNote: Note = {...note, id: nextId}
        this.DUMMY_DATA.push(newNote);

        return of(newNote).pipe(delay(500));
    }

    updateNote(note: Note): Observable<Note>{
        this.DUMMY_DATA=this.DUMMY_DATA.map(n=>n.id===note.id?note:n);
        return of(note).pipe(delay(500));
    }

    deleteNote(id: number): Observable<void>{
        this.DUMMY_DATA=this.DUMMY_DATA.filter(n=>n.id!==id);
        return of(null).pipe(delay(500));
    }
}
