import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/services/auth.service';

export interface DialogData {
  
}


@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.css']
})
export class ProfileDialogComponent implements OnInit {
  phone: string = ''; 
  name: string = '';
  date: string = ''; 
  email: string = '';

  datos: any;

  constructor(private authService: AuthService, public dialogRef: MatDialogRef<ProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) { 
     
    }

  ngOnInit(): void {
    this.datos = this.authService.data;
    this.phone = this.datos.phoneNumber;
    this.name = this.datos.name;
    this.date = this.datos.dateOfBirth;
    this.email = this.datos.email;
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
