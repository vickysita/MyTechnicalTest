import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { HomeComponent } from './content/home/home.component';

const routes: Routes = [
  // { path: '', component: SignInComponent, data: { title: 'Sign In' } },
  // { path: 'sign-up', component: SignUpComponent, data: { title: 'Sign Up' } },
  // { path: 'pokemons', component: PokemonsListComponent, data: { title: 'Pokemon List' } },
];

@NgModule({
  imports: [RouterModule.forRoot([
    { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
    { path: 'sign-in', component: SignInComponent, data: { title: 'Sign In' } },
    { path: 'sign-up', component: SignUpComponent, data: { title: 'Sign Up' } },
    { path: 'home', component: HomeComponent, data: { title: 'Home' } },
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
