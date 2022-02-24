import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  @Input() displayLoginDialog = false;
  @Output() displayLoginDialogChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  cancel() {
    this.displayLoginDialogChange.emit(false);
  }
  
  formSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.authService
      .loginWithEmailAndPassword(email, password)
      .then(() => this.router.navigateByUrl('/product-list'))
      .catch((e) => this.errorMessage = e.message);
  }

  loginWithGoogle() {
    this.authService
      .loginWithGoogle()
      .then(() => this.router.navigateByUrl('/product-list'))
      .catch((e) => console.log(e.message));
  }
}
