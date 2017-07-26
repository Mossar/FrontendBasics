import {Component, Input} from "@angular/core";


@Component({
  selector: 'dashboard-last-game-active',
  templateUrl: './last-game-active.component.html',
  styleUrls: ['../../dashboard.component.scss']
})
export class LastGameActive {

  @Input()
  lastGame: any;

}
