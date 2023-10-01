import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  pokemons = true;
  numbers = false;

  constructor(private authService: AuthService){

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
