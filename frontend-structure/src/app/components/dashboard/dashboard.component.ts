import { Component, OnInit } from '@angular/core';
import {RestService} from "../../shared/services/rest.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  errors: String[];
  messages: String[];
  username: String;
  lastGame: any;

  constructor(private restService: RestService) { }

  ngOnInit() {
    this.errors = [];
    this.messages = [];
    this.username = '';
    this.lastGame = {};
    this.getUserInfo();
    this.getLastGame();
  }

  getUserInfo(): void {
    this.restService.authGet({
      method: 'userRest/currentUserInfo'
    }).subscribe(
      response => {
        if(response.status == 'error') {
          this.errors = ['app.shared.errors.unexpected'];
        } else {
          this.username = response.name + "." + response.surname;
        }
      }
    );
  }

  getLastGame(): void {
    this.restService.authGet({
      method: 'customer/lastGame'
    }).subscribe(
      response => {
        if(response.status == 'error') {
          this.errors = ['app.shared.errors.unexpected'];
        } else {
          this.lastGame = response;
        }
      }
    );
  }


}
