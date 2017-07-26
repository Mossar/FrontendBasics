/* tslint:disable:no-unused-variable */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { AppTranslateModule } from "../shared/modules/app-translate.module";
import { TranslateService } from "ng2-translate";
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth/auth.service';
import { MockRouterService } from '../../../tests_helpers/test.helpers';

describe('Component: Navbar', () => {
 
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavbarComponent
      ],
      imports: [
        AppTranslateModule
      ],
      providers: [
        { provide: Router, useClass: MockRouterService },
        AuthService
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(NavbarComponent);
    let navbar = fixture.debugElement.componentInstance;
    expect(navbar).toBeTruthy();
  });

  it('should have 3 views', () => {
    let fixture = TestBed.createComponent(NavbarComponent);
    let navbar = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(navbar.views.length).toEqual(3);
  });

  it('should have 2 additional actions', () => {
    let fixture = TestBed.createComponent(NavbarComponent);
    let navbar = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(navbar.additionalActions.length).toEqual(2);
  });

  it('should logout when logout icon is clicked', () => {
    let fixture = TestBed.createComponent(NavbarComponent);
    let navbar = fixture.debugElement.componentInstance;
    let navbarHTML = fixture.nativeElement;
    fixture.detectChanges();
    navbarHTML.querySelector('#action-logout').click();
    expect(navbar.authService.isLoggedIn).toBe(false);
  });

});
