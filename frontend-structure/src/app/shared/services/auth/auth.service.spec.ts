/* tslint:disable:no-unused-variable */

import { AuthService } from './auth.service';
import { User } from './user.interface';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';

/* Backend mocking imports */
import { inject, TestBed, async } from '@angular/core/testing';
import { tick, fakeAsync } from '@angular/core/testing/fake_async';
import { MockBackend } from '@angular/http/testing';
import { MockError, MockRouterService } from '../../../../../tests_helpers/test.helpers';
import { Http, ConnectionBackend, BaseRequestOptions, Response, ResponseOptions, ResponseType } from '@angular/http';

/* Tests */
describe('Service: Auth', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RestService,
        { provide: Router, useClass: MockRouterService },
        AuthService,
        {
          provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }, deps: [MockBackend, BaseRequestOptions]
        },
        {provide: MockBackend, useClass: MockBackend},
        {provide: BaseRequestOptions, useClass: BaseRequestOptions}
      ],
    });
  });

  it('should do nothing on validate success', inject([MockBackend, AuthService], fakeAsync((mockBackend: MockBackend, service: AuthService) => {
    mockBackend.connections.subscribe(c => {
      expect(c.request.url).toBe("http://localhost:8080/api/validate");
      let mockResponseBody = [{}];
      let response = new ResponseOptions({body: JSON.stringify(mockResponseBody)});
      c.mockRespond(new Response(response));
    });
    service.storeLogin({ username: "wojciech", access_token: "fofkoefkfoeko4" });
    service.validate();
    expect(service.isLoggedIn).toBe(true);
  })));

  it('should logout on validate error', inject([MockBackend, AuthService], fakeAsync((mockBackend: MockBackend, service: AuthService) => {
    mockBackend.connections.subscribe(c => {
      expect(c.request.url).toBe("http://localhost:8080/api/validate");
      let opts = {type:ResponseType.Error, status:401, body: {}};
      c.mockError(new MockError(new ResponseOptions(opts)));
    });
    service.validate();
    expect(service.isLoggedIn).toBe(false);
  })));

  it('should store token after validate or login', inject([AuthService, RestService], fakeAsync((service: AuthService, restService: RestService) => {
    var token = "$0fjofdjo40$()";
    service.storeLogin({
      username: "Wojciech",
      access_token: token
    });
    expect(restService.getToken()).toBe(token);
  })));

});
