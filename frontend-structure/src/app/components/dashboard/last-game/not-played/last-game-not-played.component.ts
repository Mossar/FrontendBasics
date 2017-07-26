import {Component, Input} from "@angular/core";


@Component({
  selector: 'dashboard-last-game-not-played',
  templateUrl: './last-game-not-played.component.html',
  styleUrls: ['../../dashboard.component.scss']
})
export class LastGameNotPlayed {

  @Input()
  lastGame: any;

}
