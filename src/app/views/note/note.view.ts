import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
    selector: 'fsss-note-view',
    templateUrl: './note.view.html',
    styleUrls: ['./note.view.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteView {
    @Input()
    id?: string;
}