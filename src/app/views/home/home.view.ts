import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from "@angular/core";
import { NotesService } from "src/app/services/notes.service";
import { Note } from "src/app/types/note";
import { BaseView } from "../base/base.view";

@Component({
    selector: 'fsss-home-view',
    templateUrl: './home.view.html',
    styleUrls: ['./home.view.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeView extends BaseView<{notes: Note[]}> implements OnInit, OnDestroy {
    private service: NotesService = inject(NotesService);

    ngOnInit(){
        this.callService(this.service.listNotes()).then(
            notes => this.updateUiData({notes})
        );
    }
}
