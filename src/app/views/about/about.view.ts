import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: 'fsss-about-view',
    templateUrl: './about.view.html',
    styleUrls: ['./about.view.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutView {

}
