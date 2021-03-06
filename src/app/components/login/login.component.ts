import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
}

  ngOnInit() {
    if (this.authService.checkIfTokenValid()) {
      this.router.navigateByUrl('/home');
    }
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
      });
  }

  login() {
    const val = this.form.value;

    if (val.email && val.password) {
        this.authService.login(val.email, val.password)
            .subscribe(
                (res) => {
                    console.log(res);
                    this.router.navigateByUrl('/home');
                }, (err) => console.log('errorre!!')
            );
    }
}

}
