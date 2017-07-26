import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';
import { LoadingPage } from "../../shared/components/spinner/spinner.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends LoadingPage implements OnInit {

  user: FormGroup;
  errors: String[];
  messages: String[];

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    super();
   }

  ngOnInit() {
    this.errors = [];
    this.messages = [];
    this.route.params.subscribe(params => {
      if(params['message']) this.messages.push(params['message']);
    });
    this.user = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    this.errors = [];
    if(this.isLoginValid(this.user)){
      this.load();
      this.authService.login(this.user.value).subscribe(
        response => {
          this.authService.storeLogin(response);
          this.router.navigate(['/dashboard']);
        },
        error => {
          this.ready();
          if(error.status == '401') this.errors = ['app.views.login.errors.notAuthorized'];
          else this.errors = ['app.shared.errors.unexpected'];
        }
      );
    }
  }

  isLoginValid(user): boolean {
    if(!user.valid){
      if(!user.get('email').valid) this.errors.push('app.views.login.errors.emptyEmail');
      if(!user.get('password').valid) this.errors.push('app.views.login.errors.emptyPassword');
      return false;
    }
    return true;
  }

}
