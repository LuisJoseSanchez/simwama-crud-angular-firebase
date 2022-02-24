import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {

  @Input() displayRegisterDialog = false;
  @Output() displayRegisterDialogChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  registerForm = new FormGroup({
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
    this.displayRegisterDialogChange.emit(false);
  }

  formSubmit() {
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;

    this.authService
      .register(email, password)
      .then(() => this.router.navigateByUrl('/product-list'))
      .catch((e) => this.errorMessage = e.message);
  }
}

