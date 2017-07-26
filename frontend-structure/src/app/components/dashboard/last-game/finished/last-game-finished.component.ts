import {Component, Input} from "@angular/core";


@Component({
  selector: 'dashboard-last-game-finished',
  templateUrl: './last-game-finished.component.html',
  styleUrls: ['../../dashboard.component.scss']
})
export class LastGameFinished {

  @Input()
  lastGame: any;

}
