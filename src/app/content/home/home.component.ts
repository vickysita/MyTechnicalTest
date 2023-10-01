import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { ProfileDialogComponent } from '../profile-dialog/profile-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  pokemons = true;
  numbers = false;

  constructor(private authService: AuthService, public dialog: MatDialog,){
  }


  openDialog(){
    const dialogRef = this.dialog.open(ProfileDialogComponent, {
      width: 'auto',
      height: 'auto',

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  
  menu(option: number) {
    switch (option) {
      case 1:
        this.pokemons = true;
        this.numbers = false;
        break;
      case 2:
        this.pokemons = false;
        this.numbers = true;
        break;
    }
  }

  logOut(){
    this.authService.logOut();
  }


}
