import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from "ng2-translate";
import { AuthService } from './shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(public router: Router, public translate: TranslateService, public authService: AuthService) { }

  ngOnInit() {
    this.translate.setDefaultLang('pl');
    this.translate.use('pl');

    if(!this.authService.validate()) {
      this.router.navigate(['/login']);
    }
  }

}
