import { Note } from "src/app/types/note";

export interface NoteViewState{
    loading: boolean;
    note?: Note;
}
