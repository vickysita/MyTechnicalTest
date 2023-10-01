import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { SweelAlertService } from 'src/services/sweetAlert';
import { SpinnerService } from 'src/app/shared/spinner.service';

@Component({
  // standalone: true,
  // imports: [ MatFormFieldModule, MatInputModule, MatButtonModule, RouterModule, FormsModule, ReactiveFormsModule,
  //   MatIconModule, FlexLayoutModule, ],
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SignInComponent implements OnInit {
  hide: boolean = true;
  _sweel: SweelAlertService = new SweelAlertService();

  signInForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]),
    password: new FormControl('', [Validators.required]),
  })

  constructor(private authService: AuthService, private router: Router, public spinnerService: SpinnerService) {

  }

  ngOnInit(): void {
  }


  doSignIn() {
    if (this.signInForm.valid) {
      let model = this.signInForm.value;
      let email = model.email;
      let password = model.password;

      this.spinnerService.loading = true;
      this.authService.signIn(email, password);
        // .then((result) => {
        //   this.authService.setUserData(result.user);
        //   this.authService.afAuth.authState.subscribe((user) => {
        //     if (user) {
        //       this.spinnerService.loading  = false;
        //       this.router.navigate(['home']);
        //     }
        //   });
        // })
        // .catch((error) => {
        //   this.spinnerService.loading  = false;
        //   window.alert(error.message);
        // });

    } else {
      this._sweel.alertWarning("Atención", "El formulario presenta errores o está incompleto.");
    }
  }

}
