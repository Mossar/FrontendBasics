import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth/auth.service';
import { NavbarAction } from './navbar.action.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  hideNavbarViews: Array<String>;
  views: NavbarAction[];
  additionalActions: NavbarAction[];

  constructor(public router: Router, public authService: AuthService) { }

  ngOnInit() {
    this.hideNavbarViews = ['/login', '/remindPassword', '/resetPassword'];
    this.views = [
      { name: 'dashboard', type: 'ROUTE' },
      { name: 'history', type: 'ROUTE' },
      { name: 'ranking', type: 'ROUTE' }
    ];
    this.additionalActions = [
      { name: 'account', type: 'ROUTE' },
      { name: 'logout', type: 'FUNCTION' }
    ];
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
