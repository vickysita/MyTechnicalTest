import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { SweelAlertService } from 'src/services/sweetAlert';
import { APP_DATE_FORMATS, AppDateAdapter } from 'src/app/shared/data.adapter';
import { SpinnerService } from 'src/app/shared/spinner.service';

@Component({
  // standalone: true,
  // imports: [ MatFormFieldModule, MatInputModule, MatButtonModule, RouterModule, FormsModule, ReactiveFormsModule,
  //   MatIconModule, FlexLayoutModule, MatDatepickerModule, MatNativeDateModule ],
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class SignUpComponent implements OnInit {
  hide = true;
  _sweel: SweelAlertService = new SweelAlertService();
  regexName = '^(?![\s.]+$)[a-zA-Z\s.]*$';
  maxDate = new Date();

  signUpForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.pattern("^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$")]),
    phone: new FormControl('', [Validators.required, Validators.pattern("[0-9]{10}")]),
    date: new FormControl(new Date()),
  })


  constructor(private authService: AuthService, private router: Router, public spinnerService: SpinnerService) {

  }

  ngOnInit(): void {
  }

  doSignUp() {

    if (this.signUpForm.valid) {
      let model = this.signUpForm.value;
      let email = model.email;
      let password = model.password;
      let name = model.name;
      let date = model.date;
      let phoneNumber = model.phone;

      let dateOfBirth = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
      this.authService.signUp(email, password, name, dateOfBirth, phoneNumber);
    } else {
      this._sweel.alertWarning("Atención", "El formulario presenta errores o está incompleto.");
    }
  }

}
